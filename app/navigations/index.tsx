import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootNavigator} from './root';

const Root = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};
export default Root;
