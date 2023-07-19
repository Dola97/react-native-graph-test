import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from './app/navigations';
import {Provider} from 'react-redux';
import {store, persistor} from './app/store/store';
import {PersistGate} from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {accessToken} from './app/constants';

const httpLink = createHttpLink({
  uri: 'http://localhost:1337/graphql',
});
const authLink = setContext(async (_, {headers}) => {
  // get the authentication token from local storage if it exists
  const token = await AsyncStorage.getItem(accessToken);
  console.log('token ', token);
  // const token =
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjg5NjY2MDk5LCJleHAiOjE2OTIyNTgwOTl9.8MDAkSwv64KSbeGv_QguoyK8i7vM4qybnF0jDFwIeaM';
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
const App = () => {
  return (
    <React.Fragment>
      <SafeAreaProvider>
        <StatusBar
          barStyle={'dark-content'}
          translucent
          backgroundColor="transparent"
          animated={true}
        />
        <AppNavigator />
      </SafeAreaProvider>
      <Toast topOffset={50} />
    </React.Fragment>
  );
};

export default () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
};
