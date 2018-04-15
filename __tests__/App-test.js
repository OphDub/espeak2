import React from 'react';
import { shallow, configure } from 'enzyme';
import App from '../components/App/App';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import firebase from 'react-native-firebase'

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

  it('should have methods', () => {
    const wrapper = renderer.create(<App />);
    const inst = wrapper.getInstance()
    console.log(inst);
  })

})