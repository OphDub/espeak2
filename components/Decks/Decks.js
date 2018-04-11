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
        <FlatList
          data={this.state.decks}
          renderItem={({ item }) => (
              <TouchableOpacity 
                onPress={() => this.navigateToCards(item)}
                value={item.id}
                style={styles.deck} >
                <Text style={styles.deckText}>
                  {item.category}
                </Text>             
              </TouchableOpacity>
            )
          }
          keyExtractor={item => item.category}
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
  },
  deckCont: {
    width: 150,
    backgroundColor: 'magenta',
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
