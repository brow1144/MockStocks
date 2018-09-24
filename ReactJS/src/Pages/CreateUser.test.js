import React from 'react';
import {shallow} from 'enzyme';
import CreateUser from './CreateUser';
import {Input, Button} from 'mdbreact';
import {Form} from 'reactstrap';
import {fireauth} from '../base'


const ev = {
  preventDefault: jest.fn(),
  target: 
  {
    username: {value: 'jest'},
    email: {value: 'jest@purdue.edu'},
    password: {value: '12345678'},
    confirmPassword: {value: '12345678'}
  }
}
jest.mock('../base');

// describe("Positive create user", () => {
//   test('Calls fireauth with the proper parameters', () => {
//     const createUser = shallow(<CreateUser />);
//     createUser.find(Form).props().onSubmit(ev).then(e => console.error(e));
//     expect(fireauth.createUserWithEmailAndPassword).toHaveBeenCalledWith(ev.target.email.value, ev.target.password.value);
//   });
// });

describe("Negative create user", () => {
  beforeAll(() => {
    ev.target.username.value = ''
    ev.target.email.value = 'brow1144@purdue.edu';
    ev.target.password.value = '12345678';
    ev.target.confirmPassword.value = '12345678'
  });

  test('Calls fireauth with the no username', () => {
    ev.target.username.value = ''
    ev.target.email.value = 'brow1144@purdue.edu';
    ev.target.password.value = '12345678';
    ev.target.confirmPassword.value = '12345678'

    const createUser = shallow(<CreateUser />);
    createUser.find(Form).props().onSubmit(ev)
    expect(createUser.state().message).toBe('Please fill out the entire form!');
  });

  test('Calls fireauth with the no email', () => {
    ev.target.username.value = 'brow1144'
    ev.target.email.value = '';
    ev.target.password.value = '12345678';
    ev.target.confirmPassword.value = '12345678'

    const createUser = shallow(<CreateUser />);
    createUser.find(Form).props().onSubmit(ev)
    expect(createUser.state().message).toBe('Please fill out the entire form!');
  });

  test('Calls fireauth with an invalid email', () => {
    ev.target.username.value = 'brow1144'
    ev.target.email.value = 'bro1';
    ev.target.password.value = '12345678';
    ev.target.confirmPassword.value = '12345678'

    const createUser = shallow(<CreateUser />);
    createUser.find(Form).props().onSubmit(ev)
    expect(createUser.state().message).toBe('Please enter a real email address');
  });
  
  test('Calls fireauth with a password', () => {
    ev.target.username.value = 'brow1144'
    ev.target.email.value = 'bro1144@purdue.edu';
    ev.target.password.value = '';
    ev.target.confirmPassword.value = '12345678'

    const createUser = shallow(<CreateUser />);
    createUser.find(Form).props().onSubmit(ev)
    expect(createUser.state().message).toBe('Please fill out the entire form!');
  });
  
  test('Calls fireauth with a password', () => {
    ev.target.username.value = 'brow1144'
    ev.target.email.value = 'bro1144@purdue.edu';
    ev.target.password.value = '1234';
    ev.target.confirmPassword.value = '1234'

    const createUser = shallow(<CreateUser />);
    createUser.find(Form).props().onSubmit(ev)
    expect(createUser.state().message).toBe('Password must be 8 characters or longer');
  });

  test('Calls fireauth with not matching passwords', () => {
    ev.target.username.value = 'brow1144'
    ev.target.email.value = 'bro1144@purdue.edu';
    ev.target.password.value = '87654321';
    ev.target.confirmPassword.value = '12345678'

    const createUser = shallow(<CreateUser />);
    createUser.find(Form).props().onSubmit(ev)
    expect(createUser.state().message).toBe('Passwords Don\'t Match!');
  });
  
  // test('Calls fireauth with a known email', () => {
  //   ev.target.username.value = 'brow1144'
  //   ev.target.email.value = 'bro1144@purdue.edu';
  //   ev.target.password.value = '87654321';
  //   ev.target.confirmPassword.value = '12345678'

  //   const createUser = shallow(<CreateUser />);
  //   createUser.find(Form).props().onSubmit(ev)
  //   expect(createUser.state().message).toBe('Passwords Don\'t Match!');
  // });

});