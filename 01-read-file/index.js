
const fs = require("fs")
const path = require("path");
const { stderr } = require("process");
const URL = path.resolve(__dirname, "text.txt")

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





const f = new FileHandler()

f.read(URL, (chunk) => { stderr.write(chunk) })

