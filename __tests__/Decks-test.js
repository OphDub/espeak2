import React from 'react';
import { shallow, configure } from 'enzyme';
import Decks from '../components/Decks/Decks';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
configure({ adapter: new Adapter() });

it('renders correctly', () => {
  const word = { english: 'hi', spanish: 'hola', hint: 'o-la' };
  const wrap = renderer.create(<Decks />).toJSON();
  expect(wrap).toMatchSnapshot();
})