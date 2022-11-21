import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import routes from '../../config/routes';
import {Colors, Typography} from '../../styles';

const AddTransactionButton = ({navigation}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.iconContainer}
      onPress={() => navigation.navigate(routes.AddManualTransaction)}>
      <Icon name="plus" color={Colors.WHITE} size={15} />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.LIGHT_BLACK
    },
});
export default AddTransactionButton;
