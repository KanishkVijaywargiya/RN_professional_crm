import React, { Component } from 'react';
import styled from 'styled-components';
import {
    View,
    TextInput,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Dimensions,
    Platform,
} from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

let screenWidth = Dimensions.get('window').width;
var cardWith = screenWidth - 40;
if (screenWidth > 500) {
    cardWith = 460;
}

// function mapStateToProps(state) {
//   return {action: state.action};
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     closeNotif: () =>
//       dispatch({
//         type: 'CLOSE_NOTIF',
//       }),
//   };
// }

class NotificationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceList: [],
        };
        this.arrayholder = [];
    }
    componentDidMount = () => {
        this.setState({
            serviceList: items,
        });
        this.arrayholder = items;
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
            <Container>
                <TouchableOpacity
                    onPress={() => this.props.navigation.goBack()}
                    style={{
                        position: 'absolute',
                        top: Platform.OS === 'ios' ? 40 : 10,
                        left: '50%',
                        marginLeft: -22,
                        zIndex: 100,
                    }}>
                    <CloseButton style={{ elevation: 20 }}>
                        <Icon name="ios-close" size={44} color="#546bfb" />
                    </CloseButton>
                </TouchableOpacity>

                <View
                    style={{
                        position: 'absolute',
                        zIndex: 100,
                        width: Platform.OS === 'ios' ? hp('44%') : hp('54%'),
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
                        marginTop: hp('12%'),
                        marginLeft: hp('1%'),
                        marginRight: hp('1%'),
                    }}>
                    <TextInput
                        placeholder="Search by Cards Name"
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

                <SafeAreaView>
                    <ScrollView
                        style={{ marginTop: Platform.OS === 'ios' ? hp('10%') : hp('15%') }}
                        showsVerticalScrollIndicator={false}>
                        <Wrapper>
                            <Subtitle>Types of card segment we provide:</Subtitle>
                            {this.state.serviceList.map((item, index) => (
                                <ItemContainer key={index}>
                                    <Header>
                                        <Logo source={{ uri: item.logo }} resizeMode="contain" />
                                        <Title>{item.title}</Title>
                                    </Header>
                                    <Text>{item.text}</Text>
                                    <Text>{item.Validity}</Text>
                                </ItemContainer>
                            ))}
                        </Wrapper>
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                bottom: hp('2%'),
                            }}>
                            <Text
                                style={{ color: '#121212', fontSize: 10, fontStyle: 'italic' }}>
                                BlaceNova Inc.
                                <Text
                                    style={{
                                        color: '#121212',
                                        fontSize: 10,
                                        lineHeight: 50,
                                        fontStyle: 'italic',
                                    }}>
                                    TM
                                </Text>
                            </Text>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </Container>
        );
    }
}

export default NotificationScreen;

const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background: #f0f3f5;
`;

const CloseButton = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background: white;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

const Wrapper = styled.View`
  align-self: center;
  width: ${cardWith};
  padding-top: 50px;
  padding-bottom: 30px;
`;

const Subtitle = styled.Text`
  font-size: 15px;
  text-transform: uppercase;
  font-weight: 600;
  color: #b8bece;
`;

const ItemContainer = styled.View`
  width: 100%;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
  margin-top: 20px;
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Logo = styled.Image`
  width: 24px;
  height: 24px;
`;

const DateContainer = styled.View`
  background: #4775f2;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  padding: 0 8px;
  height: 20px;
  position: absolute;
  top: 0px;
  right: 0px;
`;

const Date = styled.Text`
  color: white;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
`;

const Title = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
  margin-left: 8px;
`;

const Text = styled.Text`
  font-size: 17px;
  color: #3c4560;
  margin-top: 20px;
  line-height: 24px;
`;

const TitleText = styled.Text`
  font-size: 17px;
  color: #3c4560;
  margin-top: 20px;
  line-height: 24px;
  font-weight: bold;
`;

const items = [
    {
        logo:
            'https://p73.f4.n0.cdn.getcloudapp.com/items/wbu7xK6X/logo-vue.png?v=2f6cbfbd65c9698f25db8b6a2d8d7700',
        title: 'Value Card ₹2000',
        text: 'With 40% extra, One time pay (prepaid)',
        Validity: '8 Months',
    },
    {
        logo:
            'https://p73.f4.n0.cdn.getcloudapp.com/items/wbu7xK6X/logo-vue.png?v=2f6cbfbd65c9698f25db8b6a2d8d7700',
        title: 'Value Card ₹5000',
        text: 'With 30% extra, One time pay (prepaid)',
        Validity: '4 Months',
    },
    {
        logo:
            'https://p73.f4.n0.cdn.getcloudapp.com/items/wbu7xK6X/logo-vue.png?v=2f6cbfbd65c9698f25db8b6a2d8d7700',
        title: 'Value Card ₹10000',
        text: 'With 40% extra, One time pay (prepaid)',
        Validity: '8 Months',
    },
    {
        logo:
            'https://p73.f4.n0.cdn.getcloudapp.com/items/wbu7xK6X/logo-vue.png?v=2f6cbfbd65c9698f25db8b6a2d8d7700',
        title: 'Previledge Card ₹650',
        text: 'Everytime payment with 15% flat discount',
        Validity: '8 Months',
    },
];

