import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView } from 'react-native';
import { TabNavigator } from 'react-navigation';
import AwesomeAlert from 'react-native-awesome-alerts';
import firebase from 'react-native-firebase';

import Login from '../Login/Login';
import Settings from '../Settings/Settings';
import WordStackNav from '../WordStackNav/WordStackNav';
import { verbAndParse } from '../../helper';
import config from '../../fbconfig';

const routeConfig = {
  Decks: {
    screen: WordStackNav
  },
  Settings: {
    screen: Settings
  },
}

const navConfig = {
  tabBarOptions: {
    labelStyle: {
      fontSize: 38,
    }
  }
}

const RootNav = TabNavigator(routeConfig, navConfig);


firebase.initializeApp(config);

const auth = firebase.auth();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: false,
      showAlert: false,
      alertMsg: '',
    };
  }

  showAlert = () => {
    this.setState({ showAlert: true });
  }

  hideAlert = () => {
    this.setState({ showAlert: false });
  }

  handlePoints = () => {
    console.log('user points', this.state.user.points);
  }

  handleLogin = async (email, password) => {
    this.setState({ loading: true });

    try {
      const user = await auth.signInWithEmailAndPassword(email, password);

      await this.beLogin(user.uid);
    } catch (error) {
      this.setState({ showAlert:true, alertMsg:error.message });
    }
  }

  beLogin = async (userId) => {
    try {
      const initialFetch = await fetch(`http://localhost:3000/api/v1/users/${userId}`);
      const user = await initialFetch.json();

      this.setState({
        user,
        loading: false
      });
    } catch (error) {
      this.setState({
        showAlert: true,
        alertMsg: `Invalid user name or password.`
      })
    }
  }

  handleRegistration = async (userInfo) => {
    const { email, userName, password } = userInfo;
    this.setState({ loading: true });

    try {
      const user = await auth.createUserWithEmailAndPassword(email, password);
      this.setState({ user: user.email, loading: false });
      console.log('User created', user);
    } catch (error) {
      this.setState({
        showAlert: true,
        alertMsg: error.message
      });
    }
  }

  beRegistration = async (userInfo) => {
    try {
      const { email, userName, password } = userInfo;
      const user = { name: userName, email: email, stack_id: 1 };
      const url = 'https://espeak-be.herokuapp.com/api/v1/users';
      const response = await verbAndParse('POST', url, user);
    } catch (error) {
      console.log(error);
    }
  }

  showCondition = () => {
    if (this.state.user) {
      return <RootNav
                screenProps={{
                  userEmail: this.state.user,
                  handlePoints: this.handlePoints
                }}
              />
    } else {
      return (
        <View style={styles.container}>
          <Login
            handleLogin={this.handleLogin}
            handleRegistration={this.handleRegistration}
            beRegistration={this.beRegistration}/>
          <AwesomeAlert
            show={this.state.showAlert}
            showProgress={false}
            title={`Uh oh! There's a problem!`}
            message={this.state.alertMsg}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={false}
            showConfirmButton={true}
            confirmText="OK"
            confirmButtonColor="#3AAFb9"
            onConfirmPressed={() => {
              this.hideAlert();
            }}/>
        </View>
      )
    }
  }

  render() {
    return (
      this.showCondition()
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
