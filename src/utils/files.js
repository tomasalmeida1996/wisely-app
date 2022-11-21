import DocPicker from 'react-native-document-picker';
import * as XLSX from 'xlsx';
import { Platform } from 'react-native';
// import RNFetchBlob from 'react-native-blob-util';
import { readFile } from "react-native-fs";
import { categories } from './categories';

export async function pickFile() {
  try {
    const rsPicker = await DocPicker.pickSingle();
    console.log('rsPicker', rsPicker);
    return rsPicker; //.uri
  } catch (e) {
    console.log(e);
  }
}

export async function readXlsxFile(url) {
  let path = url;
  if (Platform.OS === 'ios')
    path = path.replace(
      /^.*\/Documents\//,
      RNFetchBlob.fs.dirs.DocumentDir + '/',
    );
    const bstr = await readFile(path, "ascii");
    /* bstr is a binary string */
    return XLSX.read(bstr, {type: "binary",cellDates:true});
}

export function convertXlsxSheetToJson(sheet) {
    const jsonObj = XLSX.utils.sheet_to_json(sheet);
    console.log(jsonObj)
    return jsonObj;
  }
  

export const convertJsonToMillenium = (jsonObj,id_imported_file) => {
    let transactionsData = []
    jsonObj.map( row => {
        if(
            !row['Montante'] ||
            !row['Data lançamento'] ||
            !row['Descrição']
        ){
            return
        }

        // const description = row['Descrição'].replace(/[^a-zA-Z0-9]/g, "")
        const description = row['Descrição']
        const category = categories[0]
        const newRow = {
            category: category.name, //row['Descricao'], 
            icon: category.icon, 
            transaction_date: row['Data lançamento'].toISOString(), 
            amount: Math.abs(row['Montante']).toFixed(2), 
            type: row['Montante'] > 0 ? 'income' : 'expense',
            description: description,
            value_date: row['Data valor'].toISOString(),
            id_imported_file: id_imported_file
        }

        transactionsData.push(newRow)
    })
    return transactionsData
}

