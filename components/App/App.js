import React from 'react';
import { StyleSheet, View } from 'react-native';
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
};

const navConfig = {
  tabBarOptions: {
    labelStyle: {
      fontSize: 22,
    },
    activeTintColor: '#3D3B3E',
    activeBackgroundColor: '#CFAAF1',
    inactiveTintColor: 'white',
    style: {
      backgroundColor: '#B47AEA',
    },
    tabStyle: {
      marginVertical: 10,
    },
  }
};

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
      decks: [],
    };
  }

  componentDidMount = async () => {
    await this.getDecks();
  }

  showAlert = () => {
    this.setState({ showAlert: true });
  }

  hideAlert = () => {
    this.setState({ showAlert: false, loading: false });
  }

  handlePoints = () => {
    const { user } = this.state;

    user.points += 10;

    this.setState({ user });
  }

  handleHintPoints = () => {
    const { user } = this.state;

    user.points -= 5;

    this.setState({ user });
  }

  updateUser = async () => {
    try {
      const stack_id = this.updateUserStack();
      const { points, firebase_id } = this.state.user;
      const url = `https://espeak-be-opa.herokuapp.com/api/v1/users/${firebase_id}`;

      await verbAndParse('PATCH', url, { points, stack_id });
      this.setState({ user: {...this.state.user, stack_id }});
    } catch (error) {
      this.setState({
        showAlert: true,
        alertMsg: error.message
      });
    }
  }

  updateUserStack = () => {
    let { user } = this.state;
    let { stack_id } = user;
    const lastStack = this.state.decks[this.state.decks.length - 1];

    if (stack_id < lastStack.id) {
      stack_id++;
    }

    return stack_id;
  }

  handleLogin = async (email, password) => {
    this.setState({ loading: true });

    try {
      const firebaseInfo = await auth.signInAndRetrieveDataWithEmailAndPassword(email, password);
      await this.beLogin(firebaseInfo.user.uid);
    } catch (error) {
      this.setState({
        showAlert: true,
        alertMsg: error.message,
        loading: false
      });
    }
  }

  getDecks = async () => {
    const url = 'https://espeak-be.herokuapp.com/api/v1/stack';
    const decks = await verbAndParse('GET', url);
    await this.setState({ decks });
  }

  beLogin = async (userId) => {
    try {
      const initialFetch = await fetch(`https://espeak-be-opa.herokuapp.com/api/v1/users/${userId}`);
      const user = await initialFetch.json();
      
      this.setState({ user: user[0], loading: false });
    } catch (error) {
      this.setState({
        showAlert: true,
        alertMsg: 'Invalid user name or password.',
        loading: false
      });
    }
  }

  handleSignOut = () => {
    auth.signOut();
    this.setState({user: null});
  }

  handleRegistration = async (userInfo) => {
    const { email, userName, password } = userInfo;
    this.setState({ loading: true });

    try {
      const user = await auth.createUserWithEmailAndPassword(email, password);

      await this.beRegistration(user, userName);
    } catch (error) {
      this.setState({
        showAlert: true,
        alertMsg: error.message,
        loading: false
      });
    }
  }

  beRegistration = async (userInfo, userName) => {
    try {
      const { email, uid } = userInfo;
      const newUser = {
        name: userName,
        email: email,
        points: '0',
        stack_id: 1,
        firebase_id: uid
      };
      const url = 'https://espeak-be-opa.herokuapp.com/api/v1/users/';

      verbAndParse('POST', url, newUser);
      newUser.points = parseInt(newUser.points);
      this.setState({ user: newUser, loading: false });
    } catch (error) {
      this.setState({
        showAlert: true,
        alertMsg: error.message,
        loading: false
      });
    }
  }

  showCondition = () => {
    return this.state.user ?
      (<RootNav
        screenProps={{
          user: this.state.user,
          handleSignOut: this.handleSignOut,
          userPoints: this.state.user.points,
          handlePoints: this.handlePoints,
          handleHintPoints: this.handleHintPoints,
          updateUser: this.updateUser,
          decks: this.state.decks,
        }} 
      />) 
      :
      (<View style={styles.container}>
        <Login
          handleLogin={this.handleLogin}
          handleRegistration={this.handleRegistration}
          beRegistration={this.beRegistration}/>
        <AwesomeAlert
          show={this.state.showAlert}
          showProgress={false}
          title={'Uh oh! There is a problem!'}
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
        <AwesomeAlert 
          show={this.state.loading}
          showProgress={true}
        />
      </View>);
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
