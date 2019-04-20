/**
 * This script tests the main layout components.
 * 
 * @author Victor Santos Uceta
 * @license Attribution-NonCommercial-NoDerivatives 4.0 International
 */
import Layout from 'components/layout';
import HomeLayout from 'components/layout/home';
import LandingLayout from 'components/layout/landing';
import { NAVIGATION_AUTHENTICATION_SIGN_IN } from 'lib/types';
import {findByTestAttr, findByTag, setUpComponent} from 'lib/spec-utils';
import { localPropTypesMockData } from 'lib/prop-types';

/* mocking the initial state of the store */
const initialState = {
    gallery:{
        records: [],
        searchText: null,
        searchIndex: {}
    },
    authentication:{
        credentials: localPropTypesMockData.credentials
    },
    crud:{
        imageRecord: null,
        modalVisible: true
    },
    global:{
        authenticationForm: NAVIGATION_AUTHENTICATION_SIGN_IN
    }
};

describe('Layout Component', () => {

    let component;
    beforeEach(() => {
        const onWillMount = jest.fn();
        component = setUpComponent(Layout, initialState, {}, true);
        component.componentWillMount = onWillMount;
    });
    it('It should render the entry component', ()=>{
        const wrapper = findByTag(component, 'Layout'); 
        expect(wrapper.length).toBe(1);
    });
    
});

describe('Home Component', () => {

    let component;
    beforeEach(() => {
        component = setUpComponent(HomeLayout, initialState);
    });
    it('It should render the Home component', ()=>{
        const wrapper = findByTag(component, 'Sider'); 
        expect(wrapper.length).toBe(1);
    });
});

describe('Landing Component', () => {

    let component;
    beforeEach(() => {
        component = setUpComponent(LandingLayout, initialState);
    });
    it('It should render the Landing component', ()=>{
        const wrapper = findByTag(component, 'Row'); 
        expect(wrapper.length).toBe(1);
    });
});