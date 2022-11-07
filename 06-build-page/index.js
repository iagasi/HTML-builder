const path = require("path")

const fsp = require("fs").promises
const fs = require("fs")
const directory = path.resolve(__dirname)

class HtmlBuilder {
    constructor() {
        this.mainHtml = ""
        this.projectDirrectory = directory + "/project-dist"
        fs.mkdir(this.projectDirrectory, { recursive: true }, () => {

        })
    }
    async findMainHtml() {
        let dir = await fsp.readdir(directory,)

        let template = dir.find(el => el.split(".")[1] === "html")
        this.mainHtml = await this.readComponent(template)

    }
    async readComponent(component) {
        return new Promise((res, rej) => {
            let data = ""
            const readable = fs.createReadStream(directory + `/${component}`)
            readable.on("data", (chunk) => { data += chunk.toString() })
            readable.on("end", () => { res(data) })
        })
    }

    copyTo(source, destination) {
        fs.copyFile(source, destination)
    }

    async replaceTagsWithHtml() {

        await this.findMainHtml()
        let data = this.mainHtml

        function getListOfComponents() {
            let arrayOfComponents = []
            for (let i = 0; i < data.length; i++) {
                const e = data[i]
                let temp = ""
                if (data[i] === "{" && data[i + 1] == "{") {
                    i += 2

                    for (let j = i; j < data.length; j++) {
                        if (data[j] !== "}") {
                            temp += data[j]
                        }

                        else {
                            arrayOfComponents.push(temp)
                            break
                        }

                    }
                }
            }
            return arrayOfComponents
        }
        let arrayOfComponents = getListOfComponents()

        for await (const component of arrayOfComponents) {
            const componentHtml = await this.readComponent("/components/" + component + ".html")
            this.mainHtml = this.mainHtml.replace(`{{${component}}}`, componentHtml)

        }
        this.writeTextInFile("/index.html")
    }
    writeTextInFile(destination) {
        const writer = fs.createWriteStream(this.projectDirrectory + destination)
        writer.write(this.mainHtml)
    }
    bundleCss() {
        const stylesPath = directory + "/styles"

        const writePath = this.projectDirrectory + "/style.css"
        const writable = fs.createWriteStream(writePath)

        fs.readdir(stylesPath, async (err, files) => {

            for (const file of files) {
                console.log(file);
                const filePath = path.resolve(__dirname, "styles", file)
                const stat = await fsp.lstat(filePath)
                const ext = file.split(".")[1] === "css"

                if (stat.isFile() && ext) {
                    const read = fs.createReadStream(filePath)
                    read.on("data", (data) => { writable.write(data) })
                    // read.on("end",()=>{read.close()})

                }
            }




        })
    }
    copyDirectory() {
        const destinationPath = directory + "/project-dist/assets/"
        const assetsFolder = directory + "/assets"
        fs.mkdir(destinationPath, { recursive: true }, (err) => {

        });
        //  // if (err) { console.log(err); }
        //  files.forEach(async (file) => {
        //     const fpath = assetsFolder + "\\" + file
        //     const stat = await fsp.lstat(fpath)
        //     if (stat.isDirectory()) {
        //         fs.mkdir(destinationPath + "/" + file, () => {
        //             // console.log(assetsFolder);
        //         })

        //     };

        //     if (stat.isFile()) {
        //         fs.copyFile(path.join(assetsFolder, file), path.join(destinationPath, file), async (err) => {
        //             if (err) { console.log(err); }
        //         })




        //     }

        // })

        async function copyDirectory(assetsFolder) {

            const files = await fsp.readdir(assetsFolder)
            // console.log(files);

            files.forEach(async (item) => {
                const folderpath = assetsFolder + "\\" + item
                const stat = await fsp.lstat(folderpath)
                if (stat.isDirectory()) {
                    fs.mkdir(destinationPath + "/" + item, async () => {
                        const innerFiles = await fsp.readdir(folderpath)
                        innerFiles.forEach((file) => {
                       
                                 fs.copyFile(path.join(assetsFolder,item, file),path.join(destinationPath,item, file), async (err) => {
                                if (err) { console.log(err); }
                            }) 
                        })
                    })

                }
                //   copy(assetsFolder + "/" + item)

            })

        }
        async function deleteDirectory(assetsFolder) {

            const files = await fsp.readdir(destinationPath)
             console.log(files);

            files.forEach(async (item) => {
                const folderpath = destinationPath + "\\" + item
                const stat = await fsp.lstat(folderpath)
                if (stat.isDirectory()) {
                   
                        const innerFiles = await fsp.readdir(folderpath)
                        innerFiles.forEach((file) => {
                       
                       fs.unlink(folderpath+"/"+file,()=>{})
                        })
                 

                }
             

            })

        }
       deleteDirectory()
        copyDirectory(assetsFolder)
    }

}


const h = new HtmlBuilder()
h.replaceTagsWithHtml()
h.bundleCss()

h.copyDirectory()