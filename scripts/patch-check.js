const fs = require('fs');
const path = require('path');
const exec = require('child_process').execSync;

const patchesDir = path.join(__dirname, '../patches');
const hasPatches = fs.existsSync(patchesDir);

if (hasPatches) {
  // 执行补丁
  console.log('npx patch-package');
  exec('npx patch-package', { stdio: 'inherit' });
} else {
  console.log('无补丁应用');
}