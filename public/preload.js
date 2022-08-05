let { readdir } = require("fs/promises")
let { ipcRenderer, contextBridge } = require("electron")
const { constructFileFromLocalFileData } = require("get-file-object-from-local-path")


let directoryContents = async (path) => {
  let results = await readdir(path, {withFileTypes: true})
  return results.map(entry => ({
    name: entry.name,
    type: entry.isDirectory() ? "directory" : "file",
  }))
}

let currentDirectory = () => {
  return process.cwd()
}

contextBridge.exposeInMainWorld("electron", {
  getFileObject: (args) => ipcRenderer.invoke('get-file-object', args),
  getFileObject2: (path) => {
    console.log(path)
    const file = constructFileFromLocalFileData(path);
    console.log(file)
    return file;
  }
})