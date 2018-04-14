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

  it('returns an array of cards', () => {
    
  })
    
  it('should set state on componentDidMount', async () => {
    const instance = await wrapper.getInstance();
    await console.log(instance.state);

    expect(instance.state.currentCardId).toEqual(0);
    expect(instance.state.stack).toEqual(mockNavigation.state.params);
    await expect(instance.state.words).resolves.toBe(mockDeck);
  })
})

