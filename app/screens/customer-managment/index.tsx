import React from 'react';
import {CustomerList} from './components/list';
import {StyleSheet, View} from 'react-native';
import {scaleFactor} from '../../theme';
import {Button} from '../../components/button';
import {useAppDispatch} from '../../store/hooks';
import {setModal} from '../../store/modals-slice';
import {AddCustomerModal} from './components/add-customer';

export const CustomerScreen = () => {
  const dispatch = useAppDispatch();
  const openAddCustomerModal = () => {
    dispatch(
      setModal({
        name: 'addcustomer',
        value: {isOpen: true, customer: undefined},
      }),
    );
  };

  return (
    <View style={styles.container}>
      <CustomerList />
      <Button
        title="Add"
        buttonStyle={{marginTop: 10 * scaleFactor}}
        onPress={openAddCustomerModal}
      />
      <AddCustomerModal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24 * scaleFactor,
    paddingTop: 10 * scaleFactor,
  },
});
