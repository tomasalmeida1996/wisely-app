import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import routes from '../../config/routes';
import {
    convertJsonToMillenium,
  convertXlsxSheetToJson,
  pickFile,
  readXlsxFile,
} from '../../utils/files';
import {readRemoteFile} from 'react-native-csv';
import RNFS from 'react-native-fs';
import { getImportedFileById, insertImportedFile } from '../../dbHelpers/importFilesHelper';
import { insertMultipleTransactions } from '../../dbHelpers/transactionHelper';

const FloatingButton = ({navigation}) => {
  const [icon_1] = useState(new Animated.Value(10));
  const [icon_2] = useState(new Animated.Value(10));
  const [icon_3] = useState(new Animated.Value(10));

  const [pop, setPop] = useState(false);

  const uploadXlsxFile = async () => {
    const file = await pickFile();
    console.log('uploadCsvFile 2', file);
    if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      Alert.alert('Este tipo de ficheiros não é suportado!');
      return;
    }
    if (file.size > 100000) {
      //100KB
      Alert.alert(
        'Este ficheiro excede o tamanho máximo!',
        'Por favor recorra ao processamento background!',
      );
      return;
    }

    console.log('uploadCsvFile', file);
    const filePath = file.uri;

    console.log(filePath);
    const workbook = await readXlsxFile(filePath);
    const sheetName = workbook.SheetNames[0];
    console.log("workbook.Sheet",workbook.Sheets[0])
    const jsonObj = convertXlsxSheetToJson(workbook.Sheets[sheetName]);
    const transactionsData = convertJsonToMillenium(jsonObj)
    const rowsNum = transactionsData.length;
    console.log(
      rowsNum
    );
    if (rowsNum <= 0) {
      Alert.alert('Este ficheiro não contém linhas válidas!');
      return;
    }
    // console.log(jsonObj)
    //insert row in filesRead table and get id created
    const _file = {
      filename: file.name,
      type: 'bank-statement',
      extension: file.type,
      size: file.size,
      uri: filePath,
      total_rows: rowsNum,
    };
    console.log("newFile _file",_file)
    insertImportedFile(
        _file,
        ( result ) => {
            const fileId = result
            const newTransactionsData = convertJsonToMillenium(jsonObj,fileId)
            // console.log("result newTransactionsData",newTransactionsData)
            insertMultipleTransactions(newTransactionsData)
        }
    )
    
  };
  const popIn = () => {
    setPop(true);
    Animated.timing(icon_1, {
      toValue: 80,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 80,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_3, {
      toValue: 80,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const popOut = () => {
    setPop(false);
    Animated.timing(icon_1, {
      toValue: 10,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 10,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_3, {
      toValue: 10,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <Animated.View style={[styles.circle, {bottom: icon_1}]}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(routes.AddQrCodeTransaction);
            popOut();
          }}>
          <Icon name="qrcode" size={25} color="#FFFF" />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.circle, {bottom: icon_2, right: icon_2}]}>
        <TouchableOpacity>
          <Icon name="camera" size={25} color="#FFFF" />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.circle, {right: icon_3}]}>
        <TouchableOpacity
          onPress={() => {
            console.log('uploadXlsxFile');
            uploadXlsxFile();
            popOut();
          }}>
          <Icon name="print" size={25} color="#FFFF" />
          {/* <FontAwesomeIcon icon="fa-sharp fa-solid fa-qrcode" /> */}
        </TouchableOpacity>
      </Animated.View>
      <TouchableOpacity
        style={styles.circle}
        onPress={() => {
          pop === false ? popIn() : popOut();
        }}>
        <Icon name="plus" size={25} color="#FFFF" />
      </TouchableOpacity>
    </View>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  circle: {
    backgroundColor: '#2cb78c',
    width: 50,
    height: 50,
    position: 'absolute',
    bottom: 10,
    right: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
