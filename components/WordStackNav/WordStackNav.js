import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import PropTypes from 'prop-types';
import Decks from '../Decks/Decks';
import WordCards from '../WordCards/WordCards';

const routeConfig = {
  Decks: {
    screen: Decks
  },
  WordCards: {
    screen: WordCards
  }
};
const RootNav = StackNavigator(routeConfig);

export default class WordStackNav extends Component {
  render() {
    const {
      handlePoints,
      handleHintPoints,
      userPoints,
      user,
      decks,
      updateUser
    } = this.props.screenProps;

    return (
      <RootNav screenProps={{
        handlePoints,
        handleHintPoints,
        userPoints,
        user,
        decks,
        updateUser
      }}/>
    );
  }
}

WordStackNav.propTypes = {
  screenProps: PropTypes.object
};