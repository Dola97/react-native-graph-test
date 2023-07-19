import React from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useQuery} from '@apollo/client';
import {GET_CUSTOMERS} from '../../../gql/customers';
import {CustomerItem} from './item';
import {scaleFactor, theme} from '../../../theme';
import useCustomerFilterAndSort from '../useCustomerfiltersort';
export type CustomerType = {
  id: string;
  attributes: {
    name: string;
    contact: string;
    notes: string;
    organization: string;
  };
};
export const CustomerList = () => {
  const {loading, error, data} = useQuery(GET_CUSTOMERS);
  const customers = data?.customers?.data;
  const attributes = Object.keys(
    customers?.[0]?.attributes || {},
  ) as (keyof CustomerType['attributes'])[];
  const {
    filteredAndSortedCustomers,
    handleSearch,
    sortField,
    sortOrder,
    handleSort,
    searchQuery,
  } = useCustomerFilterAndSort(customers);
  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View>
      <TextInput
        placeholder="Search for customers"
        value={searchQuery}
        style={styles.input}
        onChangeText={handleSearch}
      />
      <ScrollView horizontal contentContainerStyle={styles.rowbetween}>
        {attributes.map(attribute => (
          <Text
            style={styles.text}
            key={attribute}
            onPress={() => handleSort(attribute)}>
            {attribute.charAt(0).toUpperCase() + attribute.slice(1)}{' '}
            {sortField === attribute && (sortOrder === 'asc' ? '▲' : '▼')}
          </Text>
        ))}
      </ScrollView>
      <FlatList
        data={filteredAndSortedCustomers}
        renderItem={({item}) => <CustomerItem item={item} />}
        windowSize={20}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: theme.colors.white,
    borderRadius: 8,
    padding: 12 * scaleFactor,
    fontFamily: theme.fonts.medium,
    fontSize: theme.fontSizes.small * scaleFactor,
  },
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
