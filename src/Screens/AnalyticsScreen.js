import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Header from '../Components/Header.js';

export default class AnalyticsScreen extends Component {
    render() {
        return (
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
                <Header title='Analytics' color='#45CE30' />
                <View style={{ justifyContent: 'center', alignItems: 'center', top: hp('78%') }}>
                    <Text style={{ color: '#DAE0E2', fontSize: 10, fontStyle: 'italic', fontWeight: 'bold' }}>BlaceNova Inc.<Text style={{ fontSize: 10, lineHeight: 50 }}>TM</Text></Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({})
