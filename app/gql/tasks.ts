import {gql} from '@apollo/client';

export const ADD_TASK = gql`
  mutation CreateTask(
    $name: String!
    $notes: String!
    $duration: String!
    $date: String!
    $id: ID!
  ) {
    createTask(
      data: {
        name: $name
        notes: $notes
        duration: $duration
        date: $date
        customer: $id
      }
    ) {
      data {
        id
        attributes {
          name
          notes
          duration
          date
        }
      }
    }
  }
`;

export const GET_TASKS = gql`
  query getTasks {
    tasks {
      data {
        id
        attributes {
          date
          name
          notes
          customer {
            data {
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;
