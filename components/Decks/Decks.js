import React, { Component } from 'react';
import {
  Button,
  FlatList,
  Platform,
  StyleSheet,
  Text,
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
            <Text 
              onPress={() => this.navigateToCards(item)}
              value={item.id}
              style={styles.item} >
              {item.category}
            </Text>
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
    backgroundColor: 'purple',
  },
  item: {
    fontSize: 40,
    color: "white",
    textAlign: 'center',
    margin: 10,
  },
});
