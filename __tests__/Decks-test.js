import React from 'react';
import { configure } from 'enzyme';
import Decks from '../components/Decks/Decks';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import decks from '../mockData/decks';
configure({ adapter: new Adapter() });

describe('DECKS', () => {
  it('renders correctly', () => {
    const user = {
      username: 'pophus',
      email: 'pophus@notpophanda.com',
      points: 0,
      stack_id: 1,
      firebase_id: 12345
    };
    const mockScreenProps = {
      decks,
      user,
    };

    const wrap = renderer.create(<Decks screenProps={mockScreenProps}/>).toJSON();
    expect(wrap).toMatchSnapshot();
  });
});