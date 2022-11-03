
const path = require("path")
const fsp = require('fs').promises;

const pathFolder = path.join(__dirname, "secret-folder")
fsp.readdir(pathFolder).then(async (files) => {
    for (let fileName of files) {

        const fpath = pathFolder + "\\" + fileName
        const stat = await fsp.lstat(fpath)
        if (stat.isFile()) {
            const name = fileName.split(".")[0]
            const ext = fileName.split(".")[1]
            let size = Array.from(stat.size.toString())
            size.splice(size.length - 3, 0, ".")
            let fileSize = size.join("") + "kb"
            console.log(name + " - " + ext + " - " + fileSize)


        }
    }
})


