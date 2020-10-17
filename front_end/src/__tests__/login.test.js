import React from 'react';
import {shallow} from 'enzyme';
import login from '../Components/login';

describe('Login Component', () => {
    it('should render without throwing an error', () => {
        expect(shallow(<login />).find('form.login').exists()).toBe(true) })
})

it('renders a email input', () => {
    expect(shallow(<login />).find('#email').length).toEqual(1)
})
it('renders a password input', () => {
    expect(shallow(<login />).find('#password').length).toEqual(1)
})

describe('Email input', () => {
    it('should respond to change event and change the state of the Login Component', () =>
    {
        const wrapper = shallow(<login />);
        wrapper.find('#email').simulate('change', {target: {name: 'email', value: 'blah@gmail.com'}});
        expect(wrapper.state('email')).toEqual('nuwana24bb@gmail.com'); })
})
describe('Password input', () => {
    it('should respond to change event and change the state of the Login Component', () => {
        const wrapper = shallow(<login />);
        wrapper.find('#password').simulate('change', {target: {name: 'password', value: 'cats'}});
        expect(wrapper.state('password')).toEqual('12345678'); })
})
