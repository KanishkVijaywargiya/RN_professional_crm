import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View,
    PermissionsAndroid,
    ScrollView,
    TextInput,
    Dimensions,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
} from 'react-native';

import Header from '../Components/Header.js';
import Notifications from '../Components/Notifications.js';
import RippleEffect2 from '../Components/RippleEffect2.js';

import * as firebase from 'firebase';
import 'firebase/auth';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import ActionButton from 'react-native-action-button';

import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import { connect } from 'react-redux';

import { Transition, Transitioning, color } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

function mapStateToProps(state) {
    return { action: state.action, name: state.name };
}

function mapDispatchToProps(dispatch) {
    return {
        updateUid: (uid) => dispatch({ type: 'UPDATE_UID', uid }),
        updateName: (name) => dispatch({ type: 'UPDATE_NAME', name }),
        updateEmail: (email) => dispatch({ type: 'UPDATE_EMAIL', email }),

        openMenu: () =>
            dispatch({
                type: 'OPEN_MENU',
            }),
        openLogin: () =>
            dispatch({
                type: 'OPEN_LOGIN',
            }),
        openNotif: () =>
            dispatch({
                type: 'OPEN_NOTIF',
            }),
    };
}

const transition = (
    <Transition.Together>
        <Transition.In type="fade" durationMs={200} />
        <Transition.Change />
        <Transition.Out type="fade" durationMs={200} />
    </Transition.Together>
);

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientDatalist: [],
            currentIndex: null,
            loaderForData: true,
            rippleEffect: true,
            isPermitted: false,
        };
        this.arrayholder = [];
        ref = React.createRef();
    }

    componentDidMount() {
        this.clientlist();
        if (Platform.OS === 'android') {
            this.getAndroidPermissions()
        } else {
            this.setState({
                isPermitted: true
            })
        }
    }

    clientlist = async () => {
        var listref = await firebase
            .database()
            .ref('RegisterClient/')
            .on('value', (dataSnapshot) => {
                let val = dataSnapshot.val();
                console.log('VALUE::', val);

                if (val !== null) {
                    let clientsList = Object.values(val);
                    let data = clientsList.sort((a, b) => a.date < b.date ? 1 : -1)
                    this.setState({
                        clientDatalist: data,
                        loaderForData: false,
                        rippleEffect: false,
                    });
                    this.arrayholder = data;
                } else {
                    this.setState({
                        clientDatalist: [],
                        loaderForData: false,
                        rippleEffect: false,
                    });
                }
                console.log('ClientDataList::', this.state.clientDatalist);
            });
        setTimeout(() => {
            this.setState({
                loaderForData: false,
                rippleEffect: false,
            });
        }, 5000);
    };

    searchFilterFunction = (searchText) => {
        const newData = this.arrayholder.filter((item) => {
            const itemData =
                `${item.mobile} 
                ${item.email.toUpperCase()} 
                ${item.Name.toUpperCase()}`;
            const textData = searchText.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            clientDatalist: newData,
        });
    };

    getAndroidPermissions() {
        let that = this;

        async function requestExternalWritePermission() {
            try {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    //If WRITE_EXTERNAL_STORAGE Permission is granted
                    //changing the state to show Create PDF option
                    that.setState({ isPermitted: true });
                } else {
                    alert('WRITE_EXTERNAL_STORAGE permission denied');
                }
            } catch (err) {
                alert('Write permission err', err);
                console.warn(err);
            }
        }
        //Calling the External Write permission function
        requestExternalWritePermission();
    }

    printHTML = async (item) => {

        let Service = item.Service ? item.Service : ''
        let Service2 = item.Service2 ? item.Service2 : ''
        let Service3 = item.Service3 ? item.Service3 : ''
        let Service4 = item.Service4 ? item.Service4 : ''
        let Service5 = item.Service5 ? item.Service5 : ''

        let price1 = item.price1 ? item.price1 : ''
        let price2 = item.price2 ? item.price2 : ''
        let price3 = item.price3 ? item.price3 : ''
        let price4 = item.price4 ? item.price4 : ''
        let price5 = item.price5 ? item.price5 : ''

        let InvoiceNo = item.InvoiceNo ? item.InvoiceNo : ''
        let MemberId = item.MemberId ? item.MemberId : ''

        let htmlContent =
            '<div style="background-color: #fff; padding-left: 30px;padding-right: 30px;padding-top:5px; padding-bottom: 5px;">' +
            '<div style="display: flex; flex-direction: row;">' +
            '<div style=" width: 380px;">' +
            '<img src="https://p73.f4.n0.cdn.getcloudapp.com/items/JrugXoWj/invoice.png?v=cafdfd3480726a4edc168a8e37c593c1" alt="invoice" srcset="">' +
            '<h1 style="font-size: 16px; font-weight: bolder; color: #121212;">Name: <span style="font-weight: 400;">' + item.Name + '</span></h1>' +
            '<h1 style="font-size: 16px; font-weight: bolder; color: #121212;">Address: <span style="font-weight: 400;">' + item.Address + '</span> </h1>' +
            '<h1 style="font-size: 16px; font-weight: bolder; color: #121212;">Mobile: <span style="font-weight: 400;">' + item.Phone + '</span></h1>' +
            '<h1 style="font-size: 16px; font-weight: bolder; color: #121212;">Email: <span style="font-weight: 400;">' + item.Email + '</span></h1>' +
            ' <h1 style="font-size: 16px; font-weight: bolder; color: #121212;">Cust. GST No.: <span style="font-weight: 400;">' + item.ClientGst + '</span></h1>' +
            '</div>' +
            ' <div style="width: 380px;">' +
            ' <p style="color: #E76732; font-size: 40px; font-weight: 100;">SERVICE BILL</p>' +
            '<h1 style="font-size: 16px; font-weight: bolder; color: #121212;">Date: <span style="font-weight: 400;">' + item.date + '</span></h1>' +
            '<h1 style="font-size: 16px; font-weight: bolder; color: #121212;">G.S.T. No.: <span style="font-weight: 400;">' + item.GstNo + '</span></h1>' +
            ' <h1 style="font-size: 16px; font-weight: bolder; color: #121212;">Invoice No.: <span style="font-weight: 400;">' + InvoiceNo + '</span></h1>' +
            '  <h1 style="font-size: 16px; font-weight: bolder; color: #121212;">Member ID: <span style="font-weight: 400;">' + MemberId + '</span></h1>' +
            '  <h1 style="font-size: 16px; font-weight: bolder; color: #121212;">Segment: <span style="font-weight: 400;">' + item.Category + '</span></h1>' +
            '  <h1 style="font-size: 16px; font-weight: bolder; color: #121212;">Vehicle reg. No.: <span style="font-weight: 400;">' + item.VehicleNo + '</span></h1>' +
            ' </div>' +
            ' </div>' +
            '<table style="width: 100%; border-collapse: collapse;">' +
            ' <tr>' +
            ' <td style="border-bottom: 2px solid #121212;  width: 10%; padding: 10px;">Sl No.</td>' +
            ' <td style="border-bottom: 2px solid #121212;  width: 70%; padding: 10px; ">Service Package</td>' +
            ' <td style="border-bottom: 2px solid #121212; width: 20%; padding: 10px;">Amt. (Rs.)</td>' +
            ' </tr>' +
            ' <tr>' +
            '   <td style="width: 10%; padding: 10px;">1</td>' +
            '   <td style=" width: 70%; padding: 10px; ">' + Service + '</td>' +
            '   <td style="width: 20%; padding: 10px; background-color: #F2F4FF;">' + price1 + '</td>' +
            ' </tr>' +
            ' <tr>' +
            '<td style="width: 10%; padding: 10px;">2</td>' +
            '<td style=" width: 70%; padding: 10px; ">' + Service2 + '</td>' +
            '<td style="width: 20%; padding: 10px; background-color: #F2F4FF;">' + price2 + '</td>' +
            ' </tr>' +
            '<tr>' +
            ' <td style="width: 10%; padding: 10px;">3</td>' +
            '<td style=" width: 70%; padding: 10px; ">' + Service3 + '</td>' +
            '<td style="width: 20%; padding: 10px; background-color: #F2F4FF;">' + price3 + '</td>' +
            ' </tr>' +
            '<tr>' +
            '<td style="width: 10%; padding: 10px;">4</td>' +
            '<td style=" width: 70%; padding: 10px; ">' + Service4 + '</td>' +
            '<td style="width: 20%; padding: 10px; background-color: #F2F4FF;">' + price4 + '</td>' +
            ' </tr>' +
            '<tr>' +
            '<td style="width: 10%; padding: 10px;">5</td>' +
            '<td style=" width: 70%; padding: 10px; ">' + Service5 + '</td>' +
            ' <td style="width: 20%; padding: 10px; background-color: #F2F4FF;">' + price5 + '</td>' +
            ' </tr>' +
            ' <tr>' +
            '</table>' +

            '<div style="display: flex; justify-content: center;align-items: center; flex-direction: row; height: 31px;">' +
            '<div style="flex: 0.726; "></div>' +
            '<div style="display: flex; flex: 0.274; flex-direction: row; align-items: center;justify-content: center; height: 31px;">' +
            '<div style="display: flex; flex: 0.370; justify-content: flex-start;">' +
            '<h1 style=" font-size: 14px; font-weight: bolder; color: #121212;">Subtotal </h1>' +
            '</div>' +
            '<div style="display:flex; flex:1; border-top: 3px solid #121212; background-color: azure; justify-content: flex-end; ">' +
            '<h1 style="font-size: 14px; font-weight: bolder; color: #121212;">₹ 10000.00 </h1>' +
            '</div>' +
            '</div>' +
            '</div>' +

            '<div style="display: flex; flex-direction: row; align-items: center;justify-content: center; height: 31px;">' +
            '<div style="flex: 0.50; "></div>' +
            '<div style="display: flex; flex: 0.50; flex-direction: row; align-items: center;justify-content: center; height: 31px;">' +
            '<div style="display: flex; justify-content: flex-start; flex:1;">' +
            '<h1 style="font-size: 14px; font-weight: bolder; color: #121212;">Less: Discount @10.00% </h1>' +
            '</div>' +
            '<div style="display:flex; flex:0.67; background-color: #F2F4FF; justify-content: flex-end; ">' +
            '<h1 style="font-size: 14px; font-weight: bolder; color: #121212;">₹ 0.00 </h1>' +
            '</div>' +
            '</div>' +
            '</div>' +

            '<div style="display: flex; flex-direction: row; align-items: center;justify-content: center; height: 31px;">' +
            '<div style="flex: 0.726; "></div>' +
            '<div style="display: flex; flex: 0.274; flex-direction: row; align-items: center;justify-content: center; height: 31px;">' +
            '<div style="display: flex; flex: 0.370; justify-content: flex-start;">' +
            '<h1 style="font-size: 14px; font-weight: bolder; color: #121212;">Gross </h1>' +
            '</div>' +
            '<div style="display:flex; flex:1; border-top: 3px solid #121212; background-color: azure; justify-content: flex-end; ">' +
            '<h1 style="font-size: 14px; font-weight: bolder; color: #121212;">₹ 0.00 </h1>' +
            '</div>' +
            '</div>' +
            '</div>' +

            '<div style="display: flex; flex-direction: row; align-items: center;justify-content: center; height: 31px;">' +
            '<div style="flex: 0.50; "></div>' +
            '<div style="display: flex; flex: 0.50; flex-direction: row; align-items: center;justify-content: center; height: 31px;">' +
            '<div style="display: flex; justify-content: flex-start; flex: 1.5;">' +
            '<h1 style="font-size: 14px; font-weight: bolder; color: #121212;">Add: Service Tax @0.00% </h1>' +
            '</div>' +
            '<div style="display:flex; flex:1; background-color: #F2F4FF; justify-content: flex-end; ">' +
            '<h1 style="font-size: 14px; font-weight: bolder; color: #121212;">₹ 0.00 </h1>' +
            '</div>' +
            '</div>' +
            '</div>' +

            '<div style="display: flex; flex-direction: row; align-items: center;justify-content: center; height: 31px;">' +
            '<div style="flex: 0.50; "></div>' +
            '<div style="display: flex; flex: 0.50; flex-direction: row; align-items: center;justify-content: center; height: 31px;">' +
            '<div style="display: flex; flex: 1.5; justify-content: flex-start;">' +
            '<h1 style="font-size: 14px; font-weight: bolder; color: #121212;">Net Amt. Payable </h1>' +
            '</div>' +
            '<div style="display:flex; flex:1; background-color: #F2F4FF; justify-content: flex-end; ">' +
            '<h1 style="font-size: 14px; font-weight: bolder; color: #121212;">₹ ' + totalPrice + ' </h1>' +
            '</div>' +
            '</div>' +
            '</div>' +

            '<br>' +
            '<br>' +

            '<div style="width:100%; justify-content: center; align-items: center;">' +
            '<h1 style="font-family: Arial, Helvetica, sans-serif; text-align: center; font-size: 15px; color: #121212; letter-spacing: 1px; font-weight: 100;">Thank you for your business!</h1>' +
            '</div>' +
            '<div style="width:100%; justify-content: center; align-items: center;">' +
            '<h1 style="line-height:5px; font-family: Arial, Helvetica, sans-serif; text-align: center; font-size: 10px; color: #959697;">120A, Maniktalla Main Road, Loha patti,Near Kakurgachi P.O, Kolkata - 700 054 </h1>' +
            '<h1 style="line-height:5px; font-family: Arial, Helvetica, sans-serif; text-align: center; font-size: 10px; color: #959697;">Tel : 033-6565 0505/0606 | E-Mail :cleannshine.kol@gmail.com </h1>' +
            ' </div>' +
            '</div>';

        await RNPrint.print({ html: htmlContent })
    }

    listEmptyView = () => {
        if (this.state.rippleEffect) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <RippleEffect2 />
                </View>
            );
        }
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image
                    style={{
                        width: Platform.OS === 'ios' ? hp('45%') : hp('45%'),
                        height: hp('35%'),
                    }}
                    source={require('../Assets/netImg/netImg.png')}
                />
                <Text
                    style={{
                        color: '#723F9D',
                        fontSize: 30,
                        fontWeight: 'bold',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    Aww...Don't Be Panic
                </Text>
                <Text
                    style={{
                        color: '#C66070',
                        fontSize: Platform.OS === 'ios' ? 18 : 14,
                        fontWeight: 'bold',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                    }}>
                    Data is not availaible Right now {'\n'}
                </Text>
            </View>
        );
    };

    closeKeyboard = () => {
        Keyboard.dismiss();
    };

    customerSegmentType = (customerSegmentType) => {
        switch (customerSegmentType) {
            case 'Value Card ₹2000':
                return (
                    <View style={{ backgroundColor: '#fb6f6f', width: hp('0.5%'), height: Platform.OS == 'ios' ? hp('13%') : hp('18%'), borderRadius: 10 }} />
                )
            case 'Value Card ₹5000':
                return (
                    <View style={{ backgroundColor: 'blue', width: hp('0.5%'), height: Platform.OS == 'ios' ? hp('13%') : hp('18%'), borderRadius: 10 }} />
                )
            case 'Value Card ₹10000':
                return (
                    <View style={{ backgroundColor: 'green', width: hp('0.5%'), height: Platform.OS == 'ios' ? hp('13%') : hp('18%'), borderRadius: 10 }} />
                )
            case 'Previledge Card ₹650':
                return (
                    <View style={{ backgroundColor: 'red', width: hp('0.5%'), height: Platform.OS == 'ios' ? hp('13%') : hp('18%'), borderRadius: 10 }} />
                )

            default:
                break;
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => this.closeKeyboard()}>
                <View style={{ backgroundColor: '#fff', flex: 1 }}>

                    <Notifications />

                    <Header title="Card Segment Clients" color="#EA425C" />
                    <View style={{ position: 'absolute', top: Platform.OS === 'ios' ? hp('5%') : hp('2%'), left: Platform.OS === 'ios' ? hp('2%') : hp('2%') }}>
                        <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' }} onPress={() => this.props.navigation.goBack()}>
                            <Icon
                                name={'ios-arrow-back'}
                                color={'white'}
                                size={Platform.OS === 'ios' ? hp('3.5%') : hp('5%')}
                            />
                        </TouchableOpacity>
                    </View>

                    <View
                        style={{
                            position: 'absolute',
                            top: Platform.OS === 'ios' ? hp('5%') : hp('2%'),
                            right: Platform.OS === 'ios' ? hp('2%') : hp('2%'),
                        }}>
                        <TouchableOpacity
                            onPress={() =>
                                this.props.navigation.navigate('CardSegmentNotification')
                            }>
                            <Icon
                                name={'ios-aperture-sharp'}
                                color={'white'}
                                size={Platform.OS === 'ios' ? hp('3.5%') : hp('5%')}
                            />
                        </TouchableOpacity>
                    </View>

                    <View
                        style={{
                            flexDirection: 'row',
                            backgroundColor: 'white',
                            elevation: 10,
                            shadowColor: 'rgba(191, 223, 237, 1)',
                            shadowOpacity: 1,
                            shadowRadius: 2,
                            shadowOffset: { width: 2, height: 5 },
                            alignItems: 'center',
                            height: 50,
                            borderRadius: 25,
                            marginTop: hp('2%'),
                            marginLeft: hp('1%'),
                            marginRight: hp('1%'),
                        }}>
                        <TextInput
                            placeholder="Search by Phone or Date..."
                            placeholderTextColor="#BFDFED"
                            onChangeText={(text) => this.searchFilterFunction(text)}
                            style={{
                                flex: 1,
                                fontSize: 20,
                                fontWeight: 'bold',
                                marginLeft: hp('2%'),
                                height: 45,
                                color: '#121212',
                                alignItems: 'center',
                            }}
                        />
                        <Icon
                            style={{ marginRight: hp('2%') }}
                            name={'ios-search'}
                            color={'#121212'}
                            size={Platform.OS === 'ios' ? hp('3.5%') : hp('3.5%')}
                        />
                    </View>

                    {this.state.clientDatalist.length == 0 ? (
                        this.listEmptyView()
                    ) : (
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <Transitioning.View
                                    ref={ref}
                                    style={styles.container}
                                    transition={transition}>
                                    {this.state.clientDatalist.map((item, index) => {
                                        return (
                                            <View>
                                                <View style={[styles.card]}>
                                                    <View>
                                                        <View style={{ flexDirection: 'row' }}>
                                                            <View>
                                                                {this.customerSegmentType(item.CardType)}
                                                            </View>

                                                            <View
                                                                style={{
                                                                    flex: 1,
                                                                    flexDirection: 'column',
                                                                    paddingLeft: 5,
                                                                }}>

                                                                <View style={{ flexDirection: 'row', flex: 1 }}>
                                                                    <View style={{ flex: 1 }}>
                                                                        <Text style={[styles.heading]}>
                                                                            Date:{' '}
                                                                            <Text
                                                                                style={[styles.content, { color: 'red' }]}>
                                                                                {item.date}
                                                                            </Text>
                                                                        </Text>
                                                                    </View>
                                                                </View>

                                                                {/* name */}
                                                                <View>
                                                                    <Text style={[styles.heading]}>
                                                                        Name:{' '}
                                                                        <Text
                                                                            key={index}
                                                                            style={
                                                                                ([styles.content], { fontWeight: 'normal' })
                                                                            }>
                                                                            {item.Name}
                                                                        </Text>
                                                                    </Text>
                                                                </View>

                                                                {/* email */}
                                                                <View>
                                                                    <Text style={[styles.heading]}>
                                                                        Email:{' '}
                                                                        <Text
                                                                            key={index}
                                                                            style={
                                                                                ([styles.content], { fontWeight: 'normal' })
                                                                            }>
                                                                            {item.email}
                                                                        </Text>
                                                                    </Text>
                                                                </View>

                                                                {/* phone */}
                                                                <View>
                                                                    <Text style={[styles.heading]}>
                                                                        Phone:{' '}
                                                                        <Text
                                                                            key={index}
                                                                            style={
                                                                                ([styles.content], { fontWeight: 'normal' })
                                                                            }>
                                                                            {item.mobile}
                                                                        </Text>
                                                                    </Text>
                                                                </View>

                                                                {/* card type */}
                                                                <View>
                                                                    <Text style={[styles.heading]}>
                                                                        Card Type:{' '}
                                                                        <Text
                                                                            key={index}
                                                                            style={
                                                                                ([styles.content], { fontWeight: 'normal' })
                                                                            }>
                                                                            {item.CardType}
                                                                        </Text>
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                        {index === this.state.currentIndex ? null : (
                                                            <View style={{ ...styles.hrLine }} />
                                                        )}
                                                    </View>
                                                </View>

                                                <TouchableOpacity
                                                    onPress={() => alert('Card Segment Client Summary')}
                                                    style={{
                                                        position: 'absolute',
                                                        right: Platform.OS === 'ios' ? hp('2%') : hp('2%'),
                                                        top: Platform.OS === 'ios' ? hp('5%') : hp('7%'),
                                                    }}>
                                                    <Icon name="share-social" size={26} color="#3498DB" />
                                                </TouchableOpacity>

                                            </View>
                                        );
                                    })}
                                </Transitioning.View>
                            </ScrollView>
                        )
                    }
                    {this.state.rippleEffect ?
                        null
                        :
                        // <TouchableOpacity onPress={() => { this.props.navigation.navigate('FormScreen') }}>
                        //     <View style={[styles.fab1]}>
                        //         <View>
                        //             <MaterialCommunityIcons
                        //                 name={'card-account-details'}
                        //                 size={32}
                        //             />
                        //         </View>
                        //     </View>
                        // </TouchableOpacity>
                        <ActionButton buttonColor="#EA425C">
                            <ActionButton.Item buttonColor='#3498db' title="Cards" onPress={() => this.props.navigation.navigate('CardRegister')}>
                                <MaterialCommunityIcons name="card-account-details" size={32} style={styles.actionButtonIcon} />
                            </ActionButton.Item>
                        </ActionButton>
                    }

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
                </View>
            </TouchableWithoutFeedback>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? hp('3%') : hp('2%'),
    },
    cardContainer: {
        flexGrow: 1,
    },
    card: {
        flexGrow: 1,
        padding: 10,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    content: {
        fontSize: 18,
    },
    vrLine: {
        width: hp('0.5%'),
        borderRadius: 10,
    },
    hrLine: {
        width: hp('5%'),
        height: 0.5,
        marginTop: hp('1.5%'),
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#E83350',
    },
    subCategoriesList: {
        paddingLeft: 15,
        backgroundColor: '#EAF0F1',
    },
    body: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    fab: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 55,
        position: 'absolute',
        bottom: hp('2%'),
        right: hp('1.5%'),
        height: 55,
        backgroundColor: '#8B78E6',
        borderRadius: hp('4.5%'),
        shadowColor: '#8B78E6',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 3,
        shadowOpacity: 0.6
    },
    fab1: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 55,
        position: 'absolute',
        bottom: hp('2%'),
        right: hp('1.5%'),
        height: 55,
        backgroundColor: '#EA425C',
        borderRadius: hp('4.5%'),
        shadowColor: '#EA425C',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 3,
        shadowOpacity: 0.6
    },

    fabText: {
        fontSize: hp('4%'),
        color: '#fff',
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: hp('0.5%')
    },

});
