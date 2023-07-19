import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthParamsList} from '../paramslist';
import {LoginScreen} from '../../screens/login';
import {RegisterScreen} from '../../screens/register';

const AuthStack = createNativeStackNavigator<AuthParamsList>();

export const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="SignUp" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
};
