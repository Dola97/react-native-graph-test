import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootParamsList} from '../paramslist';
import {AuthStackScreen} from '../auth';
import {useAppSelector} from '../../store/hooks';
import {AppStackScreen} from '../app';

const RootStack = createNativeStackNavigator<RootParamsList>();

export const RootNavigator = () => {
  const isAuth = useAppSelector(
    state => state.login.user || state.register.user,
  );
  console.log(isAuth);

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {!isAuth ? (
        <RootStack.Screen component={AuthStackScreen} name="Auth" />
      ) : (
        <RootStack.Screen component={AppStackScreen} name="App" />
      )}
    </RootStack.Navigator>
  );
};
