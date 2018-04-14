import React from 'react';
import { shallow, configure } from 'enzyme';
import Progress from '../components/Progress/Progress';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
configure({ adapter: new Adapter() });

it('renders correctly', () => {
  const mockProp = {category: 'basics 1'}
  const wrap = renderer.create(<Progress stack={mockProp}/>).toJSON();
  expect(wrap).toMatchSnapshot();
})

it('it renders when a new stack is passed in as props', () => {
  const mockProp = { category: 'basics 1' }
  const mockPropTwo = { category: 'verbs' }
  const wrapper = shallow(
    <Progress stack={mockProp} />
  );
  expect(wrapper).toMatchSnapshot();
  wrapper.setProps({ stack: mockPropTwo });
  expect(wrapper).toMatchSnapshot();
});
