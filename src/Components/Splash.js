import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, Platform } from 'react-native'
import LottieView from 'lottie-react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Splash = props => (
    <View style={{ flex: 1, alignItems: 'center', }}>
        {/* <Text style={{ fontWeight: 'bold', marginTop: 80, fontSize: Platform.OS === 'ios' ? hp('4.5%') : hp('4.5%') }}>Clean N Shine</Text> */}
        {/* <Text style={{ fontWeight: 'bold', fontSize: Platform.OS === 'ios' ? hp('4.5%') : hp('4.5%') }}>CRM</Text> */}
        <Image style={{ marginTop: Platform.OS == 'ios' ? hp('5%') : hp('2%') }} source={require('../Assets/LoginLogo/login.png')} />
        <Text style={{ marginTop: Platform.OS == 'ios' ? hp('-7%') : hp('-5%'), fontWeight: 'bold', fontSize: Platform.OS === 'ios' ? hp('4.5%') : hp('4.5%'), color: '#0267AA', fontStyle: 'italic' }}>C R M</Text>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <LottieView style={{ width: hp('35%'), height: hp('35%'), }} source={require('../Assets/LottieJson/splash.json')} autoPlay loop />
        </View>
        <View>
            <Text style={{ color: '#121212', fontSize: 10, fontStyle: 'italic' }}>BlaceNova Inc.<Text style={{ fontSize: 10, lineHeight: 50 }}>TM</Text></Text>
        </View>
    </View>
)
export default Splash;
