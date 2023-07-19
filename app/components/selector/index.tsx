import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  SafeAreaView,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {setModal} from '../../store/modals-slice';
import {CustomerType} from '../../screens/customer-managment/components/list';
import CancelIcon from '../../assets/svgs/xmark-solid.svg';
import {scaleFactor} from '../../theme';
type RadioButtonProps = {
  options: CustomerType[];
  loading: boolean;
};

export const SelectorModal: React.FC<RadioButtonProps> = ({
  options,
  loading,
}) => {
  const selectCustomer = useAppSelector(state => state.modals.selectCustomer);
  const dispatch = useAppDispatch();
  const {customer, isOpen} = selectCustomer;

  const handleOptionSelect = (option: CustomerType) => {
    dispatch(
      setModal({
        name: 'selectCustomer',
        value: {
          isOpen: false,
          customer: {
            attr: {
              name: option.attributes.name,
            },
            id: option.id,
          },
        },
      }),
    );
  };
  const closeAddCustomerModal = () => {
    dispatch(
      setModal({
        name: 'selectCustomer',
        value: {...customer, isOpen: false},
      }),
    );
  };
  console.log('customer', customer);
  if (loading) {
    return <Text>Loading</Text>;
  }
  return (
    <Modal
      animationType="fade"
      visible={isOpen}
      onRequestClose={() => {
        closeAddCustomerModal();
      }}>
      <SafeAreaView>
        <TouchableOpacity onPress={closeAddCustomerModal}>
          <CancelIcon
            fill="#000"
            stroke="#000"
            width={20 * scaleFactor}
            height={20 * scaleFactor}
          />
        </TouchableOpacity>
      </SafeAreaView>
      <View style={styles.container}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionContainer}
            onPress={() => handleOptionSelect(option)}>
            <View style={styles.radio}>
              {customer?.attr?.name === option.attributes.name && (
                <View style={styles.selectedRadio} />
              )}
            </View>
            <Text style={styles.optionText}>{option.attributes.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: 10 * scaleFactor,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  selectedRadio: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000',
  },
  optionText: {
    fontSize: 16,
  },
});
