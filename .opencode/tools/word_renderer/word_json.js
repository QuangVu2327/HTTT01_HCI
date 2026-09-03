const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const { Document, Packer, Paragraph, HeadingLevel, Table, TableCell, TableRow, ImageRun, TextRun, AlignmentType, WidthType, BorderStyle } = require('docx');

async function runWordJson(dataPath) {
    const rawData = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(rawData);

    // 1. Validate against schema
    const schemaPath = path.join(__dirname, '../../../templates/report_schema.json');
    const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    const valid = validate(data);

    if (!valid) {
        throw new Error('VALIDATION_FAILED: ' + JSON.stringify(validate.errors));
    }

    // 2. Build Docx Document
    const docChildren = [];

    // Title & Metadata
    docChildren.push(
        new Paragraph({
            text: data.title,
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 }
        }),
        new Paragraph({
            text: data.subtitle,
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.CENTER,
            spacing: { after: 300 }
        }),
        new Paragraph({
            children: [
                new TextRun({ text: `Nhóm thực hiện: ${data.group}`, bold: true }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 }
        })
    );

    // Authors table or list
    if (data.authors && data.authors.length > 0) {
        const authorTexts = data.authors.map(a => `${a.name} (${a.studentId})`).join(' | ');
        docChildren.push(
            new Paragraph({
                children: [new TextRun({ text: `Thành viên: ${authorTexts}`, italics: true })],
                alignment: AlignmentType.CENTER,
                spacing: { after: 600 }
            })
        );
    }

    // Chapters & Sections
    for (const chapter of data.chapters) {
        docChildren.push(
            new Paragraph({
                text: `Chương ${chapter.chapterNumber}: ${chapter.title}`,
                heading: HeadingLevel.HEADING_1,
                spacing: { before: 400, after: 200 }
            })
        );

        for (const section of chapter.sections) {
            docChildren.push(
                new Paragraph({
                    text: `${section.sectionNumber} ${section.title}`,
                    heading: HeadingLevel.HEADING_2,
                    spacing: { before: 200, after: 100 }
                })
            );

            for (const p of section.paragraphs) {
                docChildren.push(
                    new Paragraph({
                        children: [new TextRun({ text: p, size: 22 })], // 22 half-points = 11pt
                        spacing: { after: 120 },
                        indent: { firstLine: 360 }
                    })
                );
            }

            // Images
            if (section.images && section.images.length > 0) {
                for (const img of section.images) {
                    const imgPath = path.join(__dirname, '../../..', img.path);
                    if (fs.existsSync(imgPath)) {
                        try {
                            const imgBuffer = fs.readFileSync(imgPath);
                            docChildren.push(
                                new Paragraph({
                                    children: [
                                        new ImageRun({
                                            data: imgBuffer,
                                            transformation: { width: 500, height: 300 }
                                        })
                                    ],
                                    alignment: AlignmentType.CENTER,
                                    spacing: { before: 200, after: 100 }
                                }),
                                new Paragraph({
                                    children: [new TextRun({ text: img.caption, italics: true, size: 20, color: "555555" })],
                                    alignment: AlignmentType.CENTER,
                                    spacing: { after: 200 }
                                })
                            );
                        } catch (e) {
                            console.warn(`Warning: Could not embed image ${imgPath}:`, e.message);
                        }
                    } else {
                        console.warn(`Warning: Image file not found: ${imgPath}`);
                    }
                }
            }

            // Tables
            if (section.table && section.table.headers && section.table.rows) {
                const tableRows = [];
                // Header row
                tableRows.push(
                    new TableRow({
                        children: section.table.headers.map(header => 
                            new TableCell({
                                children: [new Paragraph({ children: [new TextRun({ text: header, bold: true, color: "FFFFFF" })], alignment: AlignmentType.CENTER })],
                                shading: { fill: "0052CC" },
                                width: { size: 100 / section.table.headers.length, type: WidthType.PERCENTAGE }
                            })
                        )
                    })
                );

                // Data rows
                for (const row of section.table.rows) {
                    tableRows.push(
                        new TableRow({
                            children: row.map(cellText =>
                                new TableCell({
                                    children: [new Paragraph({ children: [new TextRun({ text: cellText, size: 20 })] })],
                                    width: { size: 100 / row.length, type: WidthType.PERCENTAGE }
                                })
                            )
                        })
                    );
                }

                docChildren.push(
                    new Table({
                        rows: tableRows,
                        width: { size: 100, type: WidthType.PERCENTAGE }
                    }),
                    new Paragraph({ spacing: { after: 200 } })
                );
            }
        }
    }

    const doc = new Document({
        sections: [{
            properties: {},
            children: docChildren
        }]
    });

    const buffer = await Packer.toBuffer(doc);
    const outputDir = path.dirname(dataPath.replace('raw', 'output').replace('output', 'output'));
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

    const outputPath = path.join(outputDir, 'report.docx');
    fs.writeFileSync(outputPath, buffer);
    console.log('Word document successfully generated at:', outputPath);
}

const args = process.argv.slice(2);
if (args.length === 0) {
    console.error('Please provide path to report.json');
    process.exit(1);
}

runWordJson(args[0]).catch(err => {
    console.error('ERROR:', err.message);
    process.exit(1);
});
