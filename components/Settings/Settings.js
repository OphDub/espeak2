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
        <Text style={styles.title}>Settings</Text>
        <View style={styles.statsCont}>
          <View style={styles.statsDisplay}>
            <Text style={styles.listItems}>Username: {this.props.screenProps.userEmail}</Text>
            <Text style={styles.listItems}>Current Points: </Text>
            <Text style={styles.listItems}>Current Level:</Text>
          </View>
          <TouchableOpacity
            onPress={this.logout}
            style={styles.logoutBtn}
          >
            <Text style={styles.buttonText}>LOGOUT</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  title: {
    fontSize: 30,
    fontFamily: 'Noteworthy',
    textAlign: 'center',
    color: '#3AAFb9',
    marginBottom: 30,
  },
  statsDisplay: {
    display: 'flex',
    alignSelf: 'center',
    width: 280,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: 'white',
    borderColor: '#1e3888',
    borderWidth: 2,
    borderRadius: 8,
    marginVertical: 20,
    shadowColor: '#979797',
    shadowOpacity: 0.7,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
  },
  listItems: {
    fontSize: 24,
    margin: 5,
    color: '#1e3888'
  },
  logoutBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    margin: 10,
    padding: 10,
    width: 150,
    backgroundColor: '#3AAFB9',
    borderRadius: 8,
    shadowColor: '#979797',
    shadowOpacity: 0.7,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  }
});
