import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Switch,
    TextInput,
    TouchableOpacity
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Colors, Typography } from '../../styles';
import { insertTransaction, updateTransaction } from '../../dbHelpers/transactionHelper';

import { categories } from '../../utils/categories';

import BackHeader from '../../components/Headers/BackHeader';
import Button from '../../components/Button';
import ScanScreen from '../../components/Custom/qrcode-scanner';
import routes from '../../config/routes';
import { getDataFromQrCode } from '../../utils/qrcode';

const AddQrCodeTransaction = ({navigation, route}) => {
    const [category, setCategory] = useState();
    const [income, setIncome] = useState(false);
    const [showDate, setShowDate] = useState(false);
    const [date, setDate] = useState(new Date());
    const [amount, setAmount] = useState('');

    useEffect(() => {
        if (route.params?.item) {
            setCategory({name: route.params.item.category, icon: route.params.item.icon});
            setDate(new Date(route.params.item.transaction_date));
            setAmount((route.params.item.amount).toString());
            setIncome(route.params.item.type == 'income' ? false : true);
        }
        else {
            setCategory(categories[0]); // Set the first category as a default category
        }
    }, []);

    // Toggle Income / Expense Switch
    const toggleIncomeSwitch = () => setIncome(previousState => !previousState);

    // Change Date
    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDate(Platform.OS === 'ios');
        setDate(currentDate);
    }

    // Insert Transaction
    const __insert = () => {
        const stringDate = date.toLocaleDateString();
        insertTransaction({
            category: category.name,
            icon: category.icon,
            date: stringDate,
            amount: parseFloat(amount),
            type: income ? 'expense' : 'income'
        });
    }

    // Update Transaction
    const __update = () => {
        const stringDate = date.toLocaleDateString();
        updateTransaction({
            id: route.params.item.id,
            category: category.name,
            icon: category.icon,
            date: stringDate,
            amount: parseFloat(amount),
            type: income ? 'expense' : 'income'
        });
    }

    // Save Transaction
    const __save = () => {
        if (route.params?.item) {
            __update();
        }
        else {
            __insert();
        }
        navigation.goBack();
    }

    const onScanSuccess = async (data) => {
        const newTransaction = await getDataFromQrCode(data);
        if(newTransaction){
            console.log({newTransaction})
            //save qrcode to db
            navigation.navigate(routes.AddManualTransaction, {item: {operation: 'create',...newTransaction}});
        }
        else{
            console.error('An error occured')
        }
        // Linking.openURL(e.data).catch(err =>
        //   console.error('An error occured', err)
        // );
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <BackHeader title={route.params?.item ? 'Edit Transaction' : 'New Transaction'} />

            {/* Body */}
            <ScanScreen onScanSuccess={onScanSuccess} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BLACK
    },
    // Body
    bodyContainer: {
        flex: 1,
        padding: 20,
        paddingTop: 10,
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        padding: 10,
        marginTop: 10,
        borderRadius: 10,
        color: Colors.WHITE,
        backgroundColor: Colors.LIGHT_BLACK
    },
    rowContainer: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    // Footer
    footerContainer: {
        padding: 20,
    },
});
 
export default AddQrCodeTransaction;
 