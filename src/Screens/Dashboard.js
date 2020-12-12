import React, { Component } from 'react';
import { Text, StyleSheet, View, Dimensions, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import Header from '../Components/Header.js';
import GridImage from '../Components/GridImage.js';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Entypo from 'react-native-vector-icons/Entypo';

const { width } = Dimensions.get('window');

export default class Dashboard extends Component {

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar hidden={true} />
                <Header title="Dashboard" color="#3498DB" />
                <ScrollView style={{ marginTop: hp('1%'), marginBottom: hp('1%') }} showsVerticalScrollIndicator={false}>
                    <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                        {dummyData.map((item, index) => (
                            <TouchableOpacity key={index} onPress={() => this.props.navigation.navigate(item.screenName)}>
                                <GridImage image={{ uri: item.url }} text={item.title} width={width / 2 - 20} />
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                        bottom: Platform.OS === 'ios' ? hp('2%') : hp('0.2%'),
                    }}>
                    <Text
                        style={{
                            color: '#DAE0E2',
                            fontSize: 10,
                            fontStyle: 'italic',
                            fontWeight: 'bold',
                        }}>
                        BlaceNova Inc.
                        <Text style={{ fontSize: 10, lineHeight: 10 }}>TM</Text>
                    </Text>
                </View>
                <View style={[styles.uploadButton]}>
                    <Text style={{ color: '#fff', fontSize: Platform.OS === 'ios' ? 22 : 18, fontWeight: 'bold' }}>Clean N Shine</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    uploadButton: {
        backgroundColor: '#3498DB',
        width: hp('100%'),
        height: Platform.OS === 'ios' ? hp('10%') : hp('7%'),
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        elevation: 10,
        shadowOpacity: 0.3,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 2 }
    },
})


const dummyData = [
    {
        id: 1,
        title: 'Customer Details',
        url: 'https://p73.f4.n0.cdn.getcloudapp.com/items/eDuwjGlo/Artboard%20%E2%80%93%2023.png?v=8b79143664b919e8c955894ca6f6e8ea',
        screenName: "HomeScreen"
    },
    {
        id: 2,
        title: 'Card Buyers',
        url: 'https://p73.f4.n0.cdn.getcloudapp.com/items/P8um5L6l/Artboard%20%E2%80%93%2024.png?v=28a7b15e7bbd45dd7aa72b09f744a0e0',
        screenName: "CardSegment"
    },
    {
        id: 3,
        title: 'Types of services',
        url: 'https://p73.f4.n0.cdn.getcloudapp.com/items/KouldpAw/Artboard%20%E2%80%93%2021.png?v=499ac7752d5cdbc81059ccb8c27ad73f',
        screenName: "NotificationScreen"
    },
    {
        id: 4,
        title: 'Types of cards',
        url: 'https://p73.f4.n0.cdn.getcloudapp.com/items/mXu5pwJj/Artboard%20%E2%80%93%2022.png?v=ce1aa2925c4f4bc2ffb750cbe0a632fa',
        screenName: "CardSegmentNotification"
    },
    {
        id: 5,
        title: 'Analytics',
        url: 'https://p73.f4.n0.cdn.getcloudapp.com/items/v1u4bZLm/Artboard%20%E2%80%93%2025.png?v=42b797ab4bf43ceaea607cf2c05e7746',
        screenName: "AnalyticsScreen"
    },
];
