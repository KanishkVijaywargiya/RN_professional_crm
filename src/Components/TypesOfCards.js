import React, { Component } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';


const TypesOfCards = ({ Title, Price, Validity, Description }) => {
    return (
        <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={[styles.ballMark]}></View>
                <Text style={[styles.Title]}>{Title}</Text>
            </View>

            <View style={{ borderLeftWidth: hp('0.1%'), paddingLeft: hp('1%') }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: hp('15%') }}>
                        <Text style={[styles.service]}>- Price
                            {'            '} : {' '}
                        </Text>
                    </View>
                    <View>
                        <Text style={[styles.price]}>₹{Price}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: hp('15%') }}>
                        <Text style={[styles.service]}>- Validity
                            {'        '} : {' '}
                        </Text>
                    </View>
                    <View style={[styles.adjustment]}>
                        <Text style={[styles.price]} numberOfLines={2}>{Validity}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text style={[styles.service]}>- Description
                            {' '} : {' '}
                        </Text>
                    </View>
                    <View style={[styles.adjustment]}>
                        <Text style={[styles.price]} numberOfLines={3}>{Description}</Text>
                    </View>
                </View>

            </View>
        </View>
    )
}
export default TypesOfCards;

const styles = StyleSheet.create({
    Title: {
        fontSize: hp('3.5%'),
        fontWeight: 'bold',
        color: '#b8bece',
        padding: hp('1%')
    },
    ballMark: {
        backgroundColor: '#ff3800',
        height: 20,
        width: 20,
        borderRadius: 10
    },
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
    },
    adjustment: {
        paddingRight: hp('15%')
    }
});