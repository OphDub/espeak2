import React from 'react';
import { shallow, configure } from 'enzyme';
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
configure({ adapter: new Adapter() });

describe('LOGIN', () => {
  it('renders correctly', () => {
    const wrapper = renderer.create(<Login/>).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  describe('LOGIN METHODS', () => {
    it('toggleRegistration should change toggleRegistration in state', () => {
      const wrapper = renderer.create(<Login/>);
      const instance = wrapper.getInstance();

      instance.toggleRegistration();

      expect(instance.state.toggleRegister).toEqual(true);
    });

    it('renderRegister should return a Register component', () => {
      const mockFn = jest.fn();
      const mockToggleRegistration = jest.fn().mockImplementation(() => {});
      const wrapper = renderer.create(<Login handleRegistration={mockFn} beRegistration={mockFn}/>);
      const instance = wrapper.getInstance();
      expect(instance.renderRegister()).toEqual(<Register handleRegistration={mockFn} beRegistration={mockFn} toggleRegistration={mockToggleRegistration}/>);
    });
  });
});