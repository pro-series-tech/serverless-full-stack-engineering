import  {Gallery, ImageCRUD, ImageItem} from 'components/image';

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
    }
};

describe('Gallery Component', () => {

    let component;
    beforeEach(() => {
        component = setUpComponent(Gallery, initialState);
    }); 

    it('It should render a Gallery component', ()=>{
        const wrapper = findByTestAttr(component, 'container'); 
        expect(wrapper.length).toBe(1);
    });
    
});

describe('CRUD Component', () => {

    let component;
    beforeEach(() => {
        component = setUpComponent(ImageCRUD, initialState);
    }); 

    it('It should render a ImageCRUD component', ()=>{
        const wrapper = findByTestAttr(component, 'modal-component'); 
        expect(wrapper.length).toBe(1);
    });
    
});

describe('ImageItem Component', () => {

    let component;
    beforeEach(() => {
        component = setUpComponent(ImageItem, initialState, {
            index: 0,
            record: {
                userId:'',
                pictureId: ''
            }
        });
    }); 

    it('It should render a ImageItem component', ()=>{
        const wrapper = findByTag(component, 'Card'); 
        expect(wrapper.length).toBe(1);
    });
    
});
