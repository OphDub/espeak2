import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';

type Props = {};
export default class Register extends Component <Props>{
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      userName: '',
      password: '',
      confirmPassword: '',
      showAlert: false,
      alertMsg: '',
    }
  }

  validateRegistration = () => {
    const {
      email,
      userName,
      password,
      confirmPassword,
    } = this.state;
    const user = { email, userName, password };

    let alertMsg;

    if (email === '' || userName === '') {
      alertMsg = `Please provide a email and username.`;
      return this.setState({ showAlert: true, alertMsg });
    } else if (password === '' || confirmPassword === '') {
      alertMsg = `Please add a password.`;
      return this.setState({ showAlert: true, alertMsg });
    } else if (password !== confirmPassword) {
      alertMsg = `Please make sure your passwords match.`;
      return this.setState({ showAlert: true, alertMsg });
    }

    this.props.handleRegistration(user);
    this.props.beRegistration(user);
  }

  showAlert = () => {
    this.setState({ showAlert: true });
  }

  hideAlert = () => {
    this.setState({ showAlert: false });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Sign Up for an Account</Text>
        <TextInput
          style={styles.input}
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
          placeholder="email"/>
        <TextInput
          style={styles.input}
          value={this.state.userName}
          onChangeText={(userName) => this.setState({ userName })}
          placeholder="your name"/>
        <TextInput
          style={styles.input}
          value={this.state.password}
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
          placeholder="password"/>
        <TextInput
          style={styles.input}
          value={this.state.confirmPassword}
          secureTextEntry={true}
          onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
          placeholder="confirm password"/>
        <TouchableOpacity
          style={styles.registerBtn}
          onPress={() => this.validateRegistration() }>
          <Text>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.toggleRegistration() }
          style={styles.loginBtn}>
            <Text>Have account? Login</Text>
        </TouchableOpacity>
        <AwesomeAlert
          show={this.state.showAlert}
          showProgress={false}
          title={`Uh oh! There's a problem with your registration!`}
          message={this.state.alertMsg}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor="#3AAFb9"
          onConfirmPressed={() => {
            this.hideAlert();
          }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  input: {
    backgroundColor: 'grey',
    margin: 10,
    width: 150,
    height: 25,
  },
  registerBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'teal',
    margin: 10,
    width: 150,
    height: 25,
  },
  loginBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    width: 150,
    height: 25,
  }
});