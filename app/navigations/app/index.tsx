import React from 'react';
import {AppParamsList} from '../paramslist';
import {UserScreen} from '../../screens/user-management';
import {CustomerScreen} from '../../screens/customer-managment';
import {InteractionsScreen} from '../../screens/interaction-management';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator<AppParamsList>();
export const AppStackScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Customer" component={CustomerScreen} />
      <Tab.Screen name="User" component={UserScreen} />
      <Tab.Screen name="Interactions" component={InteractionsScreen} />
    </Tab.Navigator>
  );
};
