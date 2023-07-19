import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useQuery} from '@apollo/client';
import {scaleFactor, theme} from '../../../theme';
import {GET_TASKS} from '../../../gql/tasks';
export type CustomerType = {
  id: string;
  attributes: {
    date: string;
    name: string;
    notes: string;
    customer: {
      data: {
        attributes: {
          name: string;
        };
      };
    };
  };
};
export const TaskList = () => {
  const {loading, error, data} = useQuery(GET_TASKS);
  const tasks = data?.tasks?.data;

  const renderItem = ({item}: {item: CustomerType}) => (
    <View style={styles.rowbetween}>
      <View>
        <Text>Task Name: {item.attributes.name}</Text>

        <Text>Duration: {item.attributes.date}</Text>
      </View>
      <View>
        <Text>
          Customer: {item?.attributes?.customer?.data?.attributes?.name}
        </Text>
      </View>
    </View>
  );
  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <FlatList
      data={tasks}
      renderItem={renderItem}
      windowSize={20}
      keyExtractor={item => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  rowbetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 12 * scaleFactor,
  },
  text: {
    fontFamily: theme.fonts.medium,
    fontSize: theme.fontSizes.small * scaleFactor,
  },
});
