import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {setModal} from '../../../store/modals-slice';
import {scaleFactor, theme} from '../../../theme';
import {useMutation, useQuery} from '@apollo/client';
import {GET_CUSTOMERS} from '../../../gql/customers';
import {Button} from '../../../components/button';
import CancelIcon from '../../../assets/svgs/xmark-solid.svg';
import {SelectorModal} from '../../../components/selector';
import {ADD_TASK, GET_TASKS} from '../../../gql/tasks';
import Toast from 'react-native-toast-message';

const Fields = () => {
  const dispatch = useAppDispatch();
  const {customer: selectedCustomer} = useAppSelector(
    state => state.modals.selectCustomer,
  );
  const openSelectCustomerModal = () => {
    dispatch(
      setModal({
        name: 'selectCustomer',
        value: {isOpen: true},
      }),
    );
  };
  const closeTaskModal = () => {
    dispatch(
      setModal({
        name: 'addTask',
        value: {isOpen: false},
      }),
    );
  };
  const initialFields = {
    date: '',
    duration: '',
    notes: '',
    name: '',
  };
  console.log(initialFields, 'initialFields');
  const [fields, updateFields] = useState(initialFields);
  const [createTask, {loading: createLoading, reset: createReset}] =
    useMutation(ADD_TASK, {
      refetchQueries: [GET_TASKS, 'getTasks'],
    });
  const {loading, data} = useQuery(GET_CUSTOMERS);
  const customers = data?.customers?.data;

  const handleChange = (field: string, value: string) => {
    updateFields(prevFields => ({
      ...prevFields,
      [field]: value,
    }));
  };
  const _handleAddTask = () => {
    createTask({
      variables: {
        id: selectedCustomer?.id,
        name: fields.name,
        date: fields.date,
        duration: fields.duration,
        notes: fields.notes,
      },
    })
      .then(result => {
        // Handle success, if needed
        console.log('Task updated successfully!', result);
        createReset();
        Toast.show({
          type: 'success',
          text1: 'Task updated successfully!',
        });
        closeTaskModal();
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
  };
  console.log('selectedCustomer', selectedCustomer);
  return (
    <>
      <TextInput
        placeholder="Date"
        value={fields.date}
        keyboardType="number-pad"
        defaultValue="adel"
        placeholderTextColor={theme.colors.white}
        onChangeText={value => handleChange('date', value)}
        style={{...styles.input, marginVertical: 10 * scaleFactor}}
      />
      <TextInput
        placeholder="Duration"
        keyboardType="number-pad"
        value={fields.duration}
        placeholderTextColor={theme.colors.white}
        onChangeText={value => handleChange('duration', value)}
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
        placeholder="Task Name"
        value={fields.name}
        onChangeText={value => handleChange('name', value)}
        style={{...styles.input, marginVertical: 10 * scaleFactor}}
      />
      <TouchableOpacity
        onPress={openSelectCustomerModal}
        style={styles.selectorContainer}>
        <Text style={styles.textSelector}>
          {selectedCustomer?.attr?.name
            ? selectedCustomer?.attr?.name
            : 'Select Please'}
        </Text>
      </TouchableOpacity>
      <Button title={'Add'} onPress={_handleAddTask} disabled={createLoading} />
      <SelectorModal loading={loading} options={customers} />
    </>
  );
};
export const AddTaskModal = () => {
  const dispatch = useAppDispatch();
  const customerModal = useAppSelector(state => state.modals.addTask);
  const {customer, isOpen} = customerModal;

  const closeAddCustomerModal = () => {
    dispatch(
      setModal({
        name: 'addTask',
        value: {...customer, isOpen: false},
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
          <Fields />
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
  selectorContainer: {
    backgroundColor: theme.colors.secondary,
    borderRadius: 8,
    padding: 12 * scaleFactor,
    marginVertical: 10 * scaleFactor,
  },
  textSelector: {
    fontFamily: theme.fonts.medium,
    fontSize: theme.fontSizes.small * scaleFactor,

    color: theme.colors.white,
  },
});
