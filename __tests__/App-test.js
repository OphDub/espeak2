import React from 'react';
import { shallow, configure } from 'enzyme';
import App from '../components/App/App';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import firebase from 'react-native-firebase'
import { verbAndParse } from '../helper';
configure({ adapter: new Adapter() });

// jest.mock('../components/App/App', () => {
//   const firebasemock = require('firebase-mock');
//   const mockauth = new firebasemock.MockFirebase();
//   const mocksdk = new firebasemock.MockFirebaseSdk(path => {
//     return path ? mockdatabase.child(path) : mockdatabase;
//   }, () => {
//     return mockauth;
//   });
//   const firebaseApp = mocksdk.initializeApp(); // can take a path arg to database url
//   return {
//     isMock: true,
//     db: firebaseApp.database()
//   }
// });
describe('App', () => {

  it('renders correctly', () => {
    const wrapper = renderer.create(<App />).toJSON();
    expect(wrapper).toMatchSnapshot();
  })

  it('should have default state', () => {
    const wrapper = renderer.create(<App />);
    const inst = wrapper.getInstance();
    expect(inst.state).toEqual({user: null, loading: false, showAlert: false, alertMsg: ''})
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

    it('updateUserPoints should call verbAndParse and add the users points to the backend', () => {
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
      inst.updateUserPoints();
     
      //expect(verbAndParse).toHaveBeenCalled();
    })
  
    it('the handleLogin function should set the loading state to true and call beLogin and update the state', async () => {
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

      inst.handleLogin();
      expect(inst.state.loading).toEqual(true);
      //await expect(inst.beLogin).toHaveBeenCalled();
    })

    it('beLogin function should do somethng', () => {

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

    it('handleRegestration should do some things', async () => {
      global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 200,
        json: () =>  Promise.resolve({user: 'pophus' } )
      }))
      
      const wrapper = renderer.create(<App />);
      const inst = wrapper.getInstance();
      await inst.handleRegistration({email: 'pophus@notpophanda.com', userName: 'pophus long', password: 'password', uid: 54321});

      await expect(inst.state.user).toEqual({"email": "pophus@notpophanda.com", "firebase_id": 54321, "name": "pophus long", "points": 0, "stack_id": 1 })
    })
  })

})