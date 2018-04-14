import React from 'react';
import { shallow, configure } from 'enzyme';
import Settings from '../components/Settings/Settings';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
configure({ adapter: new Adapter() });

it('renders correctly', () => {
  const wrap = renderer.create(<Settings screenProps={{userEmail: 'a@z.com'}}/>).toJSON();
  expect(wrap).toMatchSnapshot();
})