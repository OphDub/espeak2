import React from 'react';
import { configure } from 'enzyme';
import WordStackNav from '../components/WordStackNav/WordStackNav';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import decks from '../mockData/decks';
configure({ adapter: new Adapter() });

describe('WORD STACK NAV', () => {
  it('renders correctly', () => {
    const user = {
      username: 'opa',
      email: 'opa@startup.com',
      points: 0,
      stack_id: 1,
      firebase_id: 12345
    };
    const mockProps = {
      handlePoints: jest.fn(),
      user,
      updateUserPoints: jest.fn(),
      decks,
    }
    const wrap = renderer.create(<WordStackNav screenProps={mockProps} />).toJSON();
    expect(wrap).toMatchSnapshot();
  });
});