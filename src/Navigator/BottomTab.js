import React, { Component } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../Screens/HomeScreen.js';
import AnalyticsScreen from '../Screens/AnalyticsScreen.js';
import ProfileScreen from '../Screens/ProfileScreen.js';

const Tab = createMaterialBottomTabNavigator();

export default BottomTabs = () => (
    <Tab.Navigator initialRouteName='HomeScreen' shifting={true}>
        <Tab.Screen name='HomeScreen'
            component={HomeScreen}
            options={{
                tabBarLabel: 'Home',
                tabBarColor: '#0A79DF',
                tabBarIcon: ({ color }) => (
                    <Icon name='home' color={color} size={26} />
                ),
            }}
        />
        <Tab.Screen name='AnalyticsScreen'
            component={AnalyticsScreen}
            options={{
                tabBarLabel: 'Analytics',
                tabBarColor: '#45CE30',
                tabBarIcon: ({ color }) => (
                    <Icon name="pie-chart" color={color} size={26} />
                ),
            }}
        />

        <Tab.Screen name='ProfileScreen'
            component={ProfileScreen}
            options={{
                tabBarLabel: 'Profile',
                tabBarColor: '#E83350',
                tabBarIcon: ({ color }) => (
                    <Icon name="md-person" color={color} size={26} />
                ),
            }}
        />
    </Tab.Navigator>
)
