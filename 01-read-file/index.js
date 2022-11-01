const FileHandler = require("../fileHandler");
const path = require("path")
const URL = path.resolve(__dirname, "text.txt")
const f = new FileHandler()

f.read(URL, (data) => { console.log(data);})
// f.write("")
