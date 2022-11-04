const path = require("path")
const readline = require('readline');
const URL = path.resolve(__dirname, "02-write-file.txt")
const fs=require("fs")

class FileHandler {
    check(fileUrl, cb) {
        fs.access(fileUrl, (e) => {
            if (e) { cb(e); return }
            else {
                cb()
            }
        })
    }


    read(fileUrl, cb) {

        this.check(fileUrl, () => {
            const reader = fs.createReadStream(fileUrl, { encoding: "utf-8" })
            reader.on("data", (data) => { cb(data) })
        })
    }


    write(fileUrl, data) {
        this.check(fileUrl, (error) => {
            if (error) {
                fs.open(fileUrl, "w", (err) => {
                    if (err) { console.log(err); return }
                    else {
                        const writable = fs.createWriteStream(fileUrl, { flags: "a", encoding: "utf-8" })
                        writable.write(data)

                    }
                })
            }
            else {
                const writable = fs.createWriteStream(fileUrl, { flags: "a", encoding: "utf-8" })
                writable.write(data)

            }
        })
    }
}

const f=new FileHandler()
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.write('Writing Mode:\n ');
rl.on("line", (str) => {
    if (str == "exit") { rl.close().process.close(0) }
    f.write(URL, str)
})
rl.on('close', function () {
    console.log('\nBYE BYE !!!');
    process.exit(0);
});

