const FileHandler = require("../fileHandler");
const path = require("path")
const readline = require('readline');
const URL = path.resolve(__dirname, "02-write-file.txt")
const f = new FileHandler()




const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.write('Writing Mode:\n ');
rl.on("line", (str) => {
    if (str == "exit") {rl.close().process.close(0) }
    f.write(URL,str)
})
rl.on('close', function () {
    console.log('\nBYE BYE !!!');
    process.exit(0);
});

