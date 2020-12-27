import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image, Animated, Button, Platform, ScrollView, Alert } from 'react-native';

import Header from '../Components/Header.js';

import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/FontAwesome';

import { Item, Form, Label, Input, Content, Card, CardItem } from 'native-base';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { color } from 'react-native-reanimated';
import { Picker } from '@react-native-community/picker';

import * as firebase from 'firebase/app';
import 'firebase/database';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

export default class AddNewCards extends Component {

    constructor(props) {
        super(props)
        this.state = {
            categoryType: '',
            serviceName: '',
            servicePrice: ''
        }
    }

    uploadData = async () => {

        if (this.state.categoryType !== '' &&
            this.state.serviceName !== '' &&
            this.state.servicePrice !== '') {
            const user = await firebase
                .database()
                .ref(`${this.state.categoryType}/`)
                .child(`${this.state.serviceName}`)
                .set({
                    Service: this.state.serviceName,
                    Price: this.state.servicePrice,
                })
            this.props.navigation.goBack();
        }
        else {
            this.alertMsg()
        }
    }

    alertMsg = () => {
        if (
            this.state.categoryType == '' &&
            this.state.serviceName == '' &&
            this.state.servicePrice == ''
        ) {
            alert('Please Fill all the Details');
            return
        } if (this.state.categoryType == '') {
            alert('Please Choose Category Type');
            return
        } if (this.state.serviceName == '') {
            alert('Please Enter Service Name');
            return
        } if (this.state.servicePrice == '') {
            alert('Please Enter Service Price');
            return
        }
    }

    render() {
        return (
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
                <Header title='Add new services' color='#7CEC9F' />
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
                                {/* dropdown */}
                                <View style={{ marginTop: 10, zIndex: 1000, elevation: 1000 }}>
                                    <View>
                                        <View style={{ zIndex: 300, elevation: 300 }}>
                                            <Picker
                                                selectedValue={this.state.categoryType ? this.state.categoryType : 'Select the Category of Vehicle'}
                                                style={{ height: Platform.OS == 'ios' ? 100 : 40, marginBottom: 20 }}
                                                onValueChange={item => this.setState({
                                                    categoryType: item
                                                })}>
                                                {categoryOfVehicle.map((item, key) => (
                                                    <Picker.Item label={item.label} value={item.value} key={key} />)
                                                )}
                                            </Picker>
                                        </View>
                                    </View>
                                </View>
                                <Item>
                                    <Icon name='list' size={26} color={color} />
                                    <Input placeholder="Service Name" style={{ ...styles.formfields }} autoCorrect={false} onChangeText={serviceName => this.setState({ serviceName: serviceName })} />
                                </Item>
                                <Item>
                                    <Icons name='inr' size={26} color={color} />
                                    <Input placeholder="Service Price" style={{ ...styles.formfields }} autoCorrect={false} keyboardType="number-pad" onChangeText={servicePrice => this.setState({ servicePrice: servicePrice })} />
                                </Item>
                            </Form>
                        </View>
                    </ScrollView>
                </KeyboardAwareScrollView>

                <View style={{ marginBottom: hp('2%') }}></View>
                {/* Upload Button ~ Uploads & takes back to dash board */}
                <TouchableOpacity style={[styles.uploadButton]} onPress={() => this.uploadData()}>
                    <Text style={{ color: '#fff', fontSize: Platform.OS === 'ios' ? 22 : 18, fontWeight: '600' }}>Upload Data</Text>
                    <Text style={{ color: '#DAE0E2', fontSize: 10, fontStyle: 'italic' }}>BlaceNova Inc.<Text style={{ color: '#DAE0E2', fontSize: 10, lineHeight: Platform.OS === 'ios' ? 50 : 10, fontStyle: 'italic' }}>TM</Text></Text>
                </TouchableOpacity >

            </View>
        )
    }
}

const styles = StyleSheet.create({
    formfields: {
        fontSize: Platform.OS === 'ios' ? hp('2%') : hp('2.5%'),
        marginLeft: hp('0.5%'),
        marginRight: hp('0.2%'),
        color: '#2ecc72',
        fontSize: 18,
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

const categoryOfVehicle = [
    {
        id: 1,
        label: 'Category of vehicle',
        value: 'Category of vehicle'
    },
    {
        id: 1,
        label: 'Hatch Back',
        value: 'Hatch Back'
    },
    {
        id: 2,
        label: 'Sedan - C-SUV',
        value: 'Sedan - C-SUV'
    },
    {
        id: 3,
        label: 'SUV-MUV',
        value: 'SUV-MUV'
    },
    {
        id: 4,
        label: 'Luxury',
        value: 'Luxury'
    },
    {
        id: 5,
        label: 'Regular',
        value: 'Regular'
    },
    {
        id: 6,
        label: 'Splender',
        value: 'Splender'
    },
    {
        id: 7,
        label: 'Super Bike',
        value: 'Super Bike'
    },
]
