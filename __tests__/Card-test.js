import React from 'react';
import { shallow, configure } from 'enzyme';
import Card from '../components/Card/Card';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
configure({ adapter: new Adapter() });

describe('Card', () => {

  it('renders correctly', () => {
    const word = { english: 'hi', spanish: 'hola', hint: 'o-la' };
    const wrap = renderer.create(<Card word={word}/>).toJSON();
     
    expect(wrap).toMatchSnapshot();
  })

  describe('Card methods', () => {
    
    it('showAlert should update the state', () => {
      const word = { english: 'hi', spanish: 'hola', hint: 'o-la' };
      const wrapper = renderer.create(<Card word={word} />);
      const inst = wrapper.getInstance();

      expect(inst.state.showAlert).toEqual(false);

      inst.showAlert();

      expect(inst.state.showAlert).toEqual(true);
    })
    
    it('hideAlert should update the state', () => {
      const word = { english: 'hi', spanish: 'hola', hint: 'o-la' };
      const wrapper = renderer.create(<Card word={word} />);
      const inst = wrapper.getInstance();

      inst.setState({showAlert: true});

      expect(inst.state.showAlert).toEqual(true);

      inst.hideAlert();

      expect(inst.state.showAlert).toEqual(false);
    })

    it('showHint should update state', () => {
      const word = { english: 'hi', spanish: 'hola', hint: 'o-la' };
      const wrapper = renderer.create(<Card word={word} />);
      const inst = wrapper.getInstance();

      expect(inst.state.showHint).toEqual(false);

      inst.showHint();

      expect(inst.state.showHint).toEqual(true);
    })

    it('hideHint should update state', () => {
      const word = { english: 'hi', spanish: 'hola', hint: 'o-la' };
      const wrapper = renderer.create(<Card word={word} />);
      const inst = wrapper.getInstance();

      inst.setState({showHint: true});

      expect(inst.state.showHint).toEqual(true);

      inst.hideHint();

      expect(inst.state.showHint).toEqual(false);
    })
    
    it('handleChange should update the answer state', () => {
      const word = { english: 'hi', spanish: 'hola', hint: 'o-la' };
      const wrapper = renderer.create(<Card word={word} />);
      const inst = wrapper.getInstance();

      expect(inst.state.answer).toEqual('');

      inst.handleChange('hello');

      expect(inst.state.answer).toEqual('hello');
    })

    it('handleHideHint should call onHintPoints passed down via props and hideHint', () => {
      const word = { english: 'hi', spanish: 'hola', hint: 'o-la' };
      const mockOnHintPoints = jest.fn();
      const wrapper = renderer.create(<Card word={word} onHintPoints={mockOnHintPoints} />);
      const inst = wrapper.getInstance();
      
      inst.setState({showHint: true});

      expect(inst.state.showHint).toEqual(true);

      inst.handleHideHint();

      expect(inst.state.showHint).toEqual(false);
      expect(mockOnHintPoints).toHaveBeenCalled();
    })

    it('handleSubmit should call the onCorrectAnswer function if answer is correct', () => {
      const word = { english: 'hi', spanish: 'hola', hint: 'o-la' };
      const wrapper = renderer.create(<Card word={word} onCorrectAnswer={jest.fn()} />);
      const inst = wrapper.getInstance();

      inst.setState({answer: 'hola'})
      inst.handleSubmit();

      expect(inst.props.onCorrectAnswer).toHaveBeenCalled();
    })

    it('handleSubmit should set the showAlert state to true if the answer is incorrect', () => {
      const word = { english: 'hi', spanish: 'hola', hint: 'o-la' };
      const wrapper = renderer.create(<Card word={word} onCorrectAnswer={jest.fn()} />);
      const inst = wrapper.getInstance();

      inst.setState({ answer: 'ola' });
      inst.handleSubmit();

      expect(inst.state.showAlert).toEqual(true);
    })

    it('handleSubmit should reset the answer state to empty no matter what', () => {
      const word = { english: 'hi', spanish: 'hola', hint: 'o-la' };
      const wrapper = renderer.create(<Card word={word} onCorrectAnswer={jest.fn()} />);
      const inst = wrapper.getInstance();

      inst.setState({ answer: 'ola'})
      inst.handleSubmit();

      expect(inst.state.answer).toEqual('')
    })
  })
})
