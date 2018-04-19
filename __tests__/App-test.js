import React from 'react';
import { configure } from 'enzyme';
import App from '../components/App/App';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import firebase from 'react-native-firebase'
import { verbAndParse } from '../helper';
configure({ adapter: new Adapter() });

describe('App', () => {
  it('renders correctly', () => {
    const wrapper = renderer.create(<App />).toJSON();

    expect(wrapper).toMatchSnapshot();
  })

  it('should have default state', () => {
    const wrapper = renderer.create(<App />);
    const inst = wrapper.getInstance();

    expect(inst.state).toEqual({ "alertMsg": "", "decks": [], "loading": false, "showAlert": false, "user": null })
  })

  describe('App methods', () => {

    it('the showAlert function should toggle the state of showAlert', () => {
      const wrapper = renderer.create(<App />);
      const inst = wrapper.getInstance();

      expect(inst.state.showAlert).toEqual(false);

      inst.showAlert();

      expect(inst.state.showAlert).toEqual(true);
    })

    it('the hideAlert function should toggle the state off', () => {
      const wrapper = renderer.create(<App />);
      const inst = wrapper.getInstance();

      inst.setState({showAlert: true});

      expect(inst.state.showAlert).toEqual(true);

      inst.hideAlert();

      expect(inst.state.showAlert).toEqual(false);
    })

    it('the handlePoints function should add ten points to the user', () => {
      const wrapper = renderer.create(<App />);
      const inst = wrapper.getInstance();
      const user = {
        username: 'pophus', 
        email: 'pophus@notpophanda.com', 
        points: 0, 
        stack_id: 1, 
        firebase_id: 12345
      };

      inst.setState({ user });

      expect(inst.state.user.points).toEqual(0);

      inst.handlePoints();

      expect(inst.state.user.points).toEqual(10);
    })

    it('the handleHintPoints function should deduct 5 points from the user', () => {
      const wrapper = renderer.create(<App />);
      const instance = wrapper.getInstance();
      const user = {
        username: 'ophanda', 
        email: 'ophanda@betterthanpophus.com', 
        points: 10, 
        stack_id: 1, 
        firebase_id: 12345
      };

      instance.setState({ user });

      expect(instance.state.user.points).toEqual(10);

      instance.handleHintPoints();

      expect(instance.state.user.points).toEqual(5);
    })
  
    it('the handleLogin function should set the loading state to true and call beLogin and update the state', async () => {
      const user = {
        username: 'pophus',
        email: 'pophus@notpophanda.com',
        points: 0,
        stack_id: 6,
        firebase_id: 12345
      };
      global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 200,
        json: () => Promise.resolve([user])
      }))
      const wrapper = renderer.create(<App />);
      const inst = wrapper.getInstance();

      await inst.handleLogin('pophus', 'password');

      expect(inst.state.loading).toEqual(false);
      expect(inst.state.user).toEqual({ "email": "pophus@notpophanda.com", "firebase_id": 12345, "points": 0, "stack_id": 6, "username": "pophus" })
    })

    it('beLogin call fetch and update the user in state', async () => {
      const user = {
        username: 'pophus',
        email: 'pophus@notpophanda.com',
        points: 0,
        stack_id: 1,
        firebase_id: 12345
      };
      global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 200,
        json: () => Promise.resolve([user])
      }));
      const wrapper = renderer.create(<App />);
      const inst = wrapper.getInstance();

      expect(inst.state.user).toEqual(null);
      await inst.beLogin(2);

      expect(inst.state.user).toEqual(user)
    })

    it('handleSignOut should set the user to null', () => {
      const wrapper = renderer.create(<App />);
      const inst = wrapper.getInstance();
      const user = {
        username: 'pophus',
        email: 'pophus@notpophanda.com',
        points: 0,
        stack_id: 1,
        firebase_id: 12345
      };

      inst.setState({user});

      expect(inst.state.user).toBeDefined();

      inst.handleSignOut();

      expect(inst.state.user).toEqual(null);
    })

    it.only('handleRegistration should call beRegistration and update states user to the newly created user', async () => {
      global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 200,
        json: () =>  Promise.resolve({user: 'pophus' } )
      }))
      const wrapper = renderer.create(<App />);
      const inst = wrapper.getInstance();

      await inst.handleRegistration({email: 'pophus@notpophanda.com', userName: 'pophus long', password: 'password', uid: 54321});

      expect(inst.state.user).toEqual({"email": "pophus@notpophanda.com", "firebase_id": 54321, "name": "pophus long", "points": 0, "stack_id": 6 })
    })
  })

})