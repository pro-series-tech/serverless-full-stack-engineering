/**
 * This script tests the redux thunk actions.
 * 
 * @author Victor Santos Uceta
 * @license Attribution-NonCommercial-NoDerivatives 4.0 International
 */
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

import {
    CRUD_SET_IMAGE_RECORD,
    CRUD_SWITCH_MODAL_VISIBILITY,
    NAVIGATION_AUTHENTICATION_SIGN_IN,
    NAVIGATION_AUTHENTICATION_SWITCH_FORM
} from 'lib/types';
import * as CRUDActions from 'actions/crud';
import * as GlobalActions from 'actions/global';

export const mockStore = configureMockStore([thunk]);

describe("CRUD actions", () => {
    it("It should dispatch the switch modal visibility and reset record", async () => {
        const store = mockStore();
        await store.dispatch(CRUDActions.switchModalVisibility(false));
        const actions = store.getActions();
        expect(actions[0]).toEqual({type: CRUD_SWITCH_MODAL_VISIBILITY, payload: false});
        expect(actions[1]).toEqual({type: CRUD_SET_IMAGE_RECORD, payload: null});
    });
    it("It should dispatch the image record", async () => {
        const store = mockStore();
        await store.dispatch(CRUDActions.setImageRecord({}));
        const actions = store.getActions();
        expect(actions[0]).toEqual({type: CRUD_SET_IMAGE_RECORD, payload: {}});
      });
});

describe("Global actions", () => {
    it("It should dispatch the switch authentiation form navigation", async () => {
        const store = mockStore();
        await store.dispatch(GlobalActions.switchAuthenticationForm(NAVIGATION_AUTHENTICATION_SIGN_IN));
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: NAVIGATION_AUTHENTICATION_SWITCH_FORM, 
            payload: NAVIGATION_AUTHENTICATION_SIGN_IN
        });
    });
});