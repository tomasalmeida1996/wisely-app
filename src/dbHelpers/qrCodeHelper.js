import { Alert } from 'react-native';
import db from './openDB';

// Table Name
const tableName = 'transaction_qrcodes_reads';

// Create Transactions Table
export const createTransactionQrCodesReadsTable = () => {
    db.transaction((tx) => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS ' + tableName +
            ' (id INTEGER PRIMARY KEY AUTOINCREMENT, transaction_qrcode VARCHAR(500) NULL, read_date TEXT NOT NULL, isArchived INTEGER NULL);',
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

// Get Transactions
export const getTransactionsQrCodesReads = (setTransactions) => {
    db.transaction((tx) => {
        tx.executeSql(
            'SELECT * FROM ' + tableName,
            [],
            (tx, results) => {
                var len = results.rows.length;
                let result = [];

                if (len > 0) {
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        result.push({
                            id: row.id,
                            transaction_qrcode: row.transaction_qrcode,
                            read_date: row.read_date,
                            isArchived: row.isArchived
                        })
                    }
                }
                else {
                    console.log('empty');
                }
                setTransactions(result);
            },
            error => {
                console.log(error);
            }
        );
    });
}

// Insert Transactions
export const insertTransactionQrCodeRead = (item) => {
    if (item.transaction_qrcode?.length == 0) {
        Alert.alert('Oups !', 'Please, write correct data.')
    }
    else {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO ' + tableName + '(transaction_qrcode, read_date, isArchived) VALUES(?,?,?);',
                [item.transaction_qrcode, item.read_date, false],
                () => {
                    console.log('inserted');
                },
                error => {
                    console.log(error);
                }
            );
        });
    }
}

// Update Transactions
export const archiveTransactionQrCodeRead = (item) => {
    if (item.amount == 0) {
        Alert.alert('Oups !', 'Please, write correct data.')
    }
    else {
        db.transaction((tx) => {
            tx.executeSql(
                'UPDATE ' + tableName + ' SET isArchived = ? WHERE id = ?',
                [true, item.id],
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
export const deleteTransactionsQrCodeReadTable = () => {
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