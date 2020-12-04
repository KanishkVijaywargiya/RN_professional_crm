import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Dashboard from '../Screens/Dashboard.js';
import HomeScreen from '../Screens/HomeScreen.js';
import CardSegment from '../Screens/CardSegment.js';
import AnalyticsScreen from '../Screens/AnalyticsScreen.js';
import FormScreen from '../Screens/FormScreen.js';
import NotificationScreen from '../Screens/NotificationScreen.js';
import CardSegmentNotification from '../Screens/CardSegmentNotification.js';
import AndroidForm from '../Screens/AndroidForm.js';
import CardRegister from '../Screens/CardRegister.js';
import Misc from '../Screens/Misc.js';

import BottomTabs from '../Navigator/BottomTab.js';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default FirstStack = ({ navigation }) => (
  <Stack.Navigator initialRouteName="Dashboard">
    <Stack.Screen
      name="Dashboard"
      component={Dashboard}
      options={{
        title: 'Dashboard',
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{
        title: 'Home',
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="CardSegment"
      component={CardSegment}
      options={{
        title: 'Card Segment',
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
      name="CardSegmentNotification"
      component={CardSegmentNotification}
      options={{
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
      name="CardRegister"
      component={CardRegister}
      options={{
        title: 'CardRegister',
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
