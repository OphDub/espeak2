import React from 'react';
import { configure } from 'enzyme';
import WordCards from '../components/WordCards/WordCards';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import words from '../mockData/words';
configure({ adapter: new Adapter() });

describe('WordCards', () => {
  let mockNavigation;
  let mockScreenProps;
  let mockDeck;
  let wrapper;

  beforeAll(() => {
    mockDeck = [ words[0], words[1], words[2], words[3], words[4] ];
  })
  
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      status: 200,
      json: () => Promise.resolve(mockDeck)
    }));
    mockNavigation = {
      state: {
        params: {
          id: 1,
          category: 'Basics 1',
        },
      },
    };

    mockScreenProps = {
      handlePoints: jest.fn(),
      updateUser: jest.fn(),
      userPoints: 50,
    };

    wrapper = renderer.create(<WordCards navigation={mockNavigation} screenProps={mockScreenProps} />);

  }) 

  it('renders correctly', () => {
    const wrap = wrapper.toJSON(); 
    expect(wrap).toMatchSnapshot();
  })

  it('should call fetch on componentDidMount', () => {
    expect(global.fetch).toHaveBeenCalled(); 
  })

    
  it('should set state on componentDidMount', async () => {
    const instance = await wrapper.getInstance();
    const updatedMockDeck = mockDeck.map((word, index) => {
      if (index === 0) {
        return {...word, isCurrent: true, isCompleted: false};
      }

      return {...word, isCurrent: false, isCompleted: false};
    })

    await instance.componentDidMount();

    expect(instance.state.currentCardId).toEqual(0);
    expect(instance.state.stack).toEqual(mockNavigation.state.params);
    expect(instance.state.words).toEqual(updatedMockDeck);
  })

  describe('getDeck', () => {
    it('should return an array of cards if status code ok', () => {
      const instance = wrapper.getInstance();
      const response = instance.getDeck(1);
      const expected = mockDeck;

      expect(response).resolves.toEqual(expected);
    });

    it('should return an error an error if fetch fails', () => {
      global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 500
      }));
      const wrapper =  renderer.create(<WordCards navigation={mockNavigation} screenProps={mockScreenProps} />);
      const expected = Error('We could not find your deck!');
      const response = wrapper.getInstance().getDeck(1);

      expect(response).rejects.toEqual(expected);
    });
  })

  describe('handleCardLoad', () => {
    let instance;

    beforeEach(() => {
      instance = wrapper.getInstance();
    })

    it('should return text saying "No Cards to Render" if no words are stored in state', () => {
      instance.setState({ words: [] });

      expect(wrapper.toJSON()).toMatchSnapshot();
    })

    it('should return end screen if there is no current card left in deck', () => {
      instance.setState({ words: [{
        english: 'hi',
        spanish: 'hola',
        hint: 'oh-la',
        stack_id: 1,
        isCurrent: false,
        isCompleted: false
      }]});

      expect(wrapper.toJSON()).toMatchSnapshot();
    })

    it('should return current card if there are cards in the deck', () => {
      instance.setState({ words: [{
        english: 'hi',
        spanish: 'hola',
        hint: 'oh-la',
        stack_id: 1,
        isCurrent: true,
        isCompleted: false
      }]});

      expect(wrapper.toJSON()).toMatchSnapshot();
    });
  })
  
  describe('handleCorrectAnswer', () => {
    let ogWords;
    let instance;
    let word;

    beforeAll(() => {
      ogWords = [
        {
          english: 'hi',
          spanish: 'hola',
          hint: 'oh-la',
          stack_id: 1,
          isCurrent: true,
          isCompleted: false
        }, {
          english: 'bye',
          spanish: 'adios',
          hint: 'ah-dee-os',
          stack_id: 1,
          isCurrent: false,
          isCompleted: false
        }
      ];
      word = ogWords[0];
    })

    beforeEach(() => {
      instance = wrapper.getInstance();
      instance.setState({ words: ogWords });
    })

    it('should call handlePoints when handleCorrectAnswer is called', () => {
      instance.handleCorrectAnswer(word);

      expect(mockScreenProps.handlePoints).toHaveBeenCalled();
    })

    it('should call updateUserPoints if there are no current cards left in deck', () => {
      instance.handleCorrectAnswer(ogWords[1]);

      expect(mockScreenProps.updateUser).toHaveBeenCalled();
    })

    it('should update state with new words and currentCardId', () => {
      const expected = [
        {
          english: 'hi',
          spanish: 'hola',
          hint: 'oh-la',
          stack_id: 1,
          isCurrent: false,
          isCompleted: false
        }, {
          english: 'bye',
          spanish: 'adios',
          hint: 'ah-dee-os',
          stack_id: 1,
          isCurrent: true,
          isCompleted: false
        }
      ]; 

      expect(instance.state.words).toEqual(ogWords);
      
      instance.handleCorrectAnswer(word);

      expect(instance.state.words).toEqual(expected);
    })
  })
})

