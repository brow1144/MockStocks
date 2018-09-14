import React from 'react';
import {shallow} from 'enzyme';
import SignIn from './SignIn';

test('Fill email with brow1144@purdue.edu', () => {
  // Render a checkbox with label in the document
  const signIn = shallow(<SignIn />)

  signIn.find('#email').value = "brow1144@purdue.edu"



});