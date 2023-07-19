import React from 'react';
import {CustomerType} from './list';
import {useAppDispatch} from '../../../store/hooks';
import {setModal} from '../../../store/modals-slice';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {scaleFactor, theme} from '../../../theme';
import EditIcon from '../../../assets/svgs/edit-solid.svg';
import DeleteIcon from '../../../assets/svgs/trash-solid.svg';
import {DELETE_CUSTOMER, GET_CUSTOMERS} from '../../../gql/customers';
import {useMutation} from '@apollo/client';
import {TransparentOverlay} from '../../../components/overlay';

export const CustomerItem = ({item}: {item: CustomerType}) => {
  const dispatch = useAppDispatch();
  const [deleteCustomer, {loading, reset}] = useMutation(DELETE_CUSTOMER, {
    refetchQueries: [GET_CUSTOMERS, 'getCustomers'],
  });
  const openAddCustomerModal = () => {
    dispatch(
      setModal({
        name: 'addcustomer',
        value: {isOpen: true, customer: {id: item.id, attr: item.attributes}},
      }),
    );
  };
  const handleDeleteCustomer = () => {
    deleteCustomer({
      variables: {
        id: item.id,
      },
    })
      .then(result => {
        // Handle success, if needed
        console.log('Customer deleted successfully!', result);
        reset();
      })
      .catch(error => {
        // Handle error, if needed
        console.error('Error deleting customer:', error);
      });
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.rowbetween}>
          <View>
            <Text style={styles.text}>Name: {item.attributes.name}</Text>
            <Text style={styles.text}>Contact: {item.attributes.contact}</Text>
            <Text style={styles.text}>Notes: {item.attributes.notes}</Text>
            <Text style={styles.text}>
              Organization: {item.attributes.organization}
            </Text>
          </View>
          <View style={styles.rowbetween}>
            <TouchableOpacity onPress={openAddCustomerModal}>
              <EditIcon
                width={18 * scaleFactor}
                height={18 * scaleFactor}
                style={{marginRight: 10 * scaleFactor}}
                fill="#fff"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDeleteCustomer}>
              <DeleteIcon
                fill={theme.colors.error}
                width={18 * scaleFactor}
                height={18 * scaleFactor}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TransparentOverlay visible={loading} />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: theme.colors.secondary,
    padding: 12 * scaleFactor,
    marginVertical: 10 * scaleFactor,
  },
  rowbetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSizes.small,
    marginBottom: 10 * scaleFactor,
    color: theme.colors.white,
  },
});
