const path = require("path")
const fs = require("fs")
const pathFolder = path.join(__dirname, "files")
const destinationPath = path.join(__dirname, "files-copy")
copy()
function copy() {


    fs.mkdir(destinationPath, { recursive: true }, (err) => {

    });
    fs.readdir(destinationPath, (err, files) => {
        files.forEach(file => {
            fs.unlink(path.join(__dirname, "files-copy", file), (err) => { })
        })
    })


    fs.readdir(pathFolder, (err, files) => {
        if (err) { console.log(err); }
        files.forEach(file => {
            fs.copyFile(path.join(__dirname, "files", file), path.join(__dirname, "files-copy", file), (err) => {
                if (err) {
                    console.log(err);
                }
            })
        })
    })
}
