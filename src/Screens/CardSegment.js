import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    View,
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
import RippleEffect from '../Components/RippleEffect.js';

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
                    this.setState({
                        clientDatalist: clientsList,
                        loaderForData: false,
                        rippleEffect: false,
                    });
                    this.arrayholder = clientsList;
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

    listEmptyView = () => {
        if (this.state.rippleEffect) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <RippleEffect />
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
                    <View style={{ backgroundColor: 'yellow', width: hp('0.5%'), height: hp('11%'), borderRadius: 10 }} />
                )
            case 'Value Card ₹5000':
                return (
                    <View style={{ backgroundColor: 'blue', width: hp('0.5%'), height: hp('11%'), borderRadius: 10 }} />
                )
            case 'Value Card ₹10000':
                return (
                    <View style={{ backgroundColor: 'green', width: hp('0.5%'), height: hp('11%'), borderRadius: 10 }} />
                )
            case 'Previledge Card ₹650':
                return (
                    <View style={{ backgroundColor: 'red', width: hp('0.5%'), height: hp('11%'), borderRadius: 10 }} />
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

                                                        <View>
                                                            <Text style={[styles.heading]}>
                                                                Name:{' '}
                                                                <Text
                                                                    style={
                                                                        ([styles.content], { fontWeight: 'normal' })
                                                                    }>
                                                                    {item.Name}
                                                                </Text>
                                                            </Text>
                                                        </View>
                                                        <View>
                                                            <Text style={[styles.heading]}>
                                                                Email:{' '}
                                                                <Text
                                                                    style={
                                                                        ([styles.content], { fontWeight: 'normal' })
                                                                    }>
                                                                    {item.email}
                                                                </Text>
                                                            </Text>
                                                        </View>
                                                        <View>
                                                            <Text style={[styles.heading]}>
                                                                Phone:{' '}
                                                                <Text
                                                                    style={
                                                                        ([styles.content], { fontWeight: 'normal' })
                                                                    }>
                                                                    {item.mobile}
                                                                </Text>
                                                            </Text>
                                                        </View>
                                                        <View>
                                                            <Text style={[styles.heading]}>
                                                                CardType:{' '}
                                                                <Text
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
                                            onPress={() => Platform.OS === 'ios' ? this.createPDF(item) : this.printHTML(item)}
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

                    {this.state.rippleEffect ?
                        null
                        :

                        <View style={{ flex: 1 }}>
                            {/* Rest of the app comes ABOVE the action button component !*/}
                            <ActionButton buttonColor="#8B78E6">
                                <ActionButton.Item buttonColor='#F3B431' title="Normal Billing" onPress={() => Platform.OS == 'ios' ? this.props.navigation.navigate('FormScreen') : this.props.navigation.navigate('AndroidForm')}>
                                    <Icon name="md-create" size={32} style={styles.actionButtonIcon} />
                                </ActionButton.Item>
                                <ActionButton.Item buttonColor='#3498db' title="Register Customer" onPress={() => this.props.navigation.navigate('RegisterCustomer')}>
                                    <MaterialCommunityIcons name="card-account-details" size={32} style={styles.actionButtonIcon} />
                                </ActionButton.Item>
                                <ActionButton.Item buttonColor='#1abc9c' title="Misc Billing" onPress={() => this.props.navigation.navigate('Misc')}>
                                    <EvilIcons name="credit-card" size={42} style={styles.actionButtonIcon} />
                                </ActionButton.Item>
                            </ActionButton>
                        </View>
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
