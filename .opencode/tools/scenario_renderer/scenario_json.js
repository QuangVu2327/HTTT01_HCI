const fs = require('fs');
const path = require('path');
const Ajv = require('../../node_modules/ajv');
const ejs = require('../../node_modules/ejs');

async function runScenarioJson(dataPath) {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    // 1. Validate
    const schema = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../templates/scenario.schema.json'), 'utf8'));
    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    const valid = validate(data);

    if (!valid) {
        throw new Error('VALIDATION_FAILED:' + JSON.stringify(validate.errors));
    }

    // 2. Render
    const template = fs.readFileSync(path.join(__dirname, '../../../templates/scenario.template.html'), 'utf8');
    const html = ejs.render(template, data);

    // 3. Setup output dir
    const outputDir = path.dirname(dataPath.replace('raw', 'output'));
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

    const baseName = path.basename(dataPath, '.json');
    const htmlPath = path.join(outputDir, baseName + '.html');
    fs.writeFileSync(htmlPath, html);

    console.log('Scenario HTML generated successfully at:', htmlPath);
}

const args = process.argv.slice(2);
runScenarioJson(args[0]).catch(err => {
    console.error(err.message);
    process.exit(1);
});
