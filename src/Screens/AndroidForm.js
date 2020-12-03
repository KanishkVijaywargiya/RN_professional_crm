import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image, Animated, Button, Platform, ScrollView, Alert } from 'react-native';

import Header from '../Components/Header.js';
import Colors from '../Components/Color.js';

import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/FontAwesome';
import BikeIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddressIcon from 'react-native-vector-icons/Entypo';

import { Item, Form, Label, Input, Content, Card, CardItem } from 'native-base';
import { RadioButton, RadioGroup } from 'react-native-flexi-radio-button';
import DropDownPicker from 'react-native-dropdown-picker';
import { Picker } from '@react-native-community/picker';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import { color } from 'react-native-reanimated';

import * as firebase from 'firebase/app';
import 'firebase/database';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';


class FormScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            visibility: false,
            dateDisplay: '',
            gstNo: '19AAAIFC8800A1ZR',
            clientsName: '',
            clientsAddress: '',
            clientsEmail: '',
            clientsPhone: '',
            clientGst: '',
            paymentMode: '',
            miscType: false,
            cardType: '',
            vehicleType: '',
            categoryType: '',
            serviceType: '',
            serviceType2: '',
            serviceType3: '',
            serviceType4: '',
            serviceType5: '',
            serviceType6: '',
            serviceType7: '',
            serviceType8: '',
            serviceType9: '',
            serviceType10: '',
            clientsVehicleName: '',
            clientsVehicleNumber: '',
            totalPrice: '',
            price1: '',
            price2: '',
            price3: '',
            price4: '',
            price5: '',
            discount: '',
            categoryColor: '',
            showDropDown: [false, false, false, false, false, false, false, false, false, false],
            showButton: [true, false, false, false, false, false, false, false, false, false],
            showBikeDropDown: [false, false, false, false, false, false, false, false, false, false],
            showBikeButton: [true, false, false, false, false, false, false, false, false, false],
            language: '',
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

    onSelect = (index, value) => {
        this.setState({
            vehicleType: value,
            categoryType: '', serviceType: '', serviceType2: '',
            serviceType3: '',
            serviceType4: '',
            serviceType5: '',
            totalPrice: '',
            price1: '',
            price2: '',
            price3: '',
            price4: '',
            price5: '',
            categoryColor: '',
            showDropDown: [false, false, false, false, false, false, false, false, false, false],
            showButton: [true, false, false, false, false, false, false, false, false, false],
            showBikeDropDown: [false, false, false, false, false, false, false, false, false, false],
            showBikeButton: [true, false, false, false, false, false, false, false, false, false]
        })
    }
    onCategorySelect = (index, value) => {
        this.setState({
            categoryType: value
        })
        this.categoryColorsList()
    }

    // calculate discount in normal billing
    calculateDiscount = () => {
        var number = this.state.discount / 100

        this.setState({
            discount: number
        })
    }

    uploadData = async () => {

        if (this.state.clientsName !== '' &&
            this.state.clientsAddress !== '' &&
            this.state.clientsPhone !== '' &&
            this.state.paymentMode !== '' &&
            this.state.vehicleType !== '' &&
            this.state.categoryType !== '' &&
            this.state.serviceType !== '' &&
            this.state.clientsVehicleName !== '' &&
            this.state.clientsVehicleNumber !== '' &&
            this.state.dateDisplay !== '' &&
            this.state.categoryColor !== '') {
            const user = await firebase
                .database()
                .ref('Client/')
                .child(`${this.state.clientsPhone}`)
                .set({
                    GstNo: this.state.gstNo,
                    Email: this.state.clientsEmail ? this.state.clientsEmail : '',
                    Name: this.state.clientsName,
                    Address: this.state.clientsAddress,
                    Phone: this.state.clientsPhone,
                    ClientGst: this.state.clientGst,
                    PaymentMode: this.state.paymentMode,
                    MiscType: this.state.miscType ? this.state.miscType : false,
                    CardType: this.state.cardType,
                    Service: this.state.serviceType,
                    Service2: this.state.serviceType2 ? this.state.serviceType2 : '',
                    Service3: this.state.serviceType3 ? this.state.serviceType3 : '',
                    Service4: this.state.serviceType4 ? this.state.serviceType4 : '',
                    Service5: this.state.serviceType5 ? this.state.serviceType5 : '',
                    Service6: this.state.serviceType6 ? this.state.serviceType6 : '',
                    Service7: this.state.serviceType7 ? this.state.serviceType7 : '',
                    Service8: this.state.serviceType8 ? this.state.serviceType8 : '',
                    Service9: this.state.serviceType9 ? this.state.serviceType9 : '',
                    Service10: this.state.serviceType10 ? this.state.serviceType10 : '',
                    Vehicle: this.state.clientsVehicleName,
                    VehicleNo: this.state.clientsVehicleNumber,
                    VehicleType: this.state.vehicleType,
                    date: this.state.dateDisplay,
                    Color: this.state.categoryColor,
                    Category: this.state.categoryType,
                    price1: this.state.price1,
                    price2: this.state.price2,
                    price3: this.state.price3,
                    price4: this.state.price4,
                    price5: this.state.price5,
                    Discount: this.state.discount,
                    totalPrice: this.state.price1 + this.state.price2 + this.state.price3 + this.state.price4 + this.state.price5
                })
            this.props.navigation.goBack();
        }
        else {
            alert('Please fill the details')
        }
    }

    categoryColorsList = () => {
        const listref = firebase.database().ref("CategoryColors/").once("value", dataSnapshot => {
            let val = Object.values(dataSnapshot.val());
            // console.log('colors:', val);
            val.map((item, index) => {
                if (item.Name === this.state.categoryType) {
                    // console.log(item.color)
                    this.setState({
                        categoryColor: item.color
                    })
                }
            })
            // console.log("COLOR::", this.state.categoryColor);
        })
    }

    priceCategoryList1 = () => {
        console.log('state:', this.state.serviceType);
        const listref = firebase.database().ref(`${this.state.categoryType}/`).once("value", dataSnapshot => {
            let val = Object.values(dataSnapshot.val());
            console.log('price:', val);
            val.map((item, index) => {
                if ((item.Service === this.state.serviceType)) {
                    this.setState({
                        price1: item.Price
                    });
                }
            })
            console.log("price::", this.state.price1);
        })
    }
    priceCategoryList2 = () => {
        console.log('state:', this.state.serviceType2);
        const listref = firebase.database().ref(`${this.state.categoryType}/`).once("value", dataSnapshot => {
            let val = Object.values(dataSnapshot.val());
            // console.log('price:', val);
            val.map((item, index) => {
                if ((item.Service === this.state.serviceType2)) {
                    this.setState({
                        price2: item.Price
                    });
                }
            })
            console.log("price::", this.state.price2);
        })
    }
    priceCategoryList3 = () => {
        console.log('state:', this.state.serviceType3);
        const listref = firebase.database().ref(`${this.state.categoryType}/`).once("value", dataSnapshot => {
            let val = Object.values(dataSnapshot.val());
            // console.log('price:', val);
            val.map((item, index) => {
                if ((item.Service === this.state.serviceType3)) {
                    this.setState({
                        price3: item.Price
                    });
                }
            })
            console.log("price::", this.state.price3);
        })
    }
    priceCategoryList4 = () => {
        console.log('state:', this.state.serviceType4);
        const listref = firebase.database().ref(`${this.state.categoryType}/`).once("value", dataSnapshot => {
            let val = Object.values(dataSnapshot.val());
            // console.log('price:', val);
            val.map((item, index) => {
                if ((item.Service === this.state.serviceType4)) {
                    this.setState({
                        price4: item.Price
                    });
                }
            })
            console.log("price::", this.state.price4);
        })
    }
    priceCategoryList5 = () => {
        console.log('state:', this.state.serviceType5);
        const listref = firebase.database().ref(`${this.state.categoryType}/`).once("value", dataSnapshot => {
            let val = Object.values(dataSnapshot.val());
            console.log('price:', val);
            val.map((item, index) => {
                if ((item.Service === this.state.serviceType5)) {
                    this.setState({
                        price5: item.Price
                    });
                }
            })
            console.log("price::", this.state.price5);
        })
    }

    showHide = (num) => {
        this.setState((prevState) => {
            const newDropDownItems = [...prevState.showDropDown]
            newDropDownItems[num] = !newDropDownItems[num]

            const newAddButtonItems = [...prevState.showButton]
            newAddButtonItems[num + 1] = true
            newAddButtonItems[num] = false

            return { showDropDown: newDropDownItems, showButton: newAddButtonItems }
        })
    }
    showHideBike = (num) => {
        this.setState((prevState) => {
            const newDropDownItems = [...prevState.showBikeDropDown]
            newDropDownItems[num] = !newDropDownItems[num]

            const newAddButtonItems = [...prevState.showBikeButton]
            newAddButtonItems[num + 1] = true
            newAddButtonItems[num] = false

            return { showBikeDropDown: newDropDownItems, showBikeButton: newAddButtonItems }
        })
    }

    render() {
        let totalPrice = this.state.price1 + this.state.price2 + this.state.price3 + this.state.price4 + this.state.price5
        let price1 = this.state.price1
        let price2 = this.state.price2
        let price3 = this.state.price3
        let price4 = this.state.price4
        let price5 = this.state.price5
        return (
            <View style={{ backgroundColor: '#fff', flex: 1 }}>
                <Header title='Form' color='#7CEC9F' />
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

                                <Item>
                                    <Icon name='list' size={26} color={color} />
                                    <View style={{ margin: hp('1.5%') }}>
                                        <Text style={{ ...styles.heading, color: '#121212' }}>Gst No.:
                                    <Text style={{ ...styles.content }}> {this.state.gstNo} </Text>
                                        </Text>
                                    </View>
                                </Item>

                                <Item>
                                    <Icon name='person' size={26} color={color} />
                                    <Input placeholder="Customer Name" style={{ ...styles.formfields }} autoCorrect={false} onChangeText={clientsName => this.setState({ clientsName: clientsName })} />
                                </Item>
                                <Item>
                                    <AddressIcon name='address' size={26} color={color} />
                                    <Input placeholder="Customer Address" style={{ ...styles.formfields }} autoCorrect={false} onChangeText={clientsAddress => this.setState({ clientsAddress: clientsAddress })} />
                                </Item>
                                <Item>
                                    <Icon name='mail' size={26} color={color} />
                                    <Input placeholder="Customer Email" style={{ ...styles.formfields }} autoCorrect={false} autoCapitalize={false} keyboardType='email-address' onChangeText={clientsEmail => this.setState({ clientsEmail: clientsEmail })} />
                                </Item>
                                <Item>
                                    <Icon name='ios-phone-portrait' size={26} color={color} />
                                    <Input placeholder="Customer Mob." style={{ ...styles.formfields }} keyboardType='phone-pad' onChangeText={clientsPhone => this.setState({ clientsPhone: clientsPhone })} />
                                </Item>
                                <Item>
                                    <Icon name='list' size={26} color={color} />
                                    <Input placeholder="Customer GST No." style={{ ...styles.formfields }} autoCorrect={false} onChangeText={clientGst => this.setState({ clientGst: clientGst })} />
                                </Item>

                                {/* payment mode */}
                                <View style={{ marginTop: 10, zIndex: 1000, elevation: 1000 }}>
                                    <View>
                                        <View style={{ zIndex: 300, elevation: 300 }}>
                                            <Picker
                                                selectedValue={this.state.paymentMode ? this.state.paymentMode : 'Select the mode of payment'}
                                                style={{ height: Platform.OS == 'ios' ? 100 : 40, marginBottom: 20 }}
                                                onValueChange={item => this.setState({
                                                    paymentMode: item
                                                }, () => {
                                                    this.priceCategoryList1()
                                                })}>
                                                {modeOfPayment.map((item, key) => (
                                                    <Picker.Item label={item.label} value={item.value} key={key} />)
                                                )}
                                            </Picker>
                                        </View>
                                    </View>
                                </View>

                                <View style={{ marginLeft: hp('2.7%'), marginRight: hp('0.2%'), marginTop: Platform.OS == 'ios' ? hp('4%') : hp('-3%') }}>
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

                                {/* Vehicle type: Car or Bike */}
                                <View style={{ marginLeft: hp('2.7%'), marginRight: hp('0.2%'), marginTop: hp('1%') }}>
                                    <Text style={{ ...styles.heading, color: '#2ecc72' }}>Select Vehicle Type</Text>
                                    <View style={[styles.radioButtonView]}>
                                        <RadioGroup
                                            color='#2ecc72'
                                            thickness={2}
                                            style={{ flexDirection: "row" }}
                                            onSelect={(index, value) => this.onSelect(index, value)}
                                            selectedIndex={-1}
                                        >
                                            <RadioButton value={"Car"}><Text style={{ paddingRight: hp('10%') }}>Car</Text></RadioButton>
                                            <RadioButton value={"Bike"}><Text>Bike</Text></RadioButton>
                                        </RadioGroup>
                                    </View>
                                </View>

                                <View style={{ zIndex: 500, elevation: 500 }}>
                                    {this.state.vehicleType == 'Car' ?

                                        <View>
                                            <Text style={{ ...styles.heading, marginHorizontal: hp('2.7%'), color: '#2ecc72' }}>Select Category of Car</Text>
                                            <RadioGroup
                                                color='#2ecc72'
                                                thickness={2}
                                                onSelect={(index, value) => this.onCategorySelect(index, value)}
                                                style={{ marginHorizontal: hp('3%'), }}
                                            >
                                                <RadioButton value={"Hatch Back"}><Text style={{ fontWeight: 'bold' }}>Hatch Back</Text></RadioButton>
                                                <RadioButton value={"Sedan - C-SUV"}><Text style={{ fontWeight: 'bold' }}>Sedan/ C SUV</Text></RadioButton>
                                                <RadioButton value={"SUV-MUV"}><Text style={{ fontWeight: 'bold' }}>SUV/ MUV</Text></RadioButton>
                                                <RadioButton value={"Luxury"}><Text style={{ fontWeight: 'bold' }}>Luxury</Text></RadioButton>
                                            </RadioGroup>

                                            {/* Car type then car services load */}

                                            <View style={{ zIndex: 1000, elevation: 1000 }}>
                                                {this.state.categoryType ?
                                                    <View>
                                                        <View style={{ zIndex: 300, elevation: 300 }}>
                                                            <Picker
                                                                selectedValue={this.state.serviceType ? this.state.serviceType : 'Select Service Type'}
                                                                style={{ height: Platform.OS == 'ios' ? 100 : 40, marginBottom: 20 }}
                                                                onValueChange={item => this.setState({
                                                                    serviceType: item
                                                                }, () => {
                                                                    this.priceCategoryList1()
                                                                })}>
                                                                {carServices.map((item, key) => (
                                                                    <Picker.Item label={item.label} value={item.value} key={key} />)
                                                                )}
                                                            </Picker>
                                                        </View>
                                                        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
                                                            <View style={{ justifyContent: 'center', alignItems: 'center', paddingLeft: hp('5%'), paddingTop: price1 ? hp('1%') : 0 }}>
                                                                <Text style={{ color: '#4BCFFA', fontWeight: 'bold', fontSize: hp('2%') }}>{this.state.price1 ? `₹${this.state.price1} /-` : ''}</Text>
                                                            </View>
                                                            <View style={{ paddingRight: hp('2.7%'), marginTop: hp('2%') }}>
                                                                {this.state.showButton[0] ?
                                                                    <View>
                                                                        {this.state.price1 ?
                                                                            <TouchableOpacity onPress={() => { this.showHide(0) }}>
                                                                                <View style={{ backgroundColor: 'red', padding: hp('2%'), width: hp('25%'), justifyContent: 'center', alignItems: 'center', marginTop: hp('1%'), borderRadius: hp('1%') }}>
                                                                                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Add More Service</Text>
                                                                                </View>
                                                                            </TouchableOpacity>
                                                                            :
                                                                            null
                                                                        }
                                                                    </View>
                                                                    :
                                                                    null
                                                                }
                                                            </View>
                                                        </View>
                                                    </View>
                                                    :
                                                    null
                                                }
                                            </View>

                                            {this.state.showDropDown[0] ?
                                                <View style={{ zIndex: 240 }}>
                                                    <Picker
                                                        selectedValue={this.state.serviceType2 ? this.state.serviceType2 : 'Select Service Type'}
                                                        style={{ height: Platform.OS == 'ios' ? 100 : 40, marginBottom: 20 }}
                                                        onValueChange={item => this.setState({
                                                            serviceType2: item
                                                        }, () => {
                                                            this.priceCategoryList2()
                                                        })}>
                                                        {carServices.map((item, key) => (
                                                            <Picker.Item label={item.label} value={item.value} key={key} />)
                                                        )}
                                                    </Picker>
                                                </View>
                                                :
                                                null
                                            }
                                            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', }}>
                                                <View style={{ justifyContent: 'center', alignItems: 'center', paddingLeft: hp('5%'), paddingTop: price2 ? hp('1%') : 0 }}>
                                                    <Text style={{ color: '#4BCFFA', fontWeight: 'bold', fontSize: hp('2%') }}>{this.state.price2 ? `₹${this.state.price2} /-` : ''}</Text>
                                                </View>
                                                <View style={{ paddingRight: hp('2.7%') }}>
                                                    {this.state.showButton[1] ?
                                                        <View>
                                                            {this.state.price2 ?
                                                                <TouchableOpacity onPress={() => { this.showHide(1) }}>
                                                                    <View style={{ backgroundColor: 'red', padding: hp('2%'), width: hp('25%'), justifyContent: 'center', alignItems: 'center', marginTop: hp('1%'), borderRadius: hp('1%') }}>
                                                                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Add More Service</Text>
                                                                    </View>
                                                                </TouchableOpacity>
                                                                :
                                                                null
                                                            }
                                                        </View>
                                                        :
                                                        null
                                                    }
                                                </View>
                                            </View>

                                            {this.state.showDropDown[1] ?
                                                <View style={{ zIndex: 210 }}>
                                                    <Picker
                                                        selectedValue={this.state.serviceType3 ? this.state.serviceType3 : 'Select Service Type'}
                                                        style={{ height: Platform.OS == 'ios' ? 100 : 40, marginBottom: 20 }}
                                                        onValueChange={item => this.setState({
                                                            serviceType3: item
                                                        }, () => {
                                                            this.priceCategoryList3()
                                                        })}>
                                                        {carServices.map((item, key) => (
                                                            <Picker.Item label={item.label} value={item.value} key={key} />)
                                                        )}
                                                    </Picker>
                                                </View>
                                                :
                                                null
                                            }
                                            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', }}>
                                                <View style={{ justifyContent: 'center', alignItems: 'center', paddingLeft: hp('5%'), paddingTop: price3 ? hp('1%') : 0 }}>
                                                    <Text style={{ color: '#4BCFFA', fontWeight: 'bold', fontSize: hp('2%') }}>{this.state.price3 ? `₹${this.state.price3} /-` : ''}</Text>
                                                </View>
                                                <View style={{ paddingRight: hp('2.7%') }}>
                                                    {this.state.showButton[2] ?
                                                        <View>
                                                            {this.state.price3 ?
                                                                <TouchableOpacity onPress={() => { this.showHide(2) }}>
                                                                    <View style={{ backgroundColor: 'red', padding: hp('2%'), width: hp('25%'), justifyContent: 'center', alignItems: 'center', marginTop: hp('1%'), borderRadius: hp('1%') }}>
                                                                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Add More Service</Text>
                                                                    </View>
                                                                </TouchableOpacity>
                                                                :
                                                                null
                                                            }
                                                        </View>
                                                        :
                                                        null
                                                    }
                                                </View>
                                            </View>

                                            {this.state.showDropDown[2] ?
                                                <View style={{ zIndex: 180 }}>
                                                    <Picker
                                                        selectedValue={this.state.serviceType4 ? this.state.serviceType4 : 'Select Service Type'}
                                                        style={{ height: Platform.OS == 'ios' ? 100 : 40, marginBottom: 20 }}
                                                        onValueChange={item => this.setState({
                                                            serviceType4: item
                                                        }, () => {
                                                            this.priceCategoryList4()
                                                        })}>
                                                        {carServices.map((item, key) => (
                                                            <Picker.Item label={item.label} value={item.value} key={key} />)
                                                        )}
                                                    </Picker>
                                                </View>
                                                :
                                                null
                                            }
                                            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', }}>
                                                <View style={{ justifyContent: 'center', alignItems: 'center', paddingLeft: hp('5%'), paddingTop: price4 ? hp('1%') : 0 }}>
                                                    <Text style={{ color: '#4BCFFA', fontWeight: 'bold', fontSize: hp('2%') }}>{this.state.price4 ? `₹${this.state.price4} /-` : ''}</Text>
                                                </View>
                                                <View style={{ paddingRight: hp('2.7%') }}>
                                                    {this.state.showButton[3] ?
                                                        <View>
                                                            {this.state.price4 ?
                                                                <TouchableOpacity onPress={() => { this.showHide(3) }}>
                                                                    <View style={{ backgroundColor: 'red', padding: hp('2%'), width: hp('25%'), justifyContent: 'center', alignItems: 'center', marginTop: hp('1%'), borderRadius: hp('1%') }}>
                                                                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Add More Service</Text>
                                                                    </View>
                                                                </TouchableOpacity>
                                                                :
                                                                null
                                                            }
                                                        </View>
                                                        :
                                                        null
                                                    }
                                                </View>
                                            </View>

                                            {this.state.showDropDown[3] ?
                                                <View style={{ zIndex: 150 }}>
                                                    <Picker
                                                        selectedValue={this.state.serviceType5 ? this.state.serviceType5 : 'Select Service Type'}
                                                        style={{ height: Platform.OS == 'ios' ? 100 : 40, marginBottom: 20 }}
                                                        onValueChange={item => this.setState({
                                                            serviceType5: item
                                                        }, () => {
                                                            this.priceCategoryList5()
                                                        })}>
                                                        {carServices.map((item, key) => (
                                                            <Picker.Item label={item.label} value={item.value} key={key} />)
                                                        )}
                                                    </Picker>
                                                </View>
                                                :
                                                null
                                            }
                                            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', }}>
                                                <View style={{ justifyContent: 'center', alignItems: 'center', paddingLeft: hp('5%'), paddingTop: price5 ? hp('1%') : 0 }}>
                                                    <Text style={{ color: '#4BCFFA', fontWeight: 'bold', fontSize: hp('2%') }}>{this.state.price5 ? `₹${this.state.price5} /-` : ''}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        :
                                        null
                                    }
                                </View>

                                <View style={{ zIndex: 500, marginBottom: hp('1%') }}>
                                    {this.state.vehicleType == 'Bike' ?
                                        <View>
                                            <Text style={{ ...styles.heading, marginHorizontal: hp('2.7%'), color: '#2ecc72' }}>Select Category of Bike</Text>
                                            <RadioGroup
                                                color='#2ecc72'
                                                thickness={2}
                                                onSelect={(index, value) => this.onCategorySelect(index, value)}
                                                style={{ marginHorizontal: hp('3%') }}
                                            >
                                                <RadioButton value={"Regular"}><Text style={{ fontWeight: 'bold' }}>Regular</Text></RadioButton>
                                                <RadioButton value={"Splender"}><Text style={{ fontWeight: 'bold' }}>Spl</Text></RadioButton>
                                                <RadioButton value={"Super Bike"}><Text style={{ fontWeight: 'bold' }}>Super Bike</Text></RadioButton>
                                            </RadioGroup>

                                            {/* Bike type then Bike services load */}
                                            <View style={{ zIndex: 1000 }}>
                                                {this.state.categoryType ?
                                                    <View>
                                                        <View style={{ zIndex: 270 }}>
                                                            <Picker
                                                                selectedValue={this.state.serviceType ? this.state.serviceType : 'Select Service Type'}
                                                                style={{ height: Platform.OS == 'ios' ? 100 : 40, marginBottom: 20 }}
                                                                onValueChange={item => this.setState({
                                                                    serviceType: item
                                                                }, () => {
                                                                    this.priceCategoryList1()
                                                                })}>
                                                                {bikeServices.map((item, key) => (
                                                                    <Picker.Item label={item.label} value={item.value} key={key} />)
                                                                )}
                                                            </Picker>
                                                        </View>
                                                        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', }}>
                                                            <View style={{ justifyContent: 'center', alignItems: 'center', paddingLeft: hp('5%'), paddingTop: price1 ? hp('1%') : 0 }}>
                                                                <Text style={{ color: '#4BCFFA', fontWeight: 'bold', fontSize: hp('2%') }}>{this.state.price1 ? `₹${this.state.price1} /-` : ''}</Text>
                                                            </View>
                                                            <View style={{ paddingRight: hp('2.7%') }}>
                                                                {this.state.showBikeButton[0] ?
                                                                    <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', paddingRight: hp('2.7%') }}>
                                                                        {this.state.price1 ?
                                                                            <TouchableOpacity onPress={() => { this.showHideBike(0) }}>
                                                                                <View style={{ backgroundColor: 'red', padding: hp('2%'), width: hp('20%'), justifyContent: 'center', alignItems: 'center', marginTop: hp('1%'), borderRadius: hp('1%') }}>
                                                                                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Add More Service</Text>
                                                                                </View>
                                                                            </TouchableOpacity>
                                                                            :
                                                                            null
                                                                        }
                                                                    </View>
                                                                    :
                                                                    null
                                                                }
                                                            </View>
                                                        </View>
                                                    </View>
                                                    :
                                                    null
                                                }
                                            </View>

                                            {this.state.showBikeDropDown[0] ?
                                                <View style={{ zIndex: 240 }}>
                                                    <Picker
                                                        selectedValue={this.state.serviceType2 ? this.state.serviceType2 : 'Select Service Type'}
                                                        style={{ height: Platform.OS == 'ios' ? 100 : 40, marginBottom: 20 }}
                                                        onValueChange={item => this.setState({
                                                            serviceType2: item
                                                        }, () => {
                                                            this.priceCategoryList2()
                                                        })}>
                                                        {bikeServices.map((item, key) => (
                                                            <Picker.Item label={item.label} value={item.value} key={key} />)
                                                        )}
                                                    </Picker>
                                                </View>
                                                :
                                                null
                                            }
                                            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', }}>
                                                <View style={{ justifyContent: 'center', alignItems: 'center', paddingLeft: hp('5%'), paddingTop: price2 ? hp('1%') : 0 }}>
                                                    <Text style={{ color: '#4BCFFA', fontWeight: 'bold', fontSize: hp('2%') }}>{this.state.price2 ? `₹${this.state.price2} /-` : ''}</Text>
                                                </View>
                                                <View style={{ paddingRight: hp('2.7%') }}>
                                                    {this.state.showBikeButton[1] ?
                                                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', paddingRight: hp('2.7%') }}>
                                                            {this.state.price2 ?
                                                                <TouchableOpacity onPress={() => { this.showHideBike(1) }}>
                                                                    <View style={{ backgroundColor: 'red', padding: hp('2%'), width: hp('20%'), justifyContent: 'center', alignItems: 'center', marginTop: hp('1%'), borderRadius: hp('1%') }}>
                                                                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Add More Service</Text>
                                                                    </View>
                                                                </TouchableOpacity>
                                                                :
                                                                null
                                                            }
                                                        </View>
                                                        :
                                                        null
                                                    }
                                                </View>
                                            </View>

                                            {this.state.showBikeDropDown[1] ?
                                                <View style={{ zIndex: 210 }}>
                                                    <Picker
                                                        selectedValue={this.state.serviceType3 ? this.state.serviceType3 : 'Select Service Type'}
                                                        style={{ height: Platform.OS == 'ios' ? 100 : 40, marginBottom: 20 }}
                                                        onValueChange={item => this.setState({
                                                            serviceType3: item
                                                        }, () => {
                                                            this.priceCategoryList3()
                                                        })}>
                                                        {bikeServices.map((item, key) => (
                                                            <Picker.Item label={item.label} value={item.value} key={key} />)
                                                        )}
                                                    </Picker>
                                                </View>
                                                :
                                                null
                                            }
                                            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', }}>
                                                <View style={{ justifyContent: 'center', alignItems: 'center', paddingLeft: hp('5%'), paddingTop: price3 ? hp('1%') : 0 }}>
                                                    <Text style={{ color: '#4BCFFA', fontWeight: 'bold', fontSize: hp('2%') }}>{this.state.price3 ? `₹${this.state.price3} /-` : ''}</Text>
                                                </View>
                                                <View style={{ paddingRight: hp('2.7%') }}>
                                                    {this.state.showBikeButton[2] ?
                                                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', paddingRight: hp('2.7%') }}>
                                                            {this.state.price3 ?
                                                                <TouchableOpacity onPress={() => { this.showHideBike(2) }}>
                                                                    <View style={{ backgroundColor: 'red', padding: hp('2%'), width: hp('20%'), justifyContent: 'center', alignItems: 'center', marginTop: hp('1%'), borderRadius: hp('1%') }}>
                                                                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Add More Service</Text>
                                                                    </View>
                                                                </TouchableOpacity>
                                                                :
                                                                null
                                                            }
                                                        </View>
                                                        :
                                                        null
                                                    }
                                                </View>
                                            </View>

                                            {this.state.showBikeDropDown[2] ?
                                                <View style={{ zIndex: 180 }}>
                                                    <Picker
                                                        selectedValue={this.state.serviceType4 ? this.state.serviceType4 : 'Select Service Type'}
                                                        style={{ height: Platform.OS == 'ios' ? 100 : 40, marginBottom: 20 }}
                                                        onValueChange={item => this.setState({
                                                            serviceType4: item
                                                        }, () => {
                                                            this.priceCategoryList4()
                                                        })}>
                                                        {bikeServices.map((item, key) => (
                                                            <Picker.Item label={item.label} value={item.value} key={key} />)
                                                        )}
                                                    </Picker>
                                                </View>
                                                :
                                                null
                                            }
                                            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', }}>
                                                <View style={{ justifyContent: 'center', alignItems: 'center', paddingLeft: hp('5%'), paddingTop: price4 ? hp('1%') : 0 }}>
                                                    <Text style={{ color: '#4BCFFA', fontWeight: 'bold', fontSize: hp('2%') }}>{this.state.price4 ? `₹${this.state.price4} /-` : ''}</Text>
                                                </View>
                                                <View style={{ paddingRight: hp('2.7%') }}>
                                                    {this.state.showBikeButton[3] ?
                                                        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', paddingRight: hp('2.7%') }}>
                                                            {this.state.price4 ?
                                                                <TouchableOpacity onPress={() => { this.showHideBike(3) }}>
                                                                    <View style={{ backgroundColor: 'red', padding: hp('2%'), width: hp('20%'), justifyContent: 'center', alignItems: 'center', marginTop: hp('1%'), borderRadius: hp('1%') }}>
                                                                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Add More Service</Text>
                                                                    </View>
                                                                </TouchableOpacity>
                                                                :
                                                                null
                                                            }
                                                        </View>
                                                        :
                                                        null
                                                    }
                                                </View>
                                            </View>

                                            {this.state.showBikeDropDown[3] ?
                                                <View style={{ zIndex: 150 }}>
                                                    <Picker
                                                        selectedValue={this.state.serviceType5 ? this.state.serviceType5 : 'Select Service Type'}
                                                        style={{ height: Platform.OS == 'ios' ? 100 : 40, marginBottom: 20 }}
                                                        onValueChange={item => this.setState({
                                                            serviceType5: item
                                                        }, () => {
                                                            this.priceCategoryList5()
                                                        })}>
                                                        {bikeServices.map((item, key) => (
                                                            <Picker.Item label={item.label} value={item.value} key={key} />)
                                                        )}
                                                    </Picker>
                                                </View>
                                                :
                                                null
                                            }
                                            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', }}>
                                                <View style={{ justifyContent: 'center', alignItems: 'center', paddingLeft: hp('5%'), paddingTop: price5 ? hp('1%') : 0 }}>
                                                    <Text style={{ color: '#4BCFFA', fontWeight: 'bold', fontSize: hp('2%') }}>{this.state.price5 ? `₹${this.state.price5} /-` : ''}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        :
                                        null
                                    }
                                </View>

                                <View>
                                    {this.state.vehicleType == 'Car' ?
                                        <Item>
                                            <Icon name='car-sport' size={26} color={color} />
                                            <Input placeholder="Vehicle Make & Model" style={{ ...styles.formfields }} onChangeText={clientsVehicleName => this.setState({ clientsVehicleName: clientsVehicleName })} />
                                        </Item>
                                        :
                                        null
                                    }
                                    {this.state.vehicleType == 'Bike' ?
                                        <Item>
                                            <BikeIcon name='motorbike' size={26} color={color} />
                                            <Input placeholder="Vehicle Make & Model" style={{ ...styles.formfields }} onChangeText={clientsVehicleName => this.setState({ clientsVehicleName: clientsVehicleName })} />
                                        </Item>
                                        :
                                        null
                                    }
                                </View>

                                <Item>
                                    <Icon name='ios-logo-closed-captioning' size={26} color={color} />
                                    <Input placeholder="Vehicle Regn. No." style={{ ...styles.formfields }} onChangeText={clientsVehicleNumber => this.setState({ clientsVehicleNumber: clientsVehicleNumber })} />
                                </Item>

                                <Item>
                                    <Icons name='inr' size={26} color={color} />
                                    <Input placeholder="Discount" style={{ ...styles.formfields }} autoCorrect={false} onChangeText={clientsAddress => this.setState({ discount: discount })} />
                                </Item>

                                <Item>
                                    <Icons name='inr' size={26} color={color} />
                                    <View style={{ margin: hp('1.5%') }}>
                                        {this.state.serviceType ?
                                            <Text style={{ ...styles.content }}>{totalPrice}</Text>
                                            :
                                            <Text style={{ ...styles.heading, color: '#121212' }}>Total Price: </Text>
                                        }
                                    </View>
                                </Item>
                            </Form>
                        </View>
                    </ScrollView >
                </KeyboardAwareScrollView>

                <View style={{ marginBottom: hp('2%') }}></View>
                {/* Upload Button ~ Uploads & takes back to dash board */}
                <TouchableOpacity style={[styles.uploadButton]} onPress={() => this.uploadData()}>
                    <Text style={{ color: '#fff', fontSize: Platform.OS === 'ios' ? 22 : 18, fontWeight: '600' }}>Upload Data</Text>
                    <Text style={{ color: '#DAE0E2', fontSize: 10, fontStyle: 'italic' }}>BlaceNova Inc.<Text style={{ color: '#DAE0E2', fontSize: 10, lineHeight: Platform.OS === 'ios' ? 50 : 10, fontStyle: 'italic' }}>TM</Text></Text>
                </TouchableOpacity >
            </View >
        )
    }
}
export default FormScreen;

const styles = StyleSheet.create({
    content: {
        fontSize: Platform.OS === 'ios' ? hp('2%') : hp('2.5%'),
        marginLeft: hp('0.5%'),
        marginRight: hp('0.2%'),
        color: '#2ecc72',
        fontSize: 18,
        fontWeight: 'bold'
    },
    formfields: {
        fontSize: Platform.OS === 'ios' ? hp('2%') : hp('2.5%'),
        marginLeft: hp('0.5%'),
        marginRight: hp('0.2%'),
        color: '#2ecc72',
        fontSize: 18,
    },
    radioButtonView: {
        justifyContent: 'center',
        height: hp("7%")
    },
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
    dropdown: {
        height: hp('6%'),
        marginHorizontal: hp('2.7%')
    }
})


const carServices = [
    {
        id: 0,
        label: 'Select Service',
        value: 'Select Service'
    },
    {
        id: 1,
        label: 'Basic Wash Package',
        value: 'Basic Wash Package'
    },
    {
        id: 2,
        label: 'Regular Wash Package',
        value: 'Regular Wash Package'
    },
    {
        id: 3,
        label: 'Super Wash Package',
        value: 'Super Wash Package'
    },
    {
        id: 4,
        label: 'Premium Wash with Rexine/ Leather Seat',
        value: 'Premium Wash with Rexine/ Leather Seat'
    },
    {
        id: 5,
        label: 'Premium Wash with Fabric Seat',
        value: 'Premium Wash with Fabric Seat'
    },
    {
        id: 6,
        label: 'Foam Wash',
        value: 'Foam Wash'
    },
    {
        id: 7,
        label: 'Roof Cleaning',
        value: 'Roof Cleaning'
    },
    {
        id: 8,
        label: 'Seat Cleaning (Rexine/ Leather)',
        value: 'Seat Cleaning (Rexine/ Leather)'
    },
    {
        id: 9,
        label: 'Seat Cleaning (Fabric)',
        value: 'Seat Cleaning (Fabric)'
    },
    {
        id: 10,
        label: 'Seat Leather/ Fabric Conditioning',
        value: 'Seat Leather/ Fabric Conditioning'
    },
    {
        id: 11,
        label: 'Interior Roof & Upholstery Cleaning',
        value: 'Interior Roof & Upholstery Cleaning'
    },
    {
        id: 12,
        label: 'Teflon Polish',
        value: 'Teflon Polish'
    },
    {
        id: 13,
        label: 'Nano Paint Guard Coating',
        value: 'Nano Paint Guard Coating'
    },
    {
        id: 14,
        label: 'Instant Shine',
        value: 'Instant Shine'
    },
    {
        id: 15,
        label: 'Under Body Antirust Protection',
        value: 'Under Body Antirust Protection'
    },
    {
        id: 16,
        label: 'Silencer Heat Resistant Coating',
        value: 'Silencer Heat Resistant Coating'
    },
    {
        id: 17,
        label: 'Air Conditioning Dis-Infection',
        value: 'Air Conditioning Dis-Infection'
    },
    {
        id: 18,
        label: 'Alloy/ Wheel Degreasing & Cleaning',
        value: 'Alloy/ Wheel Degreasing & Cleaning'
    },
    {
        id: 19,
        label: 'Nitrogen Air Inflation in 4 Tyres',
        value: 'Nitrogen Air Inflation in 4 Tyres'
    },
    {
        id: 20,
        label: 'Engine Washing, Degreasing & Dressing',
        value: 'Engine Washing, Degreasing & Dressing'
    },
    {
        id: 21,
        label: 'Wind Shield/ Glass Treatment',
        value: 'Wind Shield/ Glass Treatment'
    },
    {
        id: 22,
        label: 'All Glass Water Spot/ Stain Removal',
        value: 'All Glass Water Spot/ Stain Removal'
    },
    {
        id: 23,
        label: 'Microfibre Cloth',
        value: 'Microfibre Cloth'
    },
    {
        id: 24,
        label: 'Windshield/ Glass Cleaner',
        value: 'Windshield/ Glass Cleaner'
    },
    {
        id: 25,
        label: 'Aromatree Air Freshner',
        value: 'Aromatree Air Freshner'
    },

]

