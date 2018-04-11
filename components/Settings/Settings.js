import React, { Component } from 'react';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

type Props = {};

export default class Home extends Component <Props> {
  constructor(props) {
    super(props)
    this.state = {}
  }

  logout = () => {
    console.log(this.props)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>SETTINGS</Text>
        <View style={styles.statsDisplay}>
          <Text style={styles.listItems}>Username: {this.props.screenProps.userEmail}</Text>
          <Text style={styles.listItems}>Current Points: </Text>
          <Text style={styles.listItems}>Current Level:</Text>
        </View>
        <TouchableOpacity
          onPress={this.logout}
          style={styles.logoutBtn}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    color: 'purple',
    marginTop: 60,
  },
  statsDisplay: {
    display: 'flex',
    alignSelf: 'center',
    width: 280,
    height: 180,
    paddingTop: 20,
    borderColor: '#1e3888',
    borderWidth: 2,
    borderRadius: 5,
  },
  listItems: {
    fontSize: 25,
    margin: 5,
    color: '#1e3888'
  },
  logoutBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    margin: 10,
    width: 150,
    height: 30,
    borderColor: '#1e3888',
    borderWidth: 2,
    borderRadius: 5,
  },
  buttonText: {
    color: '#1e3888'
  }
});