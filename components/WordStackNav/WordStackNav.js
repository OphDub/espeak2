import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import Decks from '../Decks/Decks';
import WordCards from '../WordCards/WordCards';

const routeConfig = {
  Decks: {
    screen: Decks
  },
  WordCards: {
    screen: WordCards
  }
}

const RootNav = StackNavigator(routeConfig);

type Props = {};
export default class WordStackNav extends Component<Props> {
  render() {
    return (
      <RootNav />
    )
  }
}