import React, { Component } from 'react';
import {
    Text,
    Image,
    StyleSheet,
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

import Header from '../Components/Header.js';
import RippleEffect2 from '../Components/RippleEffect2.js';
import TypesOfServices from '../Components/TypesOfServices.js';


import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import ActionButton from 'react-native-action-button';

import Icon from 'react-native-vector-icons/Ionicons';
import * as firebase from 'firebase';
import TypesOfCards from '../Components/TypesOfCards.js';

class CardSegmentNotification extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cardCustomerDataList: [],
            currentIndex: null,
            loaderForData: true,
            rippleEffect: true,
            isPermitted: false,
        };
        this.arrayholder = [];
    }

    componentDidMount = () => {
        this.cardHolders()
    };

    // card holder data list
    cardHolders = async () => {
        var listref = await firebase
            .database()
            .ref('CardHolders/')
            .on('value', (dataSnapshot) => {
                let val = dataSnapshot.val();
                console.log('VALUE::', val);

                if (val !== null) {
                    let cardsCustomerList = Object.values(val);
                    this.setState({
                        cardCustomerDataList: cardsCustomerList,
                        loaderForData: false,
                        rippleEffect: false,
                    });
                    this.arrayholder = cardsCustomerList;
                } else {
                    this.setState({
                        cardCustomerDataList: [],
                        loaderForData: false,
                        rippleEffect: false,
                    });
                }
                console.log('CardCustomerDataList::', this.state.cardCustomerDataList);
            });
        setTimeout(() => {
            this.setState({
                loaderForData: false,
                rippleEffect: false,
            });
        }, 5000);
    };

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

    searchFilterFunction = (searchText) => {
        const newData = this.arrayholder.filter((item) => {
            const itemData = `${item.title.toUpperCase()}`;
            const textData = searchText.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            serviceList: newData,
        });
    };

    render() {
        return (

            <View style={{ backgroundColor: '#fff', flex: 1 }}>

                <Header title="Types of Cards" color="#E74292" />
                <View style={{ position: 'absolute', top: Platform.OS === 'ios' ? hp('5%') : hp('2%'), left: Platform.OS === 'ios' ? hp('2%') : hp('2%') }}>
                    <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' }} onPress={() => this.props.navigation.goBack()}>
                        <Icon
                            name={'ios-arrow-back'}
                            color={'white'}
                            size={Platform.OS === 'ios' ? hp('3.5%') : hp('5%')}
                        />
                    </TouchableOpacity>
                </View>

                {this.state.cardCustomerDataList.length == 0 ? (
                    this.listEmptyView()
                ) : (
                        <ScrollView style={[styles.container]}>
                            {this.state.cardCustomerDataList.map((item, index) => (
                                <TypesOfCards Title={item.Title} Price={item.Price} Validity={item.Validity} Description={item.Description} />
                            ))}

                            <View style={{ height: hp('15%') }} />
                        </ScrollView>
                    )
                }

                {this.state.rippleEffect ?
                    null
                    :
                    <ActionButton buttonColor="#EA425C">
                        <ActionButton.Item buttonColor='#E74292' title="Add new cards" onPress={() => this.props.navigation.navigate('AddNewCards')}>
                            <Icon name="md-create" size={32} />
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
        );
    }
}

export default CardSegmentNotification;

const styles = StyleSheet.create({
    container: {
        top: Platform.OS === 'ios' ? hp('5%') : hp('2%'),
        left: Platform.OS === 'ios' ? hp('2%') : hp('2%')
    },
});
