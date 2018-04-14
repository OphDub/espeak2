import React from 'react';
import { shallow, configure } from 'enzyme';
import Register from '../components/Register/Register';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
configure({ adapter: new Adapter() });

describe('REGISTER', () => {
  it('renders correctly', () => {
    const wrapper = renderer.create(<Register />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleRegistration when validateRegistration is called', () => {
    const mockFn = jest.fn();
    const wrapper = renderer.create(<Register handleRegistration={mockFn} />);
    const instance = wrapper.getInstance();

    instance.validateRegistration();

  });

  it('should change the alertMsg in state if email and userName are empty strings', () => {
    const wrapper = renderer.create(<Register />);
    const instance = wrapper.getInstance();
    const alertMsg = `Please provide a email and username.`;

    instance.validateRegistration();

    expect(instance.state.alertMsg).toEqual(alertMsg);
  });

  it('should change the alertMsg in state if password and confirmPassword are empty strings', () => {
    const wrapper = renderer.create(<Register />);
    const instance = wrapper.getInstance();
    alertMsg = `Please add a password.`;

    instance.validateRegistration();

    expect(instance.state.alertMsg).toEqual(alertMsg);
  });

  it('should change the alertMsg in state if password and confirmPassword do not match', () => {
    const wrapper = renderer.create(<Register />);
    const instance = wrapper.getInstance();

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