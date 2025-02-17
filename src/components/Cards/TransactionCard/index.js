import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { Colors, Typography } from '../../../styles';
import { localeDate } from '../../../utils/dates';

const TransactionCard = (props) => {
    const transaction = props.transaction;
    const currency = props.currency;

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                {transaction.icon && <Icon name={transaction.icon} color={Colors.WHITE} size={15} />}
            </View>

            <View style={styles.detailsContainer}>
                {transaction.description ? (
                    <Text style={[Typography.BODY, {color: Colors.WHITE}]}>{transaction.description || ''}</Text>
                ) : (
                    <Text style={[Typography.BODY, {color: Colors.WHITE}]}>{transaction.category || ''}</Text>
                )}
                <Text style={[Typography.TAGLINE, {color: Colors.GRAY_DARK}]}>{localeDate(transaction.transaction_date) || ''}</Text>
            </View>

            <Text style={[Typography.H4, transaction.type == 'income' ? {color: Colors.SUCESS} : {color: Colors.ALERT}]}>
               {currency} {transaction.amount?.toFixed(2)}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.BLACK
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.LIGHT_BLACK
    },
    detailsContainer: {
        flex: 1, 
        marginLeft: 10, 
        marginRight: 10,
        justifyContent: 'space-between'
    }
});
 
export default TransactionCard;
 