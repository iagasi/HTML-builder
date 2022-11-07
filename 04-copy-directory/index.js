const path = require("path")
const fs = require("fs")
const pathFolder = path.join(__dirname, "files")
const destinationPath = path.join(__dirname, "files-copy")
copy()
function copy() {


    fs.mkdir(destinationPath, { recursive: true }, (err) => {

    });

    
    fs.readdir(destinationPath, (err, files) => {
     
        if(!files.length){
            console.log(files);
            copy()
        return}
        files.forEach(file => {
            fs.unlink(path.join(__dirname, "files-copy", file), (err) => {copy() })
        })
    })

function copy(){

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
   
}
