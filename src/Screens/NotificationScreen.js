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

class NotificationScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hatchBackServiceDatalist: [],
      sedanServiceDatalist: [],
      suvServiceDatalist: [],
      luxuryServiceDatalist: [],
      regularServiceDatalist: [],
      splenderServiceDatalist: [],
      superBikeServiceDatalist: [],
      currentIndex: null,
      loaderForData: true,
      rippleEffect: true,
      isPermitted: false,
    };
    this.arrayholder = [];
  }

  componentDidMount = () => {
    this.hatchBackServiceList()
    this.sedanCSuvServiceList()
    this.suvMuvServiceList()
    this.luxuryServiceList()
    this.regularServiceList()
    this.splenderServiceList()
    this.superBikeServiceList()
  };

  // service list for hatch back car
  hatchBackServiceList = async () => {
    var listref = await firebase
      .database()
      .ref('Hatch Back/')
      .on('value', (dataSnapshot) => {
        let val = dataSnapshot.val();
        console.log('VALUE::', val);

        if (val !== null) {
          let hatchBackServicesList = Object.values(val);
          this.setState({
            hatchBackServiceDatalist: hatchBackServicesList,
            loaderForData: false,
            rippleEffect: false,
          });
          this.arrayholder = hatchBackServicesList;
        } else {
          this.setState({
            hatchBackServiceDatalist: [],
            loaderForData: false,
            rippleEffect: false,
          });
        }
        console.log('hatchBackServiceDatalist::', this.state.hatchBackServiceDatalist);
      });
    setTimeout(() => {
      this.setState({
        loaderForData: false,
        rippleEffect: false,
      });
    }, 5000);
  };

  // sedan cSuv car service list
  sedanCSuvServiceList = async () => {
    var listref = await firebase
      .database()
      .ref('Sedan - C-SUV/')
      .on('value', (dataSnapshot) => {
        let val = dataSnapshot.val();
        console.log('VALUE::', val);

        if (val !== null) {
          let sedanServicesList = Object.values(val);
          this.setState({
            sedanServiceDatalist: sedanServicesList,
            loaderForData: false,
            rippleEffect: false,
          });
          this.arrayholder = sedanServicesList;
        } else {
          this.setState({
            sedanServiceDatalist: [],
            loaderForData: false,
            rippleEffect: false,
          });
        }
        console.log('SedanServiceDatalist::', this.state.sedanServiceDatalist);
      });
    setTimeout(() => {
      this.setState({
        loaderForData: false,
        rippleEffect: false,
      });
    }, 5000);
  };

  // suv muv car service list
  suvMuvServiceList = async () => {
    var listref = await firebase
      .database()
      .ref('SUV-MUV/')
      .on('value', (dataSnapshot) => {
        let val = dataSnapshot.val();
        console.log('VALUE::', val);

        if (val !== null) {
          let suvServicesList = Object.values(val);
          this.setState({
            suvServiceDatalist: suvServicesList,
            loaderForData: false,
            rippleEffect: false,
          });
          this.arrayholder = suvServicesList;
        } else {
          this.setState({
            suvServiceDatalist: [],
            loaderForData: false,
            rippleEffect: false,
          });
        }
        console.log('SuvServiceDatalist::', this.state.suvServiceDatalist);
      });
    setTimeout(() => {
      this.setState({
        loaderForData: false,
        rippleEffect: false,
      });
    }, 5000);
  };

  // luxury car service list
  luxuryServiceList = async () => {
    var listref = await firebase
      .database()
      .ref('Luxury/')
      .on('value', (dataSnapshot) => {
        let val = dataSnapshot.val();
        console.log('VALUE::', val);

        if (val !== null) {
          let luxuryServicesList = Object.values(val);
          this.setState({
            luxuryServiceDatalist: luxuryServicesList,
            loaderForData: false,
            rippleEffect: false,
          });
          this.arrayholder = luxuryServicesList;
        } else {
          this.setState({
            luxuryServiceDatalist: [],
            loaderForData: false,
            rippleEffect: false,
          });
        }
        console.log('LuxuryServiceDatalist::', this.state.luxuryServiceDatalist);
      });
    setTimeout(() => {
      this.setState({
        loaderForData: false,
        rippleEffect: false,
      });
    }, 5000);
  };

  // regular bike service list
  regularServiceList = async () => {
    var listref = await firebase
      .database()
      .ref('Regular/')
      .on('value', (dataSnapshot) => {
        let val = dataSnapshot.val();
        console.log('VALUE::', val);

        if (val !== null) {
          let regularServicesList = Object.values(val);
          this.setState({
            regularServiceDatalist: regularServicesList,
            loaderForData: false,
            rippleEffect: false,
          });
          this.arrayholder = regularServicesList;
        } else {
          this.setState({
            regularServiceDatalist: [],
            loaderForData: false,
            rippleEffect: false,
          });
        }
        console.log('RegularServiceDatalist::', this.state.regularServiceDatalist);
      });
    setTimeout(() => {
      this.setState({
        loaderForData: false,
        rippleEffect: false,
      });
    }, 5000);
  };

  // splender bike service list
  splenderServiceList = async () => {
    var listref = await firebase
      .database()
      .ref('Splender/')
      .on('value', (dataSnapshot) => {
        let val = dataSnapshot.val();
        console.log('VALUE::', val);

        if (val !== null) {
          let splenderServicesList = Object.values(val);
          this.setState({
            splenderServiceDatalist: splenderServicesList,
            loaderForData: false,
            rippleEffect: false,
          });
          this.arrayholder = splenderServicesList;
        } else {
          this.setState({
            splenderServiceDatalist: [],
            loaderForData: false,
            rippleEffect: false,
          });
        }
        console.log('SplenderServiceDatalist::', this.state.splenderServiceDatalist);
      });
    setTimeout(() => {
      this.setState({
        loaderForData: false,
        rippleEffect: false,
      });
    }, 5000);
  };

  // super bike service list
  superBikeServiceList = async () => {
    var listref = await firebase
      .database()
      .ref('Super Bike/')
      .on('value', (dataSnapshot) => {
        let val = dataSnapshot.val();
        console.log('VALUE::', val);

        if (val !== null) {
          let superBikeServicesList = Object.values(val);
          this.setState({
            superBikeServiceDatalist: superBikeServicesList,
            loaderForData: false,
            rippleEffect: false,
          });
          this.arrayholder = superBikeServicesList;
        } else {
          this.setState({
            superBikeServiceDatalist: [],
            loaderForData: false,
            rippleEffect: false,
          });
        }
        console.log('SuperBikeServiceDatalist::', this.state.superBikeServiceDatalist);
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
      const itemData = `${item.title.toUpperCase()}`;
      const textData = searchText.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      serviceList: newData,
    });
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

  render() {
    return (
      <View style={{ backgroundColor: '#fff', flex: 1 }}>

        <Header title="Types of Services" color="#E74292" />
        <View style={{ position: 'absolute', top: Platform.OS === 'ios' ? hp('5%') : hp('2%'), left: Platform.OS === 'ios' ? hp('2%') : hp('2%') }}>
          <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' }} onPress={() => this.props.navigation.goBack()}>
            <Icon
              name={'ios-arrow-back'}
              color={'white'}
              size={Platform.OS === 'ios' ? hp('3.5%') : hp('5%')}
            />
          </TouchableOpacity>
        </View>

        {this.state.hatchBackServiceDatalist.length == 0 ? (
          this.listEmptyView()
        ) : (

            <ScrollView style={[styles.container]}>

              {/* hatch back */}
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={[styles.ballMark]}></View>
                <Text style={[styles.Title]}>Hatch Back</Text>
              </View>

              {this.state.hatchBackServiceDatalist.map((item, index) => (
                <TypesOfServices serviceName={item.Service} servicePrice={item.Price} />
              ))}
              <View style={{ ...styles.hrLine }} />

              {/* sedan - c -suv */}
              <View style={{ marginTop: hp('1.5%'), flexDirection: 'row', alignItems: 'center' }}>
                <View style={[styles.ballMark2]}></View>
                <Text style={[styles.Title]}>Sedan-C-SUV</Text>
              </View>

              {this.state.sedanServiceDatalist.map((item, index) => (
                <TypesOfServices serviceName={item.Service} servicePrice={item.Price} />
              ))}
              <View style={{ ...styles.hrLine }} />

              {/* Suv Muv */}
              <View style={{ marginTop: hp('1.5%'), flexDirection: 'row', alignItems: 'center' }}>
                <View style={[styles.ballMark3]}></View>
                <Text style={[styles.Title]}>SUV-MUV</Text>
              </View>

              {this.state.suvServiceDatalist.map((item, index) => (
                <TypesOfServices serviceName={item.Service} servicePrice={item.Price} />
              ))}
              <View style={{ ...styles.hrLine }} />

              {/* luxury */}
              <View style={{ marginTop: hp('1.5%'), flexDirection: 'row', alignItems: 'center' }}>
                <View style={[styles.ballMark4]}></View>
                <Text style={[styles.Title]}>Luxury</Text>
              </View>

              {this.state.luxuryServiceDatalist.map((item, index) => (
                <TypesOfServices serviceName={item.Service} servicePrice={item.Price} />
              ))}
              <View style={{ ...styles.hrLine }} />

              {/* regular */}
              <View style={{ marginTop: hp('1.5%'), flexDirection: 'row', alignItems: 'center' }}>
                <View style={[styles.ballMark5]}></View>
                <Text style={[styles.Title]}>Regular</Text>
              </View>

              {this.state.regularServiceDatalist.map((item, index) => (
                <TypesOfServices serviceName={item.Service} servicePrice={item.Price} />
              ))}
              <View style={{ ...styles.hrLine }} />

              {/* splender */}
              <View style={{ marginTop: hp('1.5%'), flexDirection: 'row', alignItems: 'center' }}>
                <View style={[styles.ballMark6]}></View>
                <Text style={[styles.Title]}>Special</Text>
              </View>

              {this.state.splenderServiceDatalist.map((item, index) => (
                <TypesOfServices serviceName={item.Service} servicePrice={item.Price} />
              ))}
              <View style={{ ...styles.hrLine }} />

              {/* super bike */}
              <View style={{ marginTop: hp('1.5%'), flexDirection: 'row', alignItems: 'center' }}>
                <View style={[styles.ballMark7]}></View>
                <Text style={[styles.Title]}>Super Bike</Text>
              </View>

              {this.state.superBikeServiceDatalist.map((item, index) => (
                <TypesOfServices serviceName={item.Service} servicePrice={item.Price} />
              ))}
              <View style={{ ...styles.hrLine }} />

              <View style={{ height: hp('15%') }} />
            </ScrollView>
          )
        }

        {this.state.rippleEffect ?
          null
          :
          <ActionButton buttonColor="#EA425C">
            <ActionButton.Item buttonColor='#E74292' title="Add new service" onPress={() => this.props.navigation.navigate('AddNewService')}>
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

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    top: Platform.OS === 'ios' ? hp('5%') : hp('2%'),
    left: Platform.OS === 'ios' ? hp('2%') : hp('2%')
  },
  hrLine: {
    marginTop: hp('2%'),
    height: hp('0.1%'),
    borderRadius: 10,
    backgroundColor: '#3C40C6',
    marginLeft: hp('1%'),
    marginRight: hp('3%'),
  },
  ballMark: {
    backgroundColor: '#67E6DC',
    height: 20,
    width: 20,
    borderRadius: 10
  },
  ballMark2: {
    backgroundColor: '#E83350',
    height: 20,
    width: 20,
    borderRadius: 10
  },
  ballMark3: {
    backgroundColor: '#2ecc72',
    height: 20,
    width: 20,
    borderRadius: 10
  },
  ballMark4: {
    backgroundColor: '#FFF222',
    height: 20,
    width: 20,
    borderRadius: 10
  },
  ballMark5: {
    backgroundColor: '#3498DB',
    height: 20,
    width: 20,
    borderRadius: 10
  },
  ballMark6: {
    backgroundColor: '#333945',
    height: 20,
    width: 20,
    borderRadius: 10
  },
  ballMark7: {
    backgroundColor: '#BB2CD9',
    height: 20,
    width: 20,
    borderRadius: 10
  },
  Title: {
    fontSize: hp('3.5%'),
    fontWeight: 'bold',
    color: '#b8bece',
    padding: hp('1%')
  },
});
