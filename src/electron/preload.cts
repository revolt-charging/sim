const electron = require('electron')

electron.contextBridge.exposeInMainWorld('electron', {
    subscribeStatistics: (callback: (statistics: any) => void) => {
        electron.ipcRenderer.on('statistics', (event, data) => {
            callback(data)
        })
    },
    getStaticData: () => electron.ipcRenderer.invoke('getStaticData')
})