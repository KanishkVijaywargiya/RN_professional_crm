import React, {Component} from 'react';
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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      IconEmail: require('../Assets/icon-email.png'),
      IconPassword: require('../Assets/icon-password.png'),
    };
  }

  focusEmail = () => {
    this.setState({
      IconEmail: require('../Assets/icon-email-animated.gif'),
      IconPassword: require('../Assets/icon-password.png'),
    });
  };

  onResetPasswordPress = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then(
        () => {
          Alert.alert('Password reset email has been sent.');
          this.props.navigation.goBack();
        },
        () => {
          Alert.alert('Invalid Email Id');
        },
      );
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
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
              <Text style={{fontSize: 30, fontWeight: 'bold'}}>Welcome</Text>
              <Text style={{fontSize: 12, fontWeight: '500', color: '#121212'}}>
                Please type your email id to reset password{' '}
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
              <View style={{flex: 0.2, alignItems: 'center'}}>
                <IconEmail source={this.state.IconEmail} />
              </View>
              <TextInput
                style={{flex: 0.8, fontSize: 22, color: '#3498DB'}}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Email"
                placeholderTextColor="#3C4560"
                keyboardType="email-address"
                onChangeText={(email) => this.setState({email})}
                onFocus={this.focusEmail}
                value={this.state.email}
                opacity={0.5}
              />
            </View>
            <View style={[styles.uploadButton]}>
              <TouchableOpacity onPress={() => this.onResetPasswordPress()}>
                <View style={[styles.textView]}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: Platform.OS === 'ios' ? 22 : 15,
                      fontWeight: 'bold',
                    }}>
                    Reset Password
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  uploadButton: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'ios' ? hp('5%') : hp('3%'),
    height: 50,
    width: Dimensions.get('window').width,
  },
  textView: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3498DB',
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#3498DB',
    width: Dimensions.get('window').width - 200,
    shadowColor: '#3498DB',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
});
const IconEmail = styled.Image`
  width: 30px;
  height: 20px;
`;
