import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {scaleFactor} from '../../theme';
import {Button} from '../../components/button';
import {useAppDispatch} from '../../store/hooks';
import {setModal} from '../../store/modals-slice';
import {AddTaskModal} from './components/add-task';
import {TaskList} from './components/list';

export const InteractionsScreen = () => {
  const dispatch = useAppDispatch();
  const openAddTaskModal = () => {
    dispatch(
      setModal({
        name: 'addTask',
        value: {isOpen: true, customer: undefined},
      }),
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <TaskList />
      <Button
        title="Add Task"
        buttonStyle={{marginTop: 10 * scaleFactor}}
        onPress={openAddTaskModal}
      />
      <AddTaskModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24 * scaleFactor,
    paddingTop: 10 * scaleFactor,
  },
});
