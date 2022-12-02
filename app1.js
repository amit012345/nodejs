//https://nodejs.org/dist/latest-v18.x/docs/api/fs.html
const fs = require ('fs')
fs.writeFileSync('notes.txt', 'This file was created by Node.js\n')
fs.appendFileSync('notes.txt', 'This text is appended\n')
