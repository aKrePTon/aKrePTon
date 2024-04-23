const fs = require('fs');
const path = require('path');

const directories = fs.readdirSync(__dirname, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

const botFolders = directories.filter(folder => /^bot\d+$/.test(folder));

botFolders.forEach(folder => {
  const botPath = path.join(__dirname, folder, 'index.js');
  if (fs.existsSync(botPath)) {
    const bot = require(botPath);
    bot();
  } else {
    console.error(`Bot file not found in folder ${folder}`);
  }
});
const bot2 = require('./index2.js')
bot2();