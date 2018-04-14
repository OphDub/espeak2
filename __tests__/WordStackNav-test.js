import React from 'react';
import { shallow, configure } from 'enzyme';
import WordStackNav from '../components/WordStackNav/WordStackNav';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
configure({ adapter: new Adapter() });

describe('Card', () => {

  it('renders correctly', () => {
    const mockProps = {handlePoints: jest.fn(), userPoints: 0, updateUserPoints: jest.fn()}
    const wrap = renderer.create(<WordStackNav screenProps={mockProps} />).toJSON();
    expect(wrap).toMatchSnapshot();
  })

})