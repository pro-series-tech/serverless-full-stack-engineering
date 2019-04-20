import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

import {
    CRUD_SET_IMAGE_RECORD,
    CRUD_SWITCH_MODAL_VISIBILITY
} from 'lib/types';
import * as CRUDActions from 'actions/crud';

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
