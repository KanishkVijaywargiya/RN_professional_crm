import React, { Component } from 'react';
import { Text, StyleSheet, View, Dimensions, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import Header from '../Components/Header.js';
import GridImage from '../Components/GridImage.js';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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
        title: 'Clients',
        url: 'https://p73.f4.n0.cdn.getcloudapp.com/items/mXuA19mr/Numbers.png?v=dca618ea2bc8e0ced64f59423671c8b9',
        screenName: "HomeScreen"
    },
    {
        id: 2,
        title: 'CardSegment',
        url: 'https://p73.f4.n0.cdn.getcloudapp.com/items/jkuKLzKp/aligator.jpg?v=0c4dde03de5851f4d2aefce26f693268',
        screenName: "CardSegment"
    },
    {
        id: 3,
        title: 'Types of services',
        url: 'https://p73.f4.n0.cdn.getcloudapp.com/items/xQuDnPvB/colors.png?v=5ef6e6a612802ed603753898c254ceab',
        screenName: "NotificationScreen"
    },
    {
        id: 4,
        title: 'Types of cards',
        url: 'https://p73.f4.n0.cdn.getcloudapp.com/items/p9uP8R5O/behaviour.png?v=08fa26148dd63b42ae886186dc436a15',
        screenName: "CardSegmentNotification"
    },
    {
        id: 5,
        title: 'Analytics',
        url: 'https://p73.f4.n0.cdn.getcloudapp.com/items/7Ku0Ddw8/potato.png?v=1ded55b67b6eabbde0bb5ba72a98639e',
        screenName: "AnalyticsScreen"
    },
];
