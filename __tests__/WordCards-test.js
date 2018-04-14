import React from 'react';
import { shallow, configure } from 'enzyme';
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
      updateUserPoints: jest.fn(),
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

    it('should console error an error if fetch fails', () => {
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
    it('should return text saying "No Cards to Render" if no words are stored in state', () => {
      const instance = wrapper.getInstance();

      instance.setState({ words: [] });

      expect(wrapper.toJSON()).toMatchSnapshot();
    })

    it('should return end screen if there is no current card left in deck', () => {
      const instance = wrapper.getInstance();

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
      const instance = wrapper.getInstance();

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
    
  })
})

