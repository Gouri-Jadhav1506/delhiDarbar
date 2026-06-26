const fs = require('fs');
const path = require('path');

const regex = /t\((['"`])((?:(?!\1)[^\\]|\\.)+)\1\s*,\s*(['"`])((?:(?!\3)[^\\]|\\.)+)\3\)/g;

function findFiles(dir) {
  let fileList = [];
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      fileList = fileList.concat(findFiles(fullPath));
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const files = findFiles(path.join(process.cwd(), 'app'));
const translations = {};
let count = 0;

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  // Use matchAll for easier iteration
  const matches = [...content.matchAll(regex)];
  matches.forEach(m => {
    count++;
    const key = m[2];
    const value = m[4];
    // handle nested translations where key is object path
    const parts = key.split('.');
    let current = translations;
    for (let i = 0; i < parts.length - 1; i++) {
        if (!current[parts[i]]) current[parts[i]] = {};
        current = current[parts[i]];
    }
    // Set the value only if it's the leaf path
    // if a child isn't an object, we overwrite.
    current[parts[parts.length - 1]] = value;
  });
});

fs.writeFileSync(path.join(process.cwd(), 'translations_base.json'), JSON.stringify(translations, null, 2));
console.log('Extracted matches from ' + count + ' calls.');
