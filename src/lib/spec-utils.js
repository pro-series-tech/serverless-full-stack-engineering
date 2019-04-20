import React from 'react';
import {shallow} from 'enzyme';
import configureStore from 'redux-mock-store';

export const findByTestAttr = (component, attr) => {
    return component.find(`[data-test='${attr}']`);
};

export const findByTag= (component, tag) => {
    return component.find(tag);
};
/* return mocked store for testing */
const setupStore = (initialState = {}) => {
    const mockStore = configureStore();
    return mockStore(initialState);
}

export const setUpComponent = (Component, initialState={}, props={}, upperLevel) =>{
    const store = setupStore(initialState);
    /* note we use child at 0 because the component we are testing is a
     redux connected component */
    if(upperLevel){
        return shallow(<Component store={store} {...props} />).childAt(0);
    }else{
        return shallow(<Component store={store} {...props} />).childAt(0).dive();
    }
}
