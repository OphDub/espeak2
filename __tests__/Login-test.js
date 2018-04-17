import React from 'react';
import { configure } from 'enzyme';
import Login from '../components/Login/Login';
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

    it('should render different jsx based on toggleRegistration in state', () => {
      const wrapper = renderer.create(<Login />);
      const instance = wrapper.getInstance();

      expect(wrapper).toMatchSnapshot();

      instance.setState({ toggleRegister: true });

      expect(wrapper).toMatchSnapshot();
    });
  });
});