import React, { Component } from 'react';
import { Text, StyleSheet, View, Platform, TouchableOpacity } from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { Picker } from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/Ionicons';

import Header from '../Components/Header.js';

export default class AnalyticsScreen extends Component {
    render() {
        return (
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
                <Header title='Analytics' color='#45CE30' />
                <View style={{ position: 'absolute', top: Platform.OS === 'ios' ? hp('5%') : hp('2%'), left: Platform.OS === 'ios' ? hp('2%') : hp('2%') }}>
                    <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' }} onPress={() => this.props.navigation.goBack()}>
                        <Icon
                            name={'ios-arrow-back'}
                            color={'white'}
                            size={Platform.OS === 'ios' ? hp('3.5%') : hp('5%')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', top: hp('78%') }}>
                    <Text style={{ color: '#DAE0E2', fontSize: 10, fontStyle: 'italic', fontWeight: 'bold' }}>BlaceNova Inc.<Text style={{ fontSize: 10, lineHeight: 50 }}>TM</Text></Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({})
