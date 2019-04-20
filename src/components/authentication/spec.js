/**
 * This script tests the authentication components.
 * 
 * @author Victor Santos Uceta
 * @license Attribution-NonCommercial-NoDerivatives 4.0 International
 */
import { 
    SignIn, 
    SignUp, 
    ForgotPwd, 
    ConfirmAccount 
} from 'components/authentication';
import {findByTestAttr, findByTag, setUpComponent} from 'lib/spec-utils';
import { localPropTypesMockData } from 'lib/prop-types';

/* mocking the initial state of the store */
const initialState = {
    authentication:{
        username: ''
    }
};

describe('SignIn Component', () => {
    let component;
    beforeEach(() => {
        component = setUpComponent(SignIn, initialState, {switchLoading:()=>{}});
    });
    it('It should render the SignIn component', ()=>{
        const wrapper = findByTag(component, 'SignIn'); 
        expect(wrapper.length).toBe(1);
    });
});

describe('SignUp Component', () => {
    let component;
    beforeEach(() => {
        component = setUpComponent(SignUp, initialState, {switchLoading:()=>{}});
    });
    it('It should render the SignUp component', ()=>{
        const wrapper = findByTag(component, 'SignUp'); 
        expect(wrapper.length).toBe(1);
    });
});

describe('ForgotPwd Component', () => {
    let component;
    beforeEach(() => {
        component = setUpComponent(ForgotPwd, initialState, {switchLoading:()=>{}});
    });
    it('It should render the ForgotPwd component', ()=>{
        const wrapper = findByTag(component, 'ForgotPwd'); 
        expect(wrapper.length).toBe(1);
    });
});

describe('ConfirmAccount Component', () => {
    let component;
    beforeEach(() => {
        component = setUpComponent(ConfirmAccount, initialState, {switchLoading:()=>{}});
    });
    it('It should render the ConfirmAccount component', ()=>{
        const wrapper = findByTag(component, 'ConfirmAccount'); 
        expect(wrapper.length).toBe(1);
    });
});