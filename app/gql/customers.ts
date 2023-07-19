import {gql} from '@apollo/client';

export const GET_CUSTOMERS = gql`
  query getCustomers {
    customers {
      data {
        id
        attributes {
          name
          contact
          notes
          organization
        }
      }
    }
  }
`;

export const ADD_CUSTOMER = gql`
  mutation CreateCustomer(
    $name: String!
    $contact: String!
    $notes: String!
    $organization: String!
  ) {
    createCustomer(
      data: {
        name: $name
        contact: $contact
        notes: $notes
        organization: $organization
      }
    ) {
      data {
        id
        attributes {
          name
          contact
          notes
          organization
        }
      }
    }
  }
`;

export const UPDATE_CUSTOMER = gql`
  mutation UpdateCustomer(
    $id: ID!
    $name: String!
    $contact: String!
    $notes: String!
    $organization: String!
  ) {
    updateCustomer(
      id: $id
      data: {
        name: $name
        contact: $contact
        notes: $notes
        organization: $organization
      }
    ) {
      data {
        id
        attributes {
          name
          contact
          notes
          organization
        }
      }
    }
  }
`;

export const DELETE_CUSTOMER = gql`
  mutation DeleteCustomer($id: ID!) {
    deleteCustomer(id: $id) {
      data {
        id
        attributes {
          name
          contact
          notes
          organization
        }
      }
    }
  }
`;
