const fs = require('fs');
const path = require('path');
const puppeteer = require('../../node_modules/puppeteer');

async function runPersonaPng(htmlPath) {
    if (!fs.existsSync(htmlPath)) {
        throw new Error('HTML file not found: ' + htmlPath);
    }
    
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    const outputDir = path.dirname(htmlPath);
    const baseName = path.basename(htmlPath, '.html');
    const pngPath = path.join(outputDir, baseName + '.png');

    // 4. Snapshot
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: pngPath, fullPage: true });
    await browser.close();

    console.log('PNG generated successfully at:', pngPath);
}

const args = process.argv.slice(2);
runPersonaPng(args[0]).catch(err => {
    console.error(err.message);
    process.exit(1);
});
