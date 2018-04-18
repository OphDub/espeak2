import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Register from '../Register/Register';
import PropTypes from 'prop-types';
const logo = 'https://i.imgur.com/ana1fGy.png';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      toggleRegister: false
    };
  }

  renderLogin = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.logoText}>
          eSpeak
        </Text>
        <Image
          style={styles.logo}
          source={{ uri: logo }}/>
        <TextInput
          style={styles.input}
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
          placeholder="email"/>
        <TextInput
          style={styles.input}
          value={this.state.password}
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
          placeholder="password"/>
        <TouchableOpacity
          onPress={() => this.props.handleLogin(this.state.email, this.state.password)}
          style={styles.loginBtn}>
          <Text style={styles.loginBtnText}>
            LOGIN
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.toggleRegistration()}
          style={styles.registerBtn}>
          <Text>
            New? Register here
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderRegister = () => {
    return (
      <Register
        handleRegistration={this.props.handleRegistration}
        toggleRegistration={this.toggleRegistration}
        beRegistration={this.props.beRegistration}/>
    );
  }

  renderView = () => {
    const { toggleRegister } = this.state;
    return toggleRegister ? this.renderRegister() : this.renderLogin();
  }

  toggleRegistration = () => {
    const { toggleRegister } = this.state;

    if(!toggleRegister) {
      this.setState({ toggleRegister: true });
    } else {
      this.setState({ toggleRegister: false });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        { this.renderView() }
      </View>
    );
  }
}

Login.propTypes = {
  handleRegistration: PropTypes.func,
  handleLogin: PropTypes.func,
  beRegistration: PropTypes.func
};

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    margin: 10,
  },
  logoText: {
    fontSize: 20
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  input: {
    backgroundColor: '#CFCCD0',
    margin: 10,
    paddingVertical: 10,
    paddingHorizontal: 8,
    padding: 10,
    borderRadius: 8,
    width: 200,
  },
  loginBtn: {
    display: 'flex',
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3AAFB9',
    paddingVertical: 10,
    borderRadius: 8,
    margin: 10,
    shadowColor: '#979797',
    shadowOpacity: 0.7,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
  },
  loginBtnText: {
    color: '#FFFFFF'
  },
  registerBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    width: 200,
    height: 25,
  }
});