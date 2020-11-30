import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Dimensions, TextInput, Image, Animated, Button, Platform, ScrollView, Alert } from 'react-native';

import Header from '../Components/Header.js';
import Colors from '../Components/Color.js';

import { Item, Form, Label, Input, Content, Card, CardItem } from 'native-base';
import { RadioButton, RadioGroup } from 'react-native-flexi-radio-button';
import DropDownPicker from 'react-native-dropdown-picker';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';


import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import { color } from 'react-native-reanimated';

import * as firebase from 'firebase/app';
import 'firebase/database';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';


export default class RegisterCustomer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            mobile: '',
            miscType: false,
            cardType: '',
            paymentMode: ''
        }
    }

    onCustomerSegmentSelect = (index, value) => {
        this.setState({
            miscType: true,
            cardType: ''
        })
    }
    onCardSelect = (index, value) => {
        this.setState({
            cardType: value
        })
    }

    uploadData = async () => {
        if (this.state.name !== '' &&
            this.state.email !== '' &&
            this.state.mobile !== '' &&
            this.state.paymentMode !== '' &&
            this.state.miscType !== '' &&
            this.state.cardType !== ''
        ) {
            const user = await firebase
                .database()
                .ref('RegisterClient/')
                .child(`${this.state.mobile}`)
                .set({
                    Name: this.state.name,
                    email: this.state.email,
                    mobile: this.state.mobile,
                    MiscType: this.state.miscType ? this.state.miscType : false,
                    CardType: this.state.cardType,
                    PaymentMode: this.state.paymentMode,
                })
            this.props.navigation.goBack();
        }
        else {
            alert('Please fill the details')
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <Header title='Register Client' color='#7CEC9F' />

                <KeyboardAwareScrollView>
                    <View style={{ zIndex: 1000 }}>
                        {/* <Form> */}
                        {/* name */}
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: Platform.OS === 'ios' ? hp('3%') : hp('3%'),
                                height: Platform.OS === 'ios' ? hp('6.5%') : hp('8%'),
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: '#3498DB',
                                alignSelf: 'center',
                                width: Dimensions.get('window').width - 30,
                            }}>
                            <View style={{ flex: 0.2, alignItems: 'center' }}>
                                <MaterialIcons name="person" size={32} />
                            </View>
                            <TextInput
                                style={{ flex: 0.8, fontSize: 22, color: '#3498DB' }}
                                autoCapitalize="none"
                                autoCorrect={false}
                                placeholder="Name"
                                placeholderTextColor="#3C4560"
                                keyboardType="email-address"
                                onChangeText={(name) => this.setState({ name })}
                                value={this.state.name}
                                opacity={0.5}
                            />
                        </View>

                        {/* email */}
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: Platform.OS === 'ios' ? hp('3%') : hp('3%'),
                                height: Platform.OS === 'ios' ? hp('6.5%') : hp('8%'),
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: '#3498DB',
                                alignSelf: 'center',
                                width: Dimensions.get('window').width - 30,
                            }}>
                            <View style={{ flex: 0.2, alignItems: 'center' }}>
                                <MaterialIcons name="email" size={32} />
                            </View>
                            <TextInput
                                style={{ flex: 0.8, fontSize: 22, color: '#3498DB' }}
                                autoCapitalize="none"
                                autoCorrect={false}
                                placeholder="Email"
                                placeholderTextColor="#3C4560"
                                keyboardType="email-address"
                                onChangeText={(email) => this.setState({ email })}
                                value={this.state.email}
                                opacity={0.5}
                            />
                        </View>

                        {/* mobile no */}
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: Platform.OS === 'ios' ? hp('3%') : hp('3%'),
                                height: Platform.OS === 'ios' ? hp('6.5%') : hp('8%'),
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: '#3498DB',
                                alignSelf: 'center',
                                width: Dimensions.get('window').width - 30,
                            }}>
                            <View style={{ flex: 0.2, alignItems: 'center' }}>
                                <Icon name="ios-phone-portrait" size={32} />
                            </View>
                            <TextInput
                                style={{ flex: 0.8, fontSize: 22, color: '#3498DB' }}
                                autoCapitalize="none"
                                autoCorrect={false}
                                placeholder="Mobile No."
                                placeholderTextColor="#3C4560"
                                keyboardType="email-address"
                                onChangeText={(mobile) => this.setState({ mobile })}
                                value={this.state.mobile}
                                opacity={0.5}
                            />
                        </View>

                        {/* payment dropdown */}
                        <View style={{ marginTop: 10, zIndex: 1000, elevation: 1000 }}>
                            <View>
                                <View style={{ zIndex: 300, elevation: 300 }}>
                                    <DropDownPicker
                                        items={modeOfPayment}
                                        placeholder='Select the mode of payment'
                                        containerStyle={[styles.dropdown, { zIndex: 300, elevation: 300, }]}
                                        itemStyle={{
                                            justifyContent: 'flex-start',
                                            zIndex: 300,
                                            elevation: 1000,
                                            backgroundColor: '#fff'
                                        }}
                                        onChangeItem={item => this.setState({
                                            paymentMode: item.value
                                        })}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={{ marginLeft: hp('2.7%'), marginRight: hp('0.2%'), marginTop: hp('1%') }}>
                            <Text style={{ ...styles.heading, color: '#2ecc72' }}>Select Customer Segment</Text>
                            <View style={[styles.radioButtonView]}>
                                <RadioGroup
                                    color='#2ecc72'
                                    thickness={2}
                                    style={{ flexDirection: "row" }}
                                    onSelect={(index, value) => this.onCustomerSegmentSelect(index, value)}
                                    selectedIndex={-1}
                                >
                                    <RadioButton value={"Cards"}><Text>Misc</Text></RadioButton>
                                </RadioGroup>
                            </View>
                        </View>

                        <View style={{ zIndex: 500, marginBottom: hp('1%') }}>
                            {this.state.miscType ?

                                <View>
                                    <Text style={{ ...styles.heading, marginHorizontal: hp('2.7%'), color: '#2ecc72' }}>Select Category of Card</Text>
                                    <RadioGroup
                                        color='#2ecc72'
                                        thickness={2}
                                        onSelect={(index, value) => this.onCardSelect(index, value)}
                                        style={{ marginHorizontal: hp('3%') }}
                                    >
                                        <RadioButton value={"Value Card ₹2000"}><Text style={{ fontWeight: 'bold' }}>Value Card ₹2000</Text></RadioButton>
                                        <RadioButton value={"Value Card ₹5000"}><Text style={{ fontWeight: 'bold' }}>Value Card ₹5000</Text></RadioButton>
                                        <RadioButton value={"Value Card ₹10000"}><Text style={{ fontWeight: 'bold' }}>Value Card ₹10000</Text></RadioButton>
                                        <RadioButton value={"Previledge Card ₹650"}><Text style={{ fontWeight: 'bold' }}>Previledge Card ₹650</Text></RadioButton>
                                    </RadioGroup>
                                </View>
                                :
                                null
                            }
                        </View>
                    </View>
                </KeyboardAwareScrollView>

                <TouchableOpacity style={[styles.uploadButton]} onPress={() => this.uploadData()}>
                    <Text style={{ color: '#fff', fontSize: Platform.OS === 'ios' ? 22 : 18, fontWeight: '600' }}>Upload Data</Text>
                    <Text style={{ color: '#DAE0E2', fontSize: 10, fontStyle: 'italic' }}>BlaceNova Inc.<Text style={{ color: '#DAE0E2', fontSize: 10, lineHeight: Platform.OS === 'ios' ? 50 : 10, fontStyle: 'italic' }}>TM</Text></Text>
                </TouchableOpacity >
            </View>
        )
    }
}

const styles = StyleSheet.create({
    heading: {
        fontSize: Platform.OS === 'ios' ? hp('2%') : hp('2.5%'),
        color: '#121212',
        fontWeight: 'bold'
    },
    uploadButton: {
        backgroundColor: '#121212',
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

const modeOfPayment = [
    {
        id: 1,
        label: 'Cash',
        value: 'Cash'
    },
    {
        id: 2,
        label: 'Card',
        value: 'Card'
    },
    {
        id: 3,
        label: 'Google Pay',
        value: 'Google Pay'
    },
    {
        id: 4,
        label: 'Paytm',
        value: 'Paytm'
    },
    {
        id: 5,
        label: 'Phone Pay',
        value: 'Phone Pay'
    },
    {
        id: 6,
        label: 'Bhim App',
        value: 'Bhim App'
    },
    {
        id: 7,
        label: 'Bank',
        value: 'Bank'
    },
]
