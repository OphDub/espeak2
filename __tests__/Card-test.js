import React from 'react';
import { shallow, configure } from 'enzyme';
import Card from '../components/Card/Card';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
configure({ adapter: new Adapter() });

it('renders correctly', () => {
  const word = { english: 'hi', spanish: 'hola', hint: 'o-la' };
  const wrap = renderer.create(<Card word={word}/>).toJSON();
  expect(wrap).toMatchSnapshot();
})