import React, { Component } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';


const TypesOfServices = ({ serviceName, servicePrice }) => {
    return (
        <View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ width: hp('3%'), justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ ...styles.vrLine }} />
                </View>
                <Text style={[styles.service, { flex: 1 }]} numberOfLines={1} >- {serviceName}
                    {' '} : {' '}
                </Text>
                <Text style={[styles.price]}>₹{servicePrice}</Text>
            </View>
        </View>
    )
}
export default TypesOfServices;

const styles = StyleSheet.create({
    vrLine: {
        width: hp('0.1%'),
        height: hp('4%'),
        borderRadius: 10,
        backgroundColor: '#3C40C6',
    },
    service: {
        fontSize: hp('2.3%'),
        color: '#121212',
    },
    price: {
        fontSize: hp('2.5%'),
        fontWeight: 'bold',
        color: '#E74292',
        paddingRight: hp('3%'),
        paddingLeft: hp('1%'),
    }
});