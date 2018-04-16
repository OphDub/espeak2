import React from 'react';
import { shallow, configure } from 'enzyme';
import Settings from '../components/Settings/Settings';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
configure({ adapter: new Adapter() });

describe('SETTINGS', () => {
  it('renders correctly', () => {
    const user = {
      username: 'pophus',
      email: 'pophus@notpophanda.com',
      points: 0,
      stack_id: 1,
      firebase_id: 12345
    };
    const mockScreenProps = {
      user
    };
    const wrap = renderer.create(<Settings screenProps={mockScreenProps}/>).toJSON();

    expect(wrap).toMatchSnapshot();
  });
});