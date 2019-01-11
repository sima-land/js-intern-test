/**
 * Testing of actions
 */

import configureStore from 'redux-mock-store' //ES6 modules
const middlewares = [];
const mockStore = configureStore(middlewares);
const initialState = {};
const store = mockStore(initialState);
const TYPE = 'store/search/textEdit';
const textEdit = () => ({ type: TYPE });
store.dispatch(textEdit());
const actions = store.getActions();

it('should dispatch action', () => {
        const expectedPayload = { type: TYPE };
    expect(actions).toEqual([expectedPayload])
});

it('should the state be updated', () => {
    const rowForSearch = 'Aeolus';
    const expectedAction = {
        type: TYPE,
        rowForSearch
    };
    console.log('actions', actions);
    expect(actions.textEdit(rowForSearch)).toEqual(expectedAction)
});