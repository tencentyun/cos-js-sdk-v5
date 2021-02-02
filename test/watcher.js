const pti = require('puppeteer-to-istanbul')
const puppeteer = require('puppeteer');

var fs = require('fs');
var util = require('util');

var logFile = fs.createWriteStream('log.txt', { flags: 'w' });
  // Or 'w' to truncate the file every time the process starts.
var logStdout = process.stdout;

console.log = function () {
  logFile.write(util.format.apply(null, arguments) + '\n');
  logStdout.write(util.format.apply(null, arguments) + '\n');
}
console.error = console.log;

(async () => {
    const browser = await puppeteer.launch({args: ['--no-proxy-server', '--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();
    page.on('console', async function (msg) {
        var text = msg.text();
        if (text.startsWith('[test-result]')) {
            console.log('==[TESTING-ENDS]==')
            const details = JSON.parse(text.replace('[test-result]', ''))
            console.log(details)
            const jsCoverage = await page.coverage.stopJSCoverage();
            pti.write(jsCoverage, { includeHostname: true , storagePath: './.nyc_output' })
            await browser.close()
        } else {
            console.log(msg.text())
        }
    });
    await page.coverage.startJSCoverage();
    await page.goto('http://127.0.0.1:3000/test');
})()
