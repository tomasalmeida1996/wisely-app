import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    View,
    Text,
    Pressable,
    Linking
} from 'react-native';
import Modal from "react-native-modal";

import { Colors, Typography } from '../../styles';
import AuthContext from '../../context/AuthContext';

import Bar from '../../components/Bar';
import { currencies, getCurrency, storeCurrency } from '../../utils/currency';
import { backupDB, restoreDB, shareDB } from "../../utils/database";
import BlockHeader from "../../components/Headers/BlockHeader";
import PieCard from "../../components/Cards/PieCard";
import { getTotalExpenses, getTotalIncomes } from "../../dbHelpers/transactionHelper";
import { useIsFocused } from "@react-navigation/native";
import BalanceCard from "../../components/Cards/BalanceCard";

const Dashboards = ({navigation}) => {
    const focused = useIsFocused();
    const {state, authContext} = React.useContext(AuthContext);

    const [totalIncomes, setTotalIncomes] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [currency, setCurrency] = useState({});
    
  useEffect(() => {
    getTotalIncomes(setTotalIncomes);
    getTotalExpenses(setTotalExpenses);
    getCurrency(setCurrency);
  }, [useIsFocused]);

    return (
        <View style={styles.container}>
            <View style={{padding: 20, marginBottom: 20}}>
                <BlockHeader title="Dashboards" />
                <View style={{paddingTop: 10}}>
                {/* // Balance */}
                <View>
                    <BalanceCard
                        currency={currency.symbol}
                        incomes={totalIncomes}
                        expenses={totalExpenses}
                    />
                    </View>
                    <View style={{paddingLeft: 20}}>
                        <BlockHeader
                            title="Transactions"
                            onPress={() => navigation.navigate(routes.Transactions)}
                        />
                    </View>
                    <PieCard incomes={totalIncomes} expenses={totalExpenses} />
                </View>                
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BLACK
    },
    // Header
    headerContainer: {
        padding: 20,
        paddingBottom: 10
    },
    // Body
    bodyContainer: {
        flex: 1,
        padding: 20,
        paddingTop: 0
    },
    blockContainer: {
        borderRadius: 10,
        backgroundColor: Colors.LIGHT_BLACK
    },
    rowContainer: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    btnContainer: {
        padding: 10,
        marginTop: 20,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: Colors.LIGHT_BLACK
    },
    // Modal 
    modalContainer: {
        margin: 20,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 10,
        backgroundColor: Colors.BLACK
    },
});
 
export default Dashboards;
 