import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  SafeAreaView,
  Dimensions,
  Keyboard,
  TextInput,
  Alert,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import Success from '../Components/Success.js';
import Loading from '../Components/Loading.js';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';

function mapDispatchToProps(dispatch) {
  return {
    updateUid: (uid) => dispatch({ type: 'UPDATE_UID', uid }),
    updateName: (fullName) => dispatch({ type: 'UPDATE_NAME', fullName }),
    updateEmail: (email) => dispatch({ type: 'UPDATE_EMAIL', email }),
  };
}

class Login extends Component {
  state = {
    email: '',
    password: '',
    IconEmail: require('../Assets/icon-email.png'),
    IconPassword: require('../Assets/icon-password.png'),
    isSuccessful: false,
    isLoading: false,
  };
  storeData = async (uid, uidtoken) => {
    try {
      await AsyncStorage.setItem(uid, uidtoken);
    } catch (e) {
      // saving error
    }
  };
  onSignIn = async () => {
    console.log('DATA: ', this.state.email, this.state.password);
    const email = this.state.email;
    const password = this.state.password;
    if (email && password) {
      this.setState({ isSuccessful: true });
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch((error) => {
          Alert.alert('Error', error.message);
          Keyboard.dismiss();
          this.setState({ isSuccessful: false });
        })
        .then((response) => {
          Keyboard.dismiss();
          if (response) {
            console.log('RESPONSE aaja:: ', response);
            this.storeData('uid', response.user.uid);
            this.props.updateUid(response.user.uid);

            this.setState({ isSuccessful: false, email: '', password: '' });
            setTimeout(() => {
              this.setState({ isSuccessful: false });
              // Alert.alert('Congrats', "You've logged in Successfully!");
            }, 2000);
          }
        });
    } else {
      Alert.alert('Please fill the details.....!');
    }
  };
  focusEmail = () => {
    this.setState({
      IconEmail: require('../Assets/icon-email-animated.gif'),
      IconPassword: require('../Assets/icon-password.png'),
    });
  };

  focusPassword = () => {
    this.setState({
      IconEmail: require('../Assets/icon-email.png'),
      IconPassword: require('../Assets/icon-password-animated.gif'),
    });
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <KeyboardAwareScrollView>
          <SafeAreaView>
            <View
              style={{
                height: Platform.OS === 'ios' ? hp('23%') : hp('35%'),
                alignItems: 'center',
              }}>
              <Image source={require('../Assets/LoginLogo/login.png')} />
            </View>
            <View
              style={{
                alignItems: 'center',
                marginTop: Platform.OS === 'ios' ? hp('5%') : hp('0.5%'),
              }}>
              <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Welcome</Text>
              <Text style={{ fontSize: 12, fontWeight: '500', color: '#121212' }}>
                Log in to your existed account of Clean & Shine CRM
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: Platform.OS === 'ios' ? hp('3%') : hp('3%'),
                height: Platform.OS === 'ios' ? hp('6.5%') : hp('8%'),
                borderRadius: 30,
                borderWidth: 1,
                borderColor: '#3498DB',
                alignSelf: 'center',
                width: Dimensions.get('window').width - 30,
              }}>
              <View style={{ flex: 0.2, alignItems: 'center' }}>
                <IconEmail source={this.state.IconEmail} />
              </View>
              <TextInput
                style={{ flex: 0.8, fontSize: 22, color: '#3498DB' }}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Email"
                placeholderTextColor="#3C4560"
                keyboardType="email-address"
                onChangeText={(email) => this.setState({ email })}
                onFocus={this.focusEmail}
                value={this.state.email}
                opacity={0.5}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: Platform.OS === 'ios' ? hp('3%') : hp('3%'),
                height: Platform.OS === 'ios' ? hp('6.5%') : hp('8%'),
                borderRadius: 30,
                borderWidth: 1,
                borderColor: '#3498DB',
                alignSelf: 'center',
                width: Dimensions.get('window').width - 30,
              }}>
              <View style={{ flex: 0.2, alignItems: 'center' }}>
                <IconPassword source={this.state.IconPassword} />
              </View>
              <TextInput
                style={{ flex: 0.8, fontSize: 22, color: '#3498DB' }}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Password"
                placeholderTextColor="#3C4560"
                onChangeText={(password) => this.setState({ password })}
                onFocus={this.focusPassword}
                value={this.state.password}
                secureTextEntry
                opacity={0.5}
              />
            </View>
            <View style={[styles.forgotPassword]}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('ForgotPassword')
                }>
                <Text style={[styles.forgotPasswordText]}>
                  Forgot Password ?
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: Platform.OS === 'ios' ? hp('5%') : hp('3%'),
                height: 50,
                width: Dimensions.get('window').width,
              }}>
              <TouchableOpacity onPress={() => this.onSignIn()}>
                <View
                  style={{
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#3498DB',
                    height: 50,
                    borderRadius: 25,
                    borderWidth: 1,
                    borderColor: '#3498DB',
                    width: Dimensions.get('window').width - 250,
                    shadowColor: '#3498DB',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 1,
                  }}>
                  <Text
                    style={{ color: '#fff', fontSize: 22, fontWeight: 'bold' }}>
                    LOG IN
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            {Platform.OS === 'android' ? (
              <View
                style={{
                  alignItems: 'center',
                  paddingLeft: 20,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  bottom: 2,
                  marginTop: hp('1%'),
                }}>
                <Text style={{ color: '#121212', fontSize: 16 }}>
                  Don't have an account?{' '}
                </Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('SignUp')}>
                  <Text
                    style={{ color: '#3498DB', fontSize: 16, fontWeight: '700' }}>
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </SafeAreaView>
        </KeyboardAwareScrollView>
        <Success isActive={this.state.isSuccessful} />
        <Loading isActive={this.state.isLoading} />
      </View>
    );
  }
}
export default connect(null, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  forgotPassword: {
    fontWeight: '600',
    color: '#3498DB',
    paddingTop: hp('1%'),
    alignItems: 'flex-end',
    paddingRight: hp('2.7%'),
  },
  forgotPasswordText: {
    fontWeight: '600',
    color: '#3498DB',
    fontSize: hp('1.8%'),
  },
});
const IconEmail = styled.Image`
  width: 30px;
  height: 20px;
`;
const IconPassword = styled.Image`
  width: 22px;
  height: 32px;
`;
