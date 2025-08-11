var fs = require('fs'); // is node library used to create, delete, append data, write the files (File system)
var os = require('os');
const {log} = require ("console");
fs.writeFileSync("Testing.txt", 'Hi there');

console.log(os.platform());
console.log('os')

// custom console
log("My custom console");