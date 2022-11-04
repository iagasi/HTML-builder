const path = require("path");
const fsp = require('fs').promises;

const fs = require("fs")
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
                fs.open(fileUrl,"w", (err) => {
                    if (err) { console.log("err"); return }
                    else {
                        const writable = fs.createWriteStream(fileUrl, {  encoding: "utf-8" })
                        writable.write(data)

                    }
                })
            }
            else {
                const writable = fs.createWriteStream(fileUrl, {  encoding: "utf-8" })
                writable.write(data)

            }
        })
    }
}

const stylesPath = path.resolve(__dirname, "styles")

const writePath=path.resolve(__dirname,"project-dist","bundle.css")

const writable=fs.createWriteStream(writePath)
fs.readdir(stylesPath, async (err, files) => {
    for (const file of files) {
        console.log(file);
        const filePath = path.resolve(__dirname, "styles", file)
        const stat = await fsp.lstat(filePath)
        const ext = file.split(".")[1] === "css"

        if (stat.isFile()&&ext) {
            const read=  fs.createReadStream(filePath)
         read.on("data",(data)=>{writable.write(data)})
        // read.on("end",()=>{read.close()})
       
         }
    }




})

