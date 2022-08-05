const { app, BrowserWindow } = require('electron')
const path = require('path')
//const { constructFileFromLocalFileData, LocalFileData } =require('get-file-object-from-local-path');

require('@electron/remote/main').initialize()

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        title: 'Taggr',
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
            // preload: path.join(__dirname, 'preload.js')
        }
    })
    win.removeMenu()

    win.loadURL('http://localhost:3000')
    win.webContents.openDevTools()
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.patform !== 'darwin') {
        app.quit()
    }
})

app.on('browser-window-created', (_, window) => {
    require("@electron/remote/main").enable(window.webContents)
})


app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

function smt(path) {
    const currentFile = new LocalFileData(path)
    console.log(currentFile)

}