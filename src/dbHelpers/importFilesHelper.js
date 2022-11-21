import { Alert } from 'react-native';
import db from './openDB';

// Table Name
const tableName = 'imported_files';
// const columns = [filename,type,extension,size,uri,total_rows]
// Create Transactions Table
export const createImportedFilesTable = () => {
    db.transaction((tx) => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS ' + tableName +
            ' (id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
            ' filename VARCHAR(500) NOT NULL, '+
            ' type VARCHAR(100) NOT NULL, '+ //bank statement, user data etc
            ' extension VARCHAR(50) NOT NULL, '+ //xlsx, csv etc
            ' size VARCHAR(100) NOT NULL, '+
            ' uri VARCHAR(300) NOT NULL, '+ //url
            ' total_rows INTEGER NOT NULL, '+ //url
            ' insert_date TEXT DEFAULT CURRENT_DATE NOT NULL, ' +
            ' isArchived INTEGER DEFAULT 0 NULL);',
            [],
            () => {
                console.log('created');
            },
            error => {
                console.log(error);
            }
        );
    });
}

// Insert file
export const insertImportedFile = async (item,onSuccess,onError) => {
    console.log("insertImportedFile inside",item)
    if (item.filename?.length == 0) {
        Alert.alert('Oups !', 'Please, write correct data.')
    }
    else {
        let id = 0
        id = await db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO ' + tableName + '(filename,type,extension,size,uri,total_rows) VALUES(?,?,?,?,?,?);',
                [item.filename, item.type, item.extension, item.size, item.uri, item.total_rows],
                (tx,results) => {
                    // var x = db.lastInsertRowId;
                    console.log('inserted results',results);
                    id = results.insertId;
                    console.log('inserted',id);
                    onSuccess && onSuccess(id)
                    // return id;
                },
                error => {
                    console.log(error);
                    onError && onError(error)
                }
            );
        });
    }
}

// Get file
export const getImportedFileById = (id,onSuccess,onError) => {
    db.transaction((tx) => {
        tx.executeSql(
            'SELECT * FROM ' + tableName + ' WHERE id = ? ',
            [id],
            (tx, results) => {
                var len = results.rows.length;
                let result = [];

                if (len > 0) {
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        result.push({
                            ...row
                            // id: row.id,
                            // transaction_qrcode: row.transaction_qrcode,
                            // read_date: row.read_date,
                            // isArchived: row.isArchived
                        })
                    }
                }
                else {
                    console.log('empty');
                }
                onSuccess && onSuccess(result);
            },
            error => {
                console.log(error);
                onError && onError(error)
            }
        );
    });
}


// Update file
export const archiveImportedFile = (id) => {
    if (item.amount == 0) {
        Alert.alert('Oups !', 'Please, write correct data.')
    }
    else {
        db.transaction((tx) => {
            tx.executeSql(
                'UPDATE ' + tableName + ' SET isArchived = ? WHERE id = ?',
                [true, id],
                () => {
                    console.log('updated');
                },
                error => {
                    console.log(error);
                }
            );
        });
    }
}

// Drop Table
export const deleteImportedFilesTable = () => {
    db.transaction((tx) => {
        tx.executeSql(
            `drop table ${tableName}`,
            [],
            () => {
                console.log('deleted');
            },
            error => {
                console.log(error);
            }
        );
    });
}