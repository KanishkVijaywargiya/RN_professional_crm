import React, { Component } from 'react';
import { firebaseConfig } from '../Config/Config.js';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import Splash from '../Components/Splash.js';

import { NavigationContainer } from '@react-navigation/native';

import FirstStack from '../Navigator/FirstStack.js';
import RootStackScreens from '../Navigator/RootStack.js';

const mapDispatchToProps = dispatch => {
    return {
        updateUid: (uid) => dispatch({ type: 'UPDATE_UID', uid }),
        dispatch
    }
}

class App extends Component {
    state = {
        showsplash: true,
        uidData: ''
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                showsplash: false
            })
        }, 2000);
    }

    componentWillMount() {
        this.checkIfLoggedIn()
    }
    checkIfLoggedIn = async () => {
        // const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');

        this.unsubscribe = await firebase.auth().onAuthStateChanged(user => {
            if (user) {
                const uids = AsyncStorage.getItem("uid")
                console.log("UIDS IN WELCOME", uids)
                if (uids !== null) {
                    console.log("UID IS:", uids)
                    this.props.updateUid(uids)
                    this.setState({ uidData: uids })
                }
            } else {

            }
        });
    };
    componentWillUnmount() {
        this.unsubscribe();
    }

    constructor() {
        super();
        this.initializeFirebase();
    }
    initializeFirebase = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
    };

    render() {
        if (this.state.showsplash) {
            return (<Splash />)
        }
        return (
            <NavigationContainer>
                {this.state.uidData ? <FirstStack /> : <RootStackScreens />}
            </NavigationContainer>
        )
    }
}
export default connect(null, mapDispatchToProps)(App)