const bikeServices = [
    {
        id: 0,
        label: 'Select Service',
        value: 'Select Service'
    },
    {
        id: 1,
        label: 'Foam Wash',
        value: 'Foam Wash'
    },
    {
        id: 2,
        label: 'Seat Leather/ Fabric Conditioning',
        value: 'Seat Leather/ Fabric Conditioning'
    },
    {
        id: 3,
        label: 'Teflon Polish',
        value: 'Teflon Polish'
    },
    {
        id: 4,
        label: 'Nano Paint Guard Coating',
        value: 'Nano Paint Guard Coating'
    },
    {
        id: 5,
        label: 'Instant Shine',
        value: 'Instant Shine'
    },
    {
        id: 6,
        label: 'Under Body Antirust Protection',
        value: 'Under Body Antirust Protection'
    },
    {
        id: 7,
        label: 'Silencer Heat Resistant Coating',
        value: 'Silencer Heat Resistant Coating'
    },
    {
        id: 8,
        label: 'Alloy/ Wheel Degreasing & Cleaning',
        value: 'Alloy/ Wheel Degreasing & Cleaning'
    },
    {
        id: 9,
        label: 'Nitrogen Air Inflation in 4 Tyres',
        value: 'Nitrogen Air Inflation in 4 Tyres'
    },
    {
        id: 10,
        label: 'Engine Washing, Degreasing & Dressing',
        value: 'Engine Washing, Degreasing & Dressing'
    },
    {
        id: 11,
        label: 'Microfibre Cloth',
        value: 'Microfibre Cloth'
    },
    {
        id: 12,
        label: 'Windshield/ Glass Cleaner',
        value: 'Windshield/ Glass Cleaner'
    },
    {
        id: 13,
        label: 'Aromatree Air Freshner',
        value: 'Aromatree Air Freshner'
    },
]

const modeOfPayment = [
    {
        id: 1,
        label: 'Payment mode',
        value: 'Payment mode'
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
