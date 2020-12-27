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
            title: '',
            price: '',
            validity: '',
            description: ''
        }
    }

    uploadData = async () => {

        if (this.state.title !== '' &&
            this.state.price !== '' &&
            this.state.validity !== '' &&
            this.state.description !== '') {
            const user = await firebase
                .database()
                .ref(`CardHolders/`)
                .child(`${this.state.title}-${this.state.price}`)
                .set({
                    Title: this.state.title,
                    Price: this.state.price,
                    Validity: this.state.validity,
                    Description: this.state.description
                })
            this.props.navigation.goBack();
        }
        else {
            this.alertMsg()
        }
    }

    alertMsg = () => {
        if (
            this.state.title == '' &&
            this.state.price == '' &&
            this.state.validity == '' &&
            this.state.description == ''
        ) {
            alert('Please Fill all the Details');
            return
        } if (this.state.title == '') {
            alert('Please Enter Title');
            return
        } if (this.state.price == '') {
            alert('Please Enter Price');
            return
        } if (this.state.validity == '') {
            alert('Please Enter Validity');
            return
        } if (this.state.description == '') {
            alert('Please Enter Description');
            return
        }
    }

    render() {
        return (
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
                <Header title='Add new cards' color='#7CEC9F' />
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
                                {/* title */}
                                <Item>
                                    <Icon name='list' size={26} color={color} />
                                    <Input placeholder="Title" style={{ ...styles.formfields }} autoCorrect={false} onChangeText={title => this.setState({ title: title })} />
                                </Item>

                                {/* price */}
                                <Item>
                                    <Icons name='inr' size={26} color={color} />
                                    <Input placeholder="Price" style={{ ...styles.formfields }} keyboardType="number-pad" autoCorrect={false} onChangeText={price => this.setState({ price: price })} />
                                </Item>

                                {/* validity */}
                                <Item>
                                    <Icon name='alarm-outline' size={26} color={color} />
                                    <Input placeholder="Validity" style={{ ...styles.formfields }} autoCorrect={false} onChangeText={validity => this.setState({ validity: validity })} />
                                </Item>

                                {/* description */}
                                <Item>
                                    <Icon name='list' size={26} color={color} />
                                    <Input placeholder="Description" style={{ ...styles.formfields }} autoCorrect={false} onChangeText={description => this.setState({ description: description })} />
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
