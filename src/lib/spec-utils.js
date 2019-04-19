import React from 'react';
import {shallow} from 'enzyme';
import configureStore from 'redux-mock-store';

export const findByTestAttr = (component, attr) => {
    return component.find(`[data-test='${attr}']`);
};

/* return mocked store for testing */
const setupStore = (initialState = {}) => {
    const mockStore = configureStore();
    return mockStore(initialState);
}

export const setUpComponent = (Component, initialState={}) =>{
    const store = setupStore(initialState);
    /* note we use child at 0 because the component we are testing is a
     redux connected component */
    const wrapper =  shallow(<Component store={store}/>).childAt(0).dive();
    return wrapper;
}