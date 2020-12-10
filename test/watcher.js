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

puppeteer.launch({
  args: [
      '--no-proxy-server',
      '--no-sandbox',
      '--disable-setuid-sandbox'
  ]
}).then(function (browser) {
  browser.newPage().then(function (page) {
    page.on('console', function (msg) {
        var text = msg.text();
        var type = msg.type();
        if (text.startsWith('[test-result]')) {
            console.log('==[TESTING-ENDS]==')
            
            const details = JSON.parse(text.replace('[test-result]', ''))
            console.log(details)

            browser.close()
        } else {
            console.log(msg.text())
        }

    });
    page.goto(`http://127.0.0.1:3000/test`);
  })
});
