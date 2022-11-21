import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import SwipeableFlatList from 'react-native-swipeable-list';
import TransactionCard from '../../components/Cards/TransactionCard';
import QuickActions from '../../utils/quickActions';
import {Colors, Typography} from '../../styles';
import {useIsFocused} from '@react-navigation/native';
import {
  getTransactions,
  getTotalIncomes,
  getTotalExpenses,
  deleteTransaction,
} from '../../dbHelpers/transactionHelper';
import {getCurrency} from '../../utils/currency';

const TransacionListView = (props) => {
  const {navigation, data, ListHeaderComponent, ListFooterComponent} = props;
  const focused = useIsFocused();
  const [currency, setCurrency] = useState({});
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions(setTransactions);
    getCurrency(setCurrency);
    // getTotalIncomes(setTotalIncomes);
    // getTotalExpenses(setTotalExpenses);
  }, [focused]);

  // Delete Item
  const __delete = (id) => {
    deleteTransaction(id);
    getTransactions(setTransactions);
    // getTotalIncomes(setTotalIncomes);
    // getTotalExpenses(setTotalExpenses);
  };

  // Update Item
  const __update = (item) => {
    navigation.navigate(routes.AddManualTransaction, {
      item: {operation: 'edit', ...item},
    });
  };

  return (
    <SwipeableFlatList
      data={data}
      maxSwipeDistance={140}
      shouldBounceOnMount={true}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      renderQuickActions={({index, item}) =>
        QuickActions(item, __update, __delete)
      }
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={() => {
        return (
          <View style={styles.emptyContainer}>
            <Text
              style={[
                Typography.TAGLINE,
                {color: Colors.WHITE, textAlign: 'center'},
              ]}>
              You haven't any transactions !
            </Text>
          </View>
        );
      }}
      renderItem={({item, index}) => {
        return (
          <TransactionCard
            currency={currency.symbol}
            key={index}
            transaction={item}
          />
        );
      }}
      ListFooterComponent={ListFooterComponent}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // Body
  bodyContainer: {
    flex: 1,
    padding: 20,
    paddingLeft: 0,
    paddingBottom: 0,
    backgroundColor: Colors.BLACK,
  },
  emptyContainer: {
    padding: 20,
  },
  floatingButton: {
    // width: 60,
    // height: 60,
    // borderRadius: 30,
    // backgroundColor: '#ee6e73',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});
export default TransacionListView;
