import {useState, useMemo} from 'react';
import {CustomerType} from './components/list';

type SortOrder = 'asc' | 'desc';
const useCustomerFilterAndSort = (initialCustomers: CustomerType[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] =
    useState<keyof CustomerType['attributes']>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSort = (field: keyof CustomerType['attributes']) => {
    if (sortField === field) {
      // Toggle the sort order if the same field is clicked
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Set the sort field and default to ascending order
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const filteredAndSortedCustomers = useMemo(() => {
    const filteredCustomers = initialCustomers?.filter(
      customer =>
        customer.attributes.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        customer.attributes.contact
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        customer.attributes.notes
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        customer.attributes.organization
          .toLowerCase()
          .includes(searchQuery.toLowerCase()),
    );

    // Sort the filtered customers based on sortField and sortOrder
    return filteredCustomers?.sort((a, b) => {
      const aValue = a.attributes[sortField];
      const bValue = b.attributes[sortField];

      if (sortOrder === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });
  }, [initialCustomers, searchQuery, sortField, sortOrder]);

  return {
    filteredAndSortedCustomers,
    handleSearch,
    sortField,
    sortOrder,
    handleSort,
    searchQuery,
  };
};

export default useCustomerFilterAndSort;
