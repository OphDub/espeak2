import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import Register from '../Register/Register';

type Props = {};
export default class Login extends Component <Props> {
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
        <Text>
          Welcome! Sign In:
        </Text>
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
          onPress={(email, password) => this.props.handleLogin(this.state.email, this.state.password)}
          style={styles.loginBtn}>
            <Text>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.toggleRegistration()}
          style={styles.registerBtn}>
            <Text>New? Register here</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderRegister = () => {
    return (
      <Register handleRegistration={this.props.handleRegistration}
                toggleRegistration={this.toggleRegistration}
                beRegistration={this.props.beRegistration}/>
    )
  }

  renderView = () => {
    const { toggleRegister } = this.state;
    return toggleRegister ? this.renderRegister() : this.renderLogin();
  }

  toggleRegistration = () => {
    const { toggleRegister } = this.state;

    if(!toggleRegister) {
      this.setState({ toggleRegister: true })
    } else {
      this.setState({ toggleRegister: false })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        { this.renderView() }
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
    backgroundColor: '#CFCCD0',
    margin: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
    padding: 10,
    borderRadius: 8,
    width: 150,
  },
  loginBtn: {
    display: 'flex',
    width: 150,
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
  registerBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    width: 150,
    height: 25,
  }
});