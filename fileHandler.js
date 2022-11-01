const fs = require("fs")


module.exports = class FileHandler {
    check(fileUrl, cb) {
        fs.access(fileUrl, fs.F_OK, (e) => {
            if (e) { cb(e); return 123 }
            else {
                this.EXISTS = true
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
    write(fileUrl,cb) {
this.check(fileUrl,(error)=>{
if(error){}
 fs.createWriteStream(fileUrl,{encoding:"utf-8"},(data)=>{console.log(data);})
})
    }
}

