import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Dimensions, TextInput, Image, Animated, Button, Platform, ScrollView, Alert } from 'react-native';

import Header from '../Components/Header.js';
import Colors from '../Components/Color.js';

import { Item, Form, Label, Input, Content, Card, CardItem } from 'native-base';
import { RadioButton, RadioGroup } from 'react-native-flexi-radio-button';
import { Picker } from '@react-native-community/picker';
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
            paymentMode: '',
            dateDisplay: '',
        }
    }

    handleConfirm = (date) => {
        this.setState({ dateDisplay: moment(new Date(date)).format('DD-MM-YYYY').toString(), visibility: false })
    }
    onPressCancel = () => {
        this.setState({ visibility: false })
    }
    onPressButton = () => {
        this.setState({ visibility: true })
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
            this.state.mobile !== '' &&
            this.state.paymentMode !== '' &&
            this.state.miscType !== '' &&
            this.state.cardType !== '' &&
            this.state.dateDisplay !== ''
        ) {
            const user = await firebase
                .database()
                .ref('RegisterClient/')
                .child(`${this.state.mobile}`)
                .set({
                    Name: this.state.name,
                    email: this.state.email ? this.state.email : '',
                    mobile: this.state.mobile,
                    MiscType: this.state.miscType ? this.state.miscType : false,
                    CardType: this.state.cardType,
                    PaymentMode: this.state.paymentMode,
                    date: this.state.dateDisplay,
                })
            this.props.navigation.goBack();
        }
        else {
            // alert('Please fill the details')
            this.alertMsg()
        }
    }

    alertMsg = () => {
        if (
            this.state.dateDisplay == '' &&
            this.state.name == '' &&
            this.state.mobile == '' &&
            this.state.paymentMode == '' &&
            this.state.miscType == '' &&
            this.state.cardType == ''
        ) {
            alert('Please Fill all the Details');
            return
        }
        if (this.state.dateDisplay == '') {
            alert('Please Enter Date');
            return
        } if (this.state.name == '') {
            alert('Please Enter Customer Name');
            return
        } if (this.state.mobile == '') {
            alert('Please Enter Customer Mob. No.');
            return
        } if (this.state.paymentMode == '') {
            alert('Please Enter Payment Mode');
            return
        } if (this.state.miscType == '') {
            alert('Please Choose Customer Segment');
            return
        } if (this.state.cardType == '') {
            alert('Please Choose Category of Card');
            return
        }
    }



    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <Header title='Card Register' color='#7CEC9F' />
                <View style={{ position: 'absolute', top: Platform.OS === 'ios' ? hp('5%') : hp('2%'), left: Platform.OS === 'ios' ? hp('2%') : hp('2%') }}>
                    <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' }} onPress={() => this.props.navigation.goBack()}>
                        <Icon
                            name={'ios-arrow-back'}
                            color={'white'}
                            size={Platform.OS === 'ios' ? hp('3.5%') : hp('5%')}
                        />
                    </TouchableOpacity>
                </View>

                <KeyboardAwareScrollView>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={{ zIndex: 1000 }}>
                            <Form>
                                {/* Date Picker */}
                                <Item>
                                    <TouchableOpacity onPress={this.onPressButton} style={{ flex: 1, flexDirection: 'row' }}>
                                        <Icon name={Platform.OS === 'ios' ? 'ios-calendar' : 'md-calendar'} size={26} color='#121212' style={{ paddingTop: hp('1.5%'), paddingBottom: hp('1.5%') }} />
                                        <View style={{ margin: hp('1.5%'), justifyContent: 'center', flex: 1 }}>
                                            {this.state.dateDisplay ?
                                                <Text style={{ ...styles.content }}>{this.state.dateDisplay}</Text>
                                                :
                                                <Text style={{ ...styles.heading, color: '#121212' }}>Select Date</Text>
                                            }
                                            <DateTimePickerModal
                                                isVisible={this.state.visibility}
                                                onConfirm={this.handleConfirm}
                                                mode='date'
                                                minimumDate={new Date()}
                                                onCancel={this.onPressCancel}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </Item>

                                {/* name */}
                                <Item>
                                    <Icon name='person' size={26} color={color} />
                                    <Input placeholder="Customer Name" style={{ ...styles.formfields }} autoCorrect={false} onChangeText={(name) => this.setState({ name })} />
                                </Item>

                                {/* email */}
                                <Item>
                                    <Icon name='mail' size={26} color={color} />
                                    <Input placeholder="Customer Email" style={{ ...styles.formfields }} autoCorrect={false} autoCapitalize={false} keyboardType='email-address' onChangeText={(email) => this.setState({ email })} />
                                </Item>

                                {/* mobile no */}
                                <Item>
                                    <Icon name='ios-phone-portrait' size={26} color={color} />
                                    <Input placeholder="Customer Mob." style={{ ...styles.formfields }} keyboardType='phone-pad' onChangeText={(mobile) => this.setState({ mobile })} />
                                </Item>

                                {/* payment dropdown */}
                                {Platform.OS == 'ios' ?
                                    <View style={{ zIndex: 1000, elevation: 1000, margin: hp('3%'), paddingBottom: hp('10%') }}>
                                        <View>
                                            <View style={{ zIndex: 500, elevation: 500 }}>
                                                <DropDownPicker
                                                    items={modeOfPayment2}
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
                                    :
                                    <View style={{ marginTop: 10, zIndex: 1000, elevation: 1000 }}>
                                        <View>
                                            <View style={{ zIndex: 300, elevation: 300 }}>
                                                <Picker
                                                    selectedValue={this.state.paymentMode ? this.state.paymentMode : 'Select the mode of payment'}
                                                    style={{ height: Platform.OS == 'ios' ? 100 : 40, marginBottom: 20 }}
                                                    onValueChange={item => this.setState({
                                                        paymentMode: item
                                                    })}>
                                                    {modeOfPayment.map((item, key) => (
                                                        <Picker.Item label={item.label} value={item.value} key={key} />)
                                                    )}
                                                </Picker>
                                            </View>
                                        </View>
                                    </View>
                                }

                                <View style={{ marginLeft: hp('2.7%'), marginRight: hp('0.2%'), marginTop: Platform.OS == 'ios' ? hp('-4%') : hp('-3%') }}>
                                    <Text style={{ ...styles.heading, color: '#2ecc72' }}>Select Customer Segment</Text>
                                    <View style={[styles.radioButtonView]}>
                                        <RadioGroup
                                            color='#2ecc72'
                                            thickness={2}
                                            style={{ flexDirection: "row" }}
                                            onSelect={(index, value) => this.onCustomerSegmentSelect(index, value)}
                                            selectedIndex={-1}
                                        >
                                            <RadioButton value={"Cards"}><Text>Card Type</Text></RadioButton>
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
                            </Form>
                        </View>
                    </ScrollView>
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
    dropdown: {
        height: hp('6%'),
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
        label: 'Payment Mode',
        value: 'Payment Mode'
    },
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

const modeOfPayment2 = [
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
