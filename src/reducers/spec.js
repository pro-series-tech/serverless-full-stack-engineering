/**
 * This script tests the reducers.
 * 
 * @author Victor Santos Uceta
 * @license Attribution-NonCommercial-NoDerivatives 4.0 International
 */
import CRUDReducer from 'reducers/crud';
import { 
    CRUD_SET_IMAGE_RECORD,
    CRUD_SWITCH_MODAL_VISIBILITY
} from 'lib/types';

describe('CRUD reducer', () => {
    it('It should return initial state', ()=>{
        let action = {type:'NOT_PRESENT_ACTION'};
        const initialState = {
            imageRecord: null,
            modalVisible: false
        }; 
        expect(CRUDReducer(undefined, action)).toEqual(initialState);
    });
    it('It should return modalvisible as true', ()=>{
        let action = {type:CRUD_SWITCH_MODAL_VISIBILITY, payload: true};
        const expectedState = {
            imageRecord: null,
            modalVisible: true
        }; 
        expect(CRUDReducer(undefined, action)).toEqual(expectedState);
    });
    it('It should return imageRecord as {}', ()=>{
        let action = {type:CRUD_SET_IMAGE_RECORD, payload: {}};
        const expectedState = {
            imageRecord: {},
            modalVisible: false
        }; 
        expect(CRUDReducer(undefined, action)).toEqual(expectedState);
    });
});