import React from 'react';
import {shallow} from 'enzyme';

export const setUp = (props={})=>{
    return shallow(
        <div>
            <header data-test='header'>hello</header>
            <input data-test='input'/>
        </div>);
}
export const findByTestAttr = (component, attr) => {
    return component.find(`[data-test='${attr}']`);
};