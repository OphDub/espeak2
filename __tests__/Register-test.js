import React from 'react';
import { configure } from 'enzyme';
import Register from '../components/Register/Register';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
configure({ adapter: new Adapter() });

describe('REGISTER', () => {
  it('renders correctly', () => {
    const wrapper = renderer.create(<Register />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  describe('REGISTER METHODS', () => {
    it('should change the alertMsg in state if email and userName are empty strings', () => {
      const wrapper = renderer.create(<Register />);
      const instance = wrapper.getInstance();
      const alertMsg = `Please provide a email and username.`;

      instance.validateRegistration();

      expect(instance.state.showAlert).toEqual(true);
      expect(instance.state.alertMsg).toEqual(alertMsg);
    });

    it('should change the alertMsg in state if password and confirmPassword are empty strings', () => {
      const wrapper = renderer.create(<Register />);
      const instance = wrapper.getInstance();
      alertMsg = `Please add a password.`;

      instance.setState({ email: 'amanda@pophanda.com', userName: 'pandas_rule' });
      instance.validateRegistration();

      expect(instance.state.alertMsg).toEqual(alertMsg);
    });

    it('should change the alertMsg in state if password and confirmPassword do not match', () => {
      const wrapper = renderer.create(<Register />);
      const instance = wrapper.getInstance();
      alertMsg = `Please make sure your passwords match.`;

      instance.setState({
        email: 'amanda@pophanda.com',
        userName: 'pandas_rule',
        password: 'panda1',
        confirmPassword: 'panda'
      });
      instance.validateRegistration();

      expect(instance.state.alertMsg).toEqual(alertMsg);
    });

    it('should call handleRegistration when validateRegistration is called', () => {
      const mockFn = jest.fn();
      const mockUser = {
        email: 'amanda@pophanda.com',
        userName: 'pandas_rule',
        password: 'panda1',
      };
      const wrapper = renderer.create(<Register handleRegistration={mockFn} />);
      const instance = wrapper.getInstance();

      instance.setState({
        email: 'amanda@pophanda.com',
        userName: 'pandas_rule',
        password: 'panda1',
        confirmPassword: 'panda1'
      });
      instance.validateRegistration();

      expect(mockFn).toHaveBeenCalledWith(mockUser);
    });

    it('should change showAlert in state to false if hideAlert is called', () => {
      const wrapper = renderer.create(<Register />);
      const instance = wrapper.getInstance();

      expect(instance.state.showAlert).toBe(false);

      instance.setState({ hideAlert: true });
      instance.hideAlert();

      expect(instance.state.showAlert).toBe(false);
    });
  });

});