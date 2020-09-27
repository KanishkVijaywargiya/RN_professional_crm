import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
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

import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/FontAwesome5';

import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';

import {Transition, Transitioning, color} from 'react-native-reanimated';
import {ActivityIndicator} from 'react-native-paper';

const {width} = Dimensions.get('window');

function mapStateToProps(state) {
  return {action: state.action, name: state.name};
}

function mapDispatchToProps(dispatch) {
  return {
    updateUid: (uid) => dispatch({type: 'UPDATE_UID', uid}),
    updateName: (name) => dispatch({type: 'UPDATE_NAME', name}),
    updateEmail: (email) => dispatch({type: 'UPDATE_EMAIL', email}),

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
    };
    this.arrayholder = [];
    ref = React.createRef();
  }

  componentDidMount() {
    this.clientlist();
  }

  clientlist = async () => {
    var listref = await firebase
      .database()
      .ref('Client/')
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
      const itemData = `${
        item.Phone
      } ${item.Email.toUpperCase()} ${item.Name.toUpperCase()} ${
        item.date
      } ${item.VehicleNo.toUpperCase()} ${item.Service.toUpperCase()}`;
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
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <RippleEffect />
        </View>
      );
    }
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image
          style={{
            width: Platform.OS === 'ios' ? hp('45%') : hp('35%'),
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

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this.closeKeyboard()}>
        <View style={{backgroundColor: '#fff', flex: 1}}>
          <Notifications />
          <Header title="Clients" color="#3498DB" />
          <View
            style={{
              position: 'absolute',
              top: Platform.OS === 'ios' ? hp('5%') : hp('2%'),
              right: Platform.OS === 'ios' ? hp('2%') : hp('2%'),
            }}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('NotificationScreen')
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
              shadowOffset: {width: 2, height: 5},
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
              style={{marginRight: hp('2%')}}
              name={'ios-search'}
              color={'#121212'}
              size={Platform.OS === 'ios' ? hp('3.5%') : hp('5%')}
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
                    <TouchableOpacity
                      key={index}
                      style={styles.cardContainer}
                      activeOpacity={0.9}
                      onPress={() => {
                        ref.current.animateNextTransition();
                        this.setState({
                          currentIndex:
                            index === this.state.currentIndex ? null : index,
                        });
                      }}>
                      <View style={[styles.card]}>
                        <View>
                          <View style={{flexDirection: 'row'}}>
                            <View
                              style={{
                                ...styles.vrLine,
                                backgroundColor: item.Color,
                              }}
                            />
                            <View
                              style={{
                                flex: 1,
                                flexDirection: 'column',
                                paddingLeft: 5,
                              }}>
                              <View style={{flexDirection: 'row', flex: 1}}>
                                <View style={{flex: 1}}>
                                  <Text style={[styles.heading]}>
                                    Date:{' '}
                                    <Text
                                      style={
                                        ([styles.content], {color: item.Color})
                                      }>
                                      {item.date}
                                    </Text>
                                  </Text>
                                </View>
                                <View>
                                  <Text style={[styles.heading]}>
                                    Price: ₹
                                    <Text
                                      style={
                                        ([styles.content],
                                        {fontWeight: 'normal'})
                                      }>
                                      {item.totalPrice} /-
                                    </Text>
                                  </Text>
                                </View>
                              </View>
                              <View>
                                <Text style={[styles.heading]}>
                                  Name:{' '}
                                  <Text
                                    style={
                                      ([styles.content], {fontWeight: 'normal'})
                                    }>
                                    {item.Name}
                                  </Text>
                                </Text>
                              </View>
                              <View>
                                <Text style={[styles.heading]}>
                                  Phone:{' '}
                                  <Text
                                    style={
                                      ([styles.content], {fontWeight: 'normal'})
                                    }>
                                    {item.Phone}
                                  </Text>
                                </Text>
                              </View>
                              <View>
                                <Text style={[styles.heading]}>
                                  Category:{' '}
                                  <Text
                                    style={
                                      ([styles.content], {fontWeight: 'normal'})
                                    }>
                                    {item.Category}
                                  </Text>
                                </Text>
                              </View>
                            </View>
                          </View>
                          {index === this.state.currentIndex ? null : (
                            <View style={{...styles.hrLine}} />
                          )}
                        </View>
                        {index === this.state.currentIndex && (
                          <View style={styles.subCategoriesList}>
                            <View style={{marginTop: 10, marginBottom: 10}}>
                              <View>
                                <Text key={index} style={[styles.body]}>
                                  Email:{' '}
                                  <Text
                                    style={
                                      ([styles.content], {fontWeight: 'normal'})
                                    }>
                                    {item.Email}
                                  </Text>
                                </Text>
                              </View>
                              <View>
                                <Text key={index} style={[styles.body]}>
                                  Vehicle Type:{' '}
                                  <Text
                                    style={
                                      ([styles.content], {fontWeight: 'normal'})
                                    }>
                                    {item.VehicleType}
                                  </Text>
                                </Text>
                              </View>
                              <View>
                                <Text style={[styles.heading]}>
                                  Vehicle:{' '}
                                  <Text
                                    style={
                                      ([styles.content], {fontWeight: 'normal'})
                                    }>
                                    {item.Vehicle}
                                  </Text>
                                </Text>
                              </View>
                              <View>
                                <Text key={index} style={[styles.body]}>
                                  VehicleNo:{' '}
                                  <Text
                                    style={
                                      ([styles.content], {fontWeight: 'normal'})
                                    }>
                                    {item.VehicleNo}
                                  </Text>
                                </Text>
                              </View>
                              <View>
                                <Text key={index} style={[styles.body]}>
                                  Service:{' '}
                                  <Text
                                    style={
                                      ([styles.content], {fontWeight: 'normal'})
                                    }>
                                    {item.Service}
                                  </Text>
                                </Text>
                              </View>
                              {item.Service2 !== '' ? (
                                <View>
                                  <Text key={index} style={[styles.body]}>
                                    Service2:{' '}
                                    <Text
                                      style={
                                        ([styles.content],
                                        {fontWeight: 'normal'})
                                      }>
                                      {item.Service2}
                                    </Text>
                                  </Text>
                                </View>
                              ) : null}
                              {item.Service3 !== '' ? (
                                <View>
                                  <Text key={index} style={[styles.body]}>
                                    Service3:{' '}
                                    <Text
                                      style={
                                        ([styles.content],
                                        {fontWeight: 'normal'})
                                      }>
                                      {item.Service3}
                                    </Text>
                                  </Text>
                                </View>
                              ) : null}
                              {item.Service4 !== '' ? (
                                <View>
                                  <Text key={index} style={[styles.body]}>
                                    Service4:{' '}
                                    <Text
                                      style={
                                        ([styles.content],
                                        {fontWeight: 'normal'})
                                      }>
                                      {item.Service4}
                                    </Text>
                                  </Text>
                                </View>
                              ) : null}
                              {item.Service5 !== '' ? (
                                <View>
                                  <Text key={index} style={[styles.body]}>
                                    Service5:{' '}
                                    <Text
                                      style={
                                        ([styles.content],
                                        {fontWeight: 'normal'})
                                      }>
                                      {item.Service5}
                                    </Text>
                                  </Text>
                                </View>
                              ) : null}
                              {item.Service6 !== '' ? (
                                <View>
                                  <Text key={index} style={[styles.body]}>
                                    Service6:{' '}
                                    <Text
                                      style={
                                        ([styles.content],
                                        {fontWeight: 'normal'})
                                      }>
                                      {item.Service6}
                                    </Text>
                                  </Text>
                                </View>
                              ) : null}
                              {item.Service7 !== '' ? (
                                <View>
                                  <Text key={index} style={[styles.body]}>
                                    Service7:{' '}
                                    <Text
                                      style={
                                        ([styles.content],
                                        {fontWeight: 'normal'})
                                      }>
                                      {item.Service7}
                                    </Text>
                                  </Text>
                                </View>
                              ) : null}
                              {item.Service8 !== '' ? (
                                <View>
                                  <Text key={index} style={[styles.body]}>
                                    Service8:{' '}
                                    <Text
                                      style={
                                        ([styles.content],
                                        {fontWeight: 'normal'})
                                      }>
                                      {item.Service8}
                                    </Text>
                                  </Text>
                                </View>
                              ) : null}
                              {item.Service9 !== '' ? (
                                <View>
                                  <Text key={index} style={[styles.body]}>
                                    Service9:{' '}
                                    <Text
                                      style={
                                        ([styles.content],
                                        {fontWeight: 'normal'})
                                      }>
                                      {item.Service9}
                                    </Text>
                                  </Text>
                                </View>
                              ) : null}
                              {item.Service10 !== '' ? (
                                <View>
                                  <Text key={index} style={[styles.body]}>
                                    Service10:{' '}
                                    <Text
                                      style={
                                        ([styles.content],
                                        {fontWeight: 'normal'})
                                      }>
                                      {item.Service10}
                                    </Text>
                                  </Text>
                                </View>
                              ) : null}
                            </View>
                            {index === this.state.currentIndex ? (
                              <View
                                style={{
                                  ...styles.hrLine,
                                  marginTop: 0,
                                  marginBottom: hp('1%'),
                                }}
                              />
                            ) : null}
                          </View>
                        )}
                      </View>
                      <TouchableOpacity
                        onPress={() => alert(item.totalPrice)}
                        style={{
                          position: 'absolute',
                          right: Platform.OS === 'ios' ? hp('2%') : hp('2%'),
                          top: Platform.OS === 'ios' ? hp('5%') : hp('2%'),
                        }}>
                        <Icon name="share-social" size={26} color="#3498DB" />
                      </TouchableOpacity>
                    </TouchableOpacity>
                  );
                })}
              </Transitioning.View>
            </ScrollView>
          )}
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('FormScreen');
            }}>
            <View style={[styles.fab]}>
              <View>
                <Icons
                  name={'plus'}
                  color={'white'}
                  size={Platform.OS === 'ios' ? hp('3%') : hp('5%')}
                />
              </View>
            </View>
          </TouchableOpacity>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              bottom: hp('2%'),
            }}>
            <Text
              style={{
                color: '#DAE0E2',
                fontSize: 10,
                fontStyle: 'italic',
                fontWeight: 'bold',
              }}>
              BlaceNova Inc.
              <Text style={{fontSize: 10, lineHeight: 50}}>TM</Text>
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
    marginTop: Platform.OS === 'ios' ? hp('3%') : hp('10%'),
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
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: '#8B78E6',
    position: 'absolute',
    bottom: hp('2%'),
    right: hp('1.5%'),
    elevation: 10,
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 2},
    alignItems: 'center',
    justifyContent: 'center',
  },
});
