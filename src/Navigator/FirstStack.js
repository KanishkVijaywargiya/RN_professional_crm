import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import HomeScreen from '../Screens/HomeScreen.js';
import AnalyticsScreen from '../Screens/AnalyticsScreen.js';
import FormScreen from '../Screens/FormScreen.js';
import NotificationScreen from '../Screens/NotificationScreen.js';
import AndroidForm from '../Screens/AndroidForm.js';
import RegisterCustomer from '../Screens/RegisterCustomer.js';
import Misc from '../Screens/Misc.js';

import BottomTabs from '../Navigator/BottomTab.js';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default FirstStack = ({ navigation }) => (
  <Stack.Navigator initialRouteName="HomeScreen">
    <Stack.Screen
      name="HomeScreen"
      component={BottomTabs}
      options={{
        title: 'Home',
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="AnalyticsScreen"
      component={AnalyticsScreen}
      options={{
        title: 'Analytics',
        headerShown: false,
      }}
    />

    <Stack.Screen
      name="NotificationScreen"
      component={NotificationScreen}
      options={{
        // title: 'Form',
        headerShown: false,
      }}
    />

    <Stack.Screen
      name="FormScreen"
      component={FormScreen}
      options={{
        title: 'Form',
        headerShown: false,
      }}
    />

    <Stack.Screen
      name="AndroidForm"
      component={AndroidForm}
      options={{
        title: 'Form',
        headerShown: false,
      }}
    />

    <Stack.Screen
      name="RegisterCustomer"
      component={RegisterCustomer}
      options={{
        title: 'RegisterCustomer',
        headerShown: false,
      }}
    />

    <Stack.Screen
      name="Misc"
      component={Misc}
      options={{
        title: 'Misc',
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);
