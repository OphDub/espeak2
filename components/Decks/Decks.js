import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import PropTypes from 'prop-types';

const logo = 'https://i.imgur.com/ana1fGy.png';

export default class Decks extends Component {
  static navigationOptions = {
    title: 'Decks',
  };

  navigateToCards(deck) {
    this.props.navigation.navigate('WordCards', deck);
  }

  render() {
    const { decks } = this.props.screenProps;

    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={{ uri: logo }}/>
        <View style={styles.deckList}>
          {decks.map( (deck, index) => {
            const { stack_id }  = this.props.screenProps.user;
            const isActive = deck.id <= stack_id;
            const deckStyle = isActive ? styles.deck : styles.disabled;

            return (
              <TouchableOpacity
                onPress={() => this.navigateToCards(deck)}
                disabled={!isActive}
                value={deck.id}
                style={deckStyle}
                key={index} >
                <Text style={styles.deckText}>
                  {deck.category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }
}

Decks.propTypes = {
  navigation: PropTypes.object,
  screenProps: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 40,
  },
  deckList: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  deck: {
    backgroundColor: '#3AAFB9',
    padding: 5,
    borderRadius: 8,
    margin: 10,
    shadowColor: '#979797',
    shadowOpacity: 0.7,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
  },
  disabled: {
    backgroundColor: '#B7B2B8',
    padding: 5,
    borderRadius: 8,
    margin: 10,
  },
  deckText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    margin: 10,
  },
  logo: {
    width: 100,
    height: 100,
    margin: 10,
    marginVertical: 50,
  },
});

