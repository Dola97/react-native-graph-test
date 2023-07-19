import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {customerModel, setModal} from '../../../store/modals-slice';
import {scaleFactor, theme} from '../../../theme';
import {useMutation} from '@apollo/client';
import {
  ADD_CUSTOMER,
  GET_CUSTOMERS,
  UPDATE_CUSTOMER,
} from '../../../gql/customers';
import {Button} from '../../../components/button';
import CancelIcon from '../../../assets/svgs/xmark-solid.svg';
import Toast from 'react-native-toast-message';

const Fields = ({
  customer,
  isUpdateMode,
}: {
  customer: customerModel | undefined;
  isUpdateMode: boolean;
}) => {
  const initialFields = {
    name: isUpdateMode ? customer?.attr?.name : '',
    contact: isUpdateMode ? customer?.attr?.contact : '',
    notes: isUpdateMode ? customer?.attr?.notes : '',
    organization: isUpdateMode ? customer?.attr?.organization : '',
  };
  console.log(initialFields, 'initialFields');
  const [fields, updateFields] = useState(initialFields);
  const [createCustomer, {loading: createLoading, reset: createReset}] =
    useMutation(ADD_CUSTOMER, {
      refetchQueries: [GET_CUSTOMERS, 'getCustomers'],
    });
  const [updateCustomer, {loading: updateLoading, reset: updateReset, error}] =
    useMutation(UPDATE_CUSTOMER, {
      refetchQueries: [GET_CUSTOMERS, 'getCustomers'],
    });

  const handleChange = (field: string, value: string) => {
    updateFields(prevFields => ({
      ...prevFields,
      [field]: value,
    }));
  };
  console.log('error', error);
  const handleAddCustomer = () => {
    if (isUpdateMode) {
      console.log('idddd', typeof customer?.id, fields);
      updateCustomer({
        variables: {
          id: customer?.id,
          name: fields.name,
          contact: fields.contact,
          notes: fields.notes,
          organization: fields.organization,
        },
      })
        .then(result => {
          // Handle success, if needed
          console.log('Customer updated successfully!', result);
          updateReset();
          Toast.show({
            type: 'success',
            text1: 'Customer updated successfully!',
          });
        })
        .catch(error => {
          // Handle error, if needed
          console.error('Error update customer:', error);
          Toast.show({
            type: 'error',
            text1: 'Error update customer:',
            text2: error,
          });
        });
    } else {
      createCustomer({
        variables: {
          name: fields.name,
          contact: fields.contact,
          notes: fields.notes,
          organization: fields.organization,
        },
      })
        .then(result => {
          // Handle success, if needed
          console.log('Customer added successfully!', result);
          createReset();
          Toast.show({
            type: 'success',
            text1: 'Customer added successfully!',
          });
        })
        .catch(error => {
          // Handle error, if needed
          console.error('Error adding customer:', error);
          Toast.show({
            type: 'error',
            text1: 'Error adding customer:',
            text2: error,
          });
        });
    }
  };
  console.log('form', fields, customer?.id);
  return (
    <>
      <TextInput
        placeholder="name"
        value={fields.name}
        defaultValue="adel"
        placeholderTextColor={theme.colors.white}
        onChangeText={value => handleChange('name', value)}
        style={{...styles.input, marginVertical: 10 * scaleFactor}}
      />
      <TextInput
        placeholder="Contact"
        value={fields.contact}
        placeholderTextColor={theme.colors.white}
        onChangeText={value => handleChange('contact', value)}
        style={{...styles.input, marginVertical: 10 * scaleFactor}}
      />
      <TextInput
        placeholder="Notes"
        value={fields.notes}
        placeholderTextColor={theme.colors.white}
        onChangeText={value => handleChange('notes', value)}
        style={{...styles.input, marginVertical: 10 * scaleFactor}}
      />
      <TextInput
        placeholderTextColor={theme.colors.white}
        placeholder="Organization"
        value={fields.organization}
        onChangeText={value => handleChange('organization', value)}
        style={{...styles.input, marginVertical: 10 * scaleFactor}}
      />
      <Button
        title={isUpdateMode ? 'Edit' : 'Add'}
        onPress={handleAddCustomer}
        disabled={updateLoading || createLoading}
      />
    </>
  );
};
export const AddCustomerModal = () => {
  const dispatch = useAppDispatch();
  const customerModal = useAppSelector(state => state.modals.addcustomer);
  const {customer, isOpen} = customerModal;
  const isUpdateMode = !!customer;
  console.log('is update', customer?.attr);

  const closeAddCustomerModal = () => {
    dispatch(
      setModal({
        name: 'addcustomer',
        value: {isOpen: false, customer: undefined},
      }),
    );
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        visible={isOpen}
        onRequestClose={() => {
          closeAddCustomerModal();
        }}>
        <SafeAreaView style={styles.modalView}>
          <TouchableOpacity onPress={closeAddCustomerModal}>
            <CancelIcon
              fill="#000"
              stroke="#000"
              width={20 * scaleFactor}
              height={20 * scaleFactor}
            />
          </TouchableOpacity>
        </SafeAreaView>
        <View style={styles.centeredView}>
          <Fields isUpdateMode={isUpdateMode} customer={customer} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 12 * scaleFactor,
  },
  modalView: {
    justifyContent: 'flex-start',
    margin: 20 * scaleFactor,
  },
  input: {
    backgroundColor: theme.colors.secondary,
    borderRadius: 8,
    padding: 12 * scaleFactor,
    fontFamily: theme.fonts.medium,
    fontSize: theme.fontSizes.small * scaleFactor,
    borderColor: theme.colors.primary,
    color: theme.colors.white,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
