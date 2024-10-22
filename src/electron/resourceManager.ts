import osUtils from 'os-utils'
import fs from 'fs'
import os from 'os'
import { BrowserWindow } from 'electron';
const POLLING_INTERVAL = 500;

export function pollResources(mainWindow: BrowserWindow) {
    setInterval(async () => {

        const cpuUsage = await getCpuUsage();
        const memoryUsage = getMemoryUsage();
        const storageUsage = getStorageUsage();
        mainWindow.webContents.send("statistics", { cpuUsage, memoryUsage, storageUsage });
    }, POLLING_INTERVAL);
}

async function getCpuUsage() {
    return new Promise(resolve => { osUtils.cpuUsage(resolve) });
}

function getMemoryUsage() {
    return 1 - osUtils.freememPercentage();
}

function getStorageUsage() {

    const stats = fs.statfsSync(process.platform === 'win32' ? 'C:\\' : '/');
    const total = stats.bsize * stats.blocks;
    const free = stats.bsize * stats.bfree;

    return {
        total: Math.floor(total / 1024 / 1024 / 1024),
        usage: 1 - free / total
    }
}

export function getStaticData() {
    const totalStorage = getStorageUsage().total
    const cpuModel = os.cpus()[0].model
    const totalMemoryGB = Math.floor(osUtils.totalmem() / 1024)

    return {
        totalStorage,
        cpuModel,
        totalMemoryGB
    }
}