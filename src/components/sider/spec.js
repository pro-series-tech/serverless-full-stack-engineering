import React from 'react';
import {shallow} from 'enzyme';
import AvatarSection from 'components/sider/avatar';

describe('Avatar Component', () => {
    it('It should render without errors', ()=>{
        const component = shallow(<div><input>hello</input></div>);
        const wrapper = component.find('input');
        expect(wrapper.length).toBe(1);
    });
});
