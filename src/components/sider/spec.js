/**
 * This script tests the sider components.
 * 
 * @author Victor Santos Uceta
 * @license Attribution-NonCommercial-NoDerivatives 4.0 International
 */
import  AvatarSection from 'components/sider/avatar';
import { localPropTypesMockData } from 'lib/prop-types';
import {findByTestAttr, setUpComponent} from 'lib/spec-utils';

/* mocking the initial state of the store */
const initialState = {
    authentication:{
        credentials: localPropTypesMockData.credentials
    }
};

describe('Avatar Component', () => {

    let component;
    beforeEach(() => {
        component = setUpComponent(AvatarSection, initialState);
        //console.log(component.debug());
    }); 

    it('It should render a avatar component', ()=>{
        const wrapper = findByTestAttr(component, 'avatar');
        expect(wrapper.length).toBe(1);
    });

    it('It should render a input field', ()=>{
        const wrapper = findByTestAttr(component, 'upload-input');
        expect(wrapper.length).toBe(1);
    });

    it('It should render a popconfirm component', ()=>{
        const wrapper = findByTestAttr(component, 'popup-confirm');
        expect(wrapper.length).toBe(1);
    });
    
});
