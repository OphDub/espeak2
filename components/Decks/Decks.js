import React, { Component } from 'react';
import {
  Button,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

type Props = {};
export default class Decks extends Component<Props> {
  static navigationOptions = {
    title: 'Decks',
  };

  constructor() {
    super()
    this.state={
      decks: []
    }
  }

  async componentDidMount() {
    const promise = await fetch('https://espeak-be.herokuapp.com/api/v1/stack')
    const decks = await promise.json();
    this.setState({decks})
  }

  navigateToCards(deck) {
    this.props.navigation.navigate('WordCards', deck)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.deckList}>
          {this.state.decks.map( deck => {
            return (
              <TouchableOpacity 
                onPress={() => this.navigateToCards(deck)}
                value={deck.id}
                style={styles.deck} >
                <Text style={styles.deckText}>
                  {deck.category}
                </Text>             
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
    )
  }
}

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
  deckText: {
    fontSize: 20,
    color: "white",
    textAlign: 'center',
    margin: 10,
  },
});

