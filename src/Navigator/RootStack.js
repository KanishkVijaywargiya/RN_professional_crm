import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../Screens/Login.js';
import ForgotPassword from '../Screens/ForgotPassword.js';

const RootStack = createStackNavigator();

const RootStackScreens = ({ navigation }) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen
            name='Login'
            component={Login}
        />
        <RootStack.Screen
            name='ForgotPassword'
            component={ForgotPassword}
        />
    </RootStack.Navigator>
)
export default RootStackScreens;