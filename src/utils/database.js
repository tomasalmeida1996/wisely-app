import { Alert } from 'react-native';
import DocPicker from 'react-native-document-picker'
import RNFS from 'react-native-fs'
import Share from 'react-native-share';
import {name as appName} from '../../app.json';
import { getDateFilename } from './dates';
import { pickFile } from './files';

export async function restoreDB() {
    try {
        const rsPicker = await pickFile()
        const filePath = rsPicker.uri
        console.log('Restore',filePath)
        await RNFS.copyFile(filePath, `/data/data/com.wallety/databases/${appName}`)

        console.log('Restore successful!')
        Alert.alert('Restore successful!')
    } catch (e) {
        console.log(e)
        Alert.alert('Error! Restore was unsuccessful.')
    }
}

export async function backupDB() {
    try {
        const currDate = getDateFilename(new Date(), 'dd_MM_yyyy_HHmmss')
        const originPath = '/data/data/com.wallety/databases/'
        // const destPath = RNFS.ExternalStorageDirectoryPath + `${appName}_` + currDate + '.db'
        const destPath2 = RNFS.DownloadDirectoryPath + '/'
        const destPath3 = RNFS.ExternalDirectoryPath
        const destPath = destPath2 + `${appName}_backup_` + currDate + '.db'
        console.log("backup data",{currDate,originPath,destPath,destPath2,
            CachesDirectoryPath: RNFS.CachesDirectoryPath,
            DocumentDirectoryPath: RNFS.DocumentDirectoryPath,
            LibraryDirectoryPath : RNFS.LibraryDirectoryPath,
            ExternalDirectoryPath: RNFS.ExternalDirectoryPath
        })
        // await RNFS.copyFile(originPath + appName,
        //     destPath)
        console.log('Success Backup Database');
        Alert.alert('Backup was successful.')
    } catch (e) {
        console.log(e)
        Alert.alert('Internal error!', 'Backup unsuccessful.')
    }
}


export async function shareDB() {
    
    const options = {
        title: "test message!",
        url: `file:///data/data/com.wallety/databases/` + appName,
    }
    Share.open(options)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            err && console.log(err);
        });
}

