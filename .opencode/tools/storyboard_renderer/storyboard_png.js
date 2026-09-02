const fs = require('fs');
const path = require('path');
const puppeteer = require('../../node_modules/puppeteer');

async function runStoryboardPng(htmlPath) {
    if (!fs.existsSync(htmlPath)) {
        throw new Error('HTML file not found: ' + htmlPath);
    }
    
    const absoluteHtmlPath = path.resolve(htmlPath);
    const outputDir = path.dirname(absoluteHtmlPath);
    const baseName = path.basename(absoluteHtmlPath, '.html');
    const pngPath = path.join(outputDir, baseName + '.png');

    // 4. Snapshot using file:// protocol so relative assets (like images) resolve correctly
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('file://' + absoluteHtmlPath, { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: pngPath, fullPage: true });
    await browser.close();

    console.log('Storyboard PNG generated successfully at:', pngPath);
}

const args = process.argv.slice(2);
runStoryboardPng(args[0]).catch(err => {
    console.error(err.message);
    process.exit(1);
});
