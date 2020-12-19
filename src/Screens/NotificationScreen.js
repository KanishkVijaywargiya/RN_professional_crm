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

import ActionButton from 'react-native-action-button';

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
            placeholder="Search by Service Name"
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
              <Subtitle>Types of services we provide:</Subtitle>
              {this.state.serviceList.map((item, index) => (
                <ItemContainer key={index}>
                  <Header>
                    <Logo source={{ uri: item.logo }} resizeMode="contain" />
                    <Title>{item.title}</Title>
                  </Header>
                  <TitleText>Cars</TitleText>
                  <Text>{item.text}</Text>
                  <TitleText>Bikes</TitleText>
                  <Text>{item.bikeText}</Text>
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

        <ActionButton buttonColor="#8B78E6">
          <ActionButton.Item buttonColor='#F3B431' title="Add new service" onPress={() => this.props.navigation.navigate('AddNewService')}>
            <Icon name="md-create" size={32} />
          </ActionButton.Item>
        </ActionButton>

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
    title: 'Basic Wash Package',
    text:
      'Hatch Back:- ₹395/-\nSedan/C SUV:- ₹450/-\nSUV/MUV:- ₹500/-\nLuxury:- ₹500/-',
    bikeText: 'N.A.',
    date: '23 Jan',
  },
  {
    logo:
      'https://p73.f4.n0.cdn.getcloudapp.com/items/wbu7xK6X/logo-vue.png?v=2f6cbfbd65c9698f25db8b6a2d8d7700',
    title: 'Regular Wash Package',
    text:
      'Hatch Back:- ₹625/-\nSedan/C SUV:- ₹675/-\nSUV/MUV:- ₹795/-\nLuxury:- ₹795/-',
    bikeText: 'N.A.',
    date: '27 Nov',
  },
  {
    logo:
      'https://p73.f4.n0.cdn.getcloudapp.com/items/wbu7xK6X/logo-vue.png?v=2f6cbfbd65c9698f25db8b6a2d8d7700',
    title: 'Super Wash Package',
    text:
      'Hatch Back:- ₹1025/-\nSedan/C SUV:- ₹1125/-\nSUV/MUV:- ₹1300/-\nLuxury:- ₹1400/-',
    bikeText: 'N.A.',
    date: '26 SEP',
  },
  {
    logo:
      'https://p73.f4.n0.cdn.getcloudapp.com/items/wbu7xK6X/logo-vue.png?v=2f6cbfbd65c9698f25db8b6a2d8d7700',
    title: 'Premium Wash With Rexine/ Leather Seat',
    text:
      'Hatch Back:- ₹1800/-\nSedan/C SUV:- ₹2025/-\nSUV/MUV:- ₹2495/-\nLuxury:- ₹2825/-',
    bikeText: 'N.A.',
    date: '4 SEP',
  },
  {
    logo:
      'https://p73.f4.n0.cdn.getcloudapp.com/items/wbu7xK6X/logo-vue.png?v=2f6cbfbd65c9698f25db8b6a2d8d7700',
    title: 'Premium Wash With Fabric Seat',
    text:
      'Hatch Back:- ₹2150/-\nSedan/C SUV:- ₹2495/-\nSUV/MUV:- ₹3050/-\nLuxury:- ₹3400/-',
    bikeText: 'N.A.',
    date: '26 SEP',
  },
  {
    logo:
      'https://p73.f4.n0.cdn.getcloudapp.com/items/wbu7xK6X/logo-vue.png?v=2f6cbfbd65c9698f25db8b6a2d8d7700',
    title: 'Foam Wash',
    text:
      'Hatch Back:- ₹85/-\nSedan/C SUV:- ₹85/-\nSUV/MUV:- ₹110/-\nLuxury:- ₹110/-',
    bikeText: 'Regular:- ₹225/-\nSplender:- ₹275/-\nSuper Bike:- ₹325',
    date: '23 Jan',
  },
  {
    logo:
      'https://p73.f4.n0.cdn.getcloudapp.com/items/wbu7xK6X/logo-vue.png?v=2f6cbfbd65c9698f25db8b6a2d8d7700',
    title: 'Roof Cleaning',
    text:
      'Hatch Back:- ₹450/-\nSedan/C SUV:- ₹575/-\nSUV/MUV:- ₹675/-\nLuxury:- ₹795/-',
    bikeText: 'N.A.',
    date: '23 Jan',
  },
  {
    logo:
      'https://p73.f4.n0.cdn.getcloudapp.com/items/wbu7xK6X/logo-vue.png?v=2f6cbfbd65c9698f25db8b6a2d8d7700',
    title: 'Seat Cleaning (Rexine/ Leather)',
    text:
      'Hatch Back:- ₹450/-\nSedan/C SUV:- ₹575/-\nSUV/MUV:- ₹795/-\nLuxury:- ₹795/-',
    bikeText: 'N.A.',
    date: '23 Jan',
  },
  {
    logo:
      'https://p73.f4.n0.cdn.getcloudapp.com/items/wbu7xK6X/logo-vue.png?v=2f6cbfbd65c9698f25db8b6a2d8d7700',
    title: 'Seat Cleaning (Fabric)',
    text:
      'Hatch Back:- ₹900/-\nSedan/C SUV:- ₹900/-\nSUV/MUV:- ₹1475/-\nLuxury:- ₹1695/-',
    bikeText: 'N.A.',
    date: '23 Jan',
  },
  {
    logo:
      'https://p73.f4.n0.cdn.getcloudapp.com/items/wbu7xK6X/logo-vue.png?v=2f6cbfbd65c9698f25db8b6a2d8d7700',
    title: 'Seat Leather/ Fabric Conditioning',
    text:
      'Hatch Back:- ₹450/-\nSedan/C SUV:- ₹575/-\nSUV/MUV:- ₹795/-\nLuxury:- ₹795/-',
    bikeText: 'Regular:- ₹110/-\nSplender:- ₹110/-\nSuper Bike:- ₹110',
    date: '23 Jan',
  },
  {
    logo:
      'https://p73.f4.n0.cdn.getcloudapp.com/items/wbu7xK6X/logo-vue.png?v=2f6cbfbd65c9698f25db8b6a2d8d7700',
    title: 'Interior Roof & Upholstery Cleaning (Paicrytal)',
    text:
      'Hatch Back:- ₹1250/-\nSedan/C SUV:- ₹1425/-\nSUV/MUV:- ₹1800/-\nLuxury:- ₹2275/-',
    bikeText: 'N.A.',
    date: '23 Jan',
  },
  {
    logo:
      'https://p73.f4.n0.cdn.getcloudapp.com/items/wbu7xK6X/logo-vue.png?v=2f6cbfbd65c9698f25db8b6a2d8d7700',
    title: 'Teflon Polish (Insta Finish + Pai Crystal)',
    text:
      'Hatch Back:- ₹2495/-\nSedan/C SUV:- ₹2995/-\nSUV/MUV:- ₹3995/-\nLuxury:- ₹4995/-',
    bikeText: 'Regular:- ₹450/-\nSplender:- ₹450/-\nSuper Bike:- ₹500',
    date: '23 Jan',
  },
  {
    logo:
      'https://p73.f4.n0.cdn.getcloudapp.com/items/wbu7xK6X/logo-vue.png?v=2f6cbfbd65c9698f25db8b6a2d8d7700',
    title: 'Nano Paint Guard Coating',
    text:
      'Hatch Back:- ₹13,995/-\nSedan/C SUV:- ₹15,995/-\nSUV/MUV:- ₹17,995/-\nLuxury:- ₹19,995/-',
    bikeText: 'Regular:- ₹2995/-\nSplender:- ₹3995/-\nSuper Bike:- ₹4995',
    date: '23 Jan',
  },
  {
    logo:
      'https://p73.f4.n0.cdn.getcloudapp.com/items/wbu7xK6X/logo-vue.png?v=2f6cbfbd65c9698f25db8b6a2d8d7700',
    title: 'Instant Shine (Nanoskin/ Petra, USA)',
    text:
      'Hatch Back:- ₹275/-\nSedan/C SUV:- ₹325/-\nSUV/MUV:- ₹450/-\nLuxury:- ₹500/-',
    bikeText: 'Regular:- ₹80/-\nSplender:- ₹100/-\nSuper Bike:- ₹120',
    date: '23 Jan',
  },
  {
    logo:
      'https://p73.f4.n0.cdn.getcloudapp.com/items/wbu7xK6X/logo-vue.png?v=2f6cbfbd65c9698f25db8b6a2d8d7700',
    title: 'Under Body Antirust Protection',
    text:
      'Hatch Back:- ₹1975/-\nSedan/C SUV:- ₹2275/-\nSUV/MUV:- ₹2550/-\nLuxury:- ₹2825/-',
    bikeText: 'Regular:- ₹200/-\nSplender:- ₹200/-\nSuper Bike:- ₹200',
    date: '23 Jan',
  },
  {
    logo:
      'https://p73.f4.n0.cdn.getcloudapp.com/items/wbu7xK6X/logo-vue.png?v=2f6cbfbd65c9698f25db8b6a2d8d7700',
    title: 'Silencer Heat Resistant Coating',
    text:
      'Hatch Back:- ₹450/-\nSedan/C SUV:- ₹500/-\nSUV/MUV:- ₹675/-\nLuxury:- ₹675/-',
    bikeText: 'Regular:- ₹150/-\nSplender:- ₹150/-\nSuper Bike:- ₹150',
    date: '23 Jan',
  },
  {
    logo:
      'https://p73.f4.n0.cdn.getcloudapp.com/items/wbu7xK6X/logo-vue.png?v=2f6cbfbd65c9698f25db8b6a2d8d7700',
    title: 'Air-Conditioner Dis-Infection',
    text:
      'Hatch Back:- ₹450/-\nSedan/C SUV:- ₹500/-\nSUV/MUV:- ₹675/-\nLuxury:- ₹675/-',
    bikeText: 'N.A.',
    date: '23 Jan',
  },
  {
    logo:
      'https://p73.f4.n0.cdn.getcloudapp.com/items/wbu7xK6X/logo-vue.png?v=2f6cbfbd65c9698f25db8b6a2d8d7700',
    title: 'Alloy/Wheel Degreasing & Cleaning',
    text:
      'Hatch Back:- ₹350/-\nSedan/C SUV:- ₹450/-\nSUV/MUV:- ₹575/-\nLuxury:- ₹675/-',
    bikeText: 'Regular:- ₹110/-\nSplender:- ₹110/-\nSuper Bike:- ₹110',
    date: '23 Jan',
  },
  {
    logo:
      'https://p73.f4.n0.cdn.getcloudapp.com/items/wbu7xK6X/logo-vue.png?v=2f6cbfbd65c9698f25db8b6a2d8d7700',
    title: 'Nitrogen Air Inflation in 4 Tyres',
    text:
      'Hatch Back:- ₹110/-\nSedan/C SUV:- ₹110/-\nSUV/MUV:- ₹110/-\nLuxury:- ₹110/-',
    bikeText: 'Regular:- ₹50/-\nSplender:- ₹50/-\nSuper Bike:- ₹50',
    date: '23 Jan',
  },
  {
    logo:
      'https://p73.f4.n0.cdn.getcloudapp.com/items/wbu7xK6X/logo-vue.png?v=2f6cbfbd65c9698f25db8b6a2d8d7700',
    title: 'Engine Washing, Degreasing & Cleaning (Petra)',
    text:
      'Hatch Back:- ₹450/-\nSedan/C SUV:- ₹450/-\nSUV/MUV:- ₹575/-\nLuxury:- ₹675/-',
    bikeText: 'Regular:- ₹150/-\nSplender:- ₹150/-\nSuper Bike:- ₹150',
    date: '23 Jan',
  },
  {
    logo:
      'https://p73.f4.n0.cdn.getcloudapp.com/items/wbu7xK6X/logo-vue.png?v=2f6cbfbd65c9698f25db8b6a2d8d7700',
    title: 'Wind Shield/ Glass Treatment (Nanoskin/ H2O)',
    text:
      'Hatch Back:- ₹450/-\nSedan/C SUV:- ₹575/-\nSUV/MUV:- ₹675/-\nLuxury:- ₹795/-',
    bikeText: 'N.A.',
    date: '23 Jan',
  },
  {
    logo:
      'https://p73.f4.n0.cdn.getcloudapp.com/items/wbu7xK6X/logo-vue.png?v=2f6cbfbd65c9698f25db8b6a2d8d7700',
    title: 'All Glass Water Spot/ Stain Removal (Nanoskin)',
    text:
      'Hatch Back:- 900/-\nSedan/C SUV:- ₹1350/-\nSUV/MUV:- ₹1695/-\nLuxury:- ₹2275/-',
    bikeText: 'N.A.',
    date: '23 Jan',
  },
];
