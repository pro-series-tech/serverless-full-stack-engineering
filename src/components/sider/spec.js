import React from 'react';
import AvatarSection from 'components/sider/avatar';
import {setUp, findByTestAttr} from 'lib/spec-utils';


describe('Avatar Component', () => {

    let component;
    beforeEach(() => {
        component = setUp();
    });

    it('It should render without errors', ()=>{
        const wrapper = findByTestAttr(component, 'input');
        expect(wrapper.length).toBe(1);
    });

    it('It should render a header', ()=>{
        const wrapper = findByTestAttr(component, 'header');
        expect(wrapper.length).toBe(1);
    });
});
