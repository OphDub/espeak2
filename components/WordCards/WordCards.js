import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import PropTypes from 'prop-types';
import Card from '../Card/Card';
import Progress from '../Progress/Progress';

export default class WordCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stack: this.props.navigation.state.params,
      words: [],
      currentCardId: 0,
      isFinished: false,
    };
  }
  static navigationOptions = {
    title: 'translations'
  }

  componentDidMount = async () => {
    const { id } = this.state.stack;
    const jsonResponse = await this.getDeck(id);
    const words = jsonResponse.map((word, index) => {
      if (index === 0) {
        return {...word, isCurrent: true, isCompleted: false};
      }

      return {...word, isCurrent: false, isCompleted: false};
    });

    this.setState({ words });
  }

  getDeck = async (deckId) => {
    try {
      const promise = await fetch(`https://espeak-be.herokuapp.com/api/v1/words/${deckId}`);

      if (promise.status > 226) {
        throw new Error('We could not find your deck!');
      } else {
        return await promise.json();
      }
    } catch (error) {
      throw error;
    }
  }

  handleCardLoad = () => {
    if (this.state.words.length === 0) {
      return <Text>No Cards to Render</Text>;
    }

    const currentCard = this.state.words.find(card => card.isCurrent === true);
    const { handleHintPoints } = this.props.screenProps;

    if (!currentCard) {
      return (
        <View style={styles.endMsgCont}>
          <Text style={styles.endMsg}>Great job!</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Decks')}
            style={styles.homeBtn}
          >
            <Text style={styles.homeBtnText}>BACK TO MY DECKS</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return <Card
      word={currentCard}
      onCorrectAnswer={this.handleCorrectAnswer}
      onHintPoints={ handleHintPoints }
    />;
  }

  handleCorrectAnswer = (word) => {
    const wordIndex = this.state.words.indexOf(word);
    let isFinished = wordIndex === this.state.words.length - 1;
    const words = this.state.words.map((word, index) => {
      if (index === wordIndex) {
        return {...word, isCurrent: false};
      } else if (index === (wordIndex + 1)) {
        return {...word, isCurrent: true};
      }

      return word;
    });

    this.props.screenProps.handlePoints();

    if (isFinished) {
      this.props.screenProps.updateUser();
    }

    this.setState({
      words,
      currentCardId: wordIndex + 1
    });
  }

  render() {
    const { userPoints } = this.props.screenProps;

    return (
      <View style={styles.container}>
        <Progress
          stack={this.state.stack}
          userPoints={userPoints}
          currentCardId={this.state.currentCardId}
          wordTotal={this.state.words.length}
        />
        { this.handleCardLoad() }
      </View>
    );
  }
}

WordCards.propTypes = {
  screenProps: PropTypes.object,
  navigation: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  endMsg: {
    color: '#272727',
    fontSize: 20,
    marginBottom: 20,
  },
  endMsgCont: {
    alignItems: 'center',
  },
  homeBtn: {
    backgroundColor: '#3AAFB9',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#979797',
    shadowOpacity: 0.7,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
  },
  homeBtnText: {
    color: '#FFF',
  },
});
