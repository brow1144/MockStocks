import React from 'react';
import {shallow} from 'enzyme';
import SignIn from './SignIn';
import {Input, Button} from 'mdbreact';
import {Form} from 'reactstrap';
import {fireauth} from '../base'


const ev = {
  preventDefault: jest.fn(),
  target: 
  {
    email: {value: 'good'},
    password: {value: 'good'}
  }
}
jest.mock('../base');

fireauth.signInWithEmailAndPassword = jest.fn((email, pass) => {
  if (email === '') {
    throw new Error('My Error has been thrown'); 
  } else if (pass == '') {
    throw new Error('My Error has been thrown'); 
  }

  return {catch: jest.fn()};
});


describe("Positive sign in", () => {
  test('Calls fireauth with the proper parameters', () => {
    const signIn = shallow(<SignIn />);
    signIn.find(Form).props().onSubmit(ev);
    expect(fireauth.signInWithEmailAndPassword).toHaveBeenCalledWith(ev.target.email.value, ev.target.password.value);
  });
});

describe("Negative sign in", () => {
  beforeAll(() => {
    ev.target.email.value = '';
    ev.target.password.value = 'good';
  });
  test('Calls fireauth with the empty email', () => {
    // const signIn = shallow(<SignIn />);
    // signIn.find(Form).props().onSubmit(ev).catch(e => console.error(e));
    expect(() => fireauth.signInWithEmailAndPassword(ev.target.email.value, ev.target.password.value)).toThrow(Error);
  });
  
  test('Calls fireauth with the empty password', () => {
    ev.target.email.value = 'good';
    ev.target.password.value = '';
    expect(() => fireauth.signInWithEmailAndPassword(ev.target.email.value, ev.target.password.value)).toThrow(Error);
  });
  
});