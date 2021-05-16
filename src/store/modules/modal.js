import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

const SET_FLAG_TRUE='modal/SET_FLAG_TRUE';
const SET_FLAG_FALSE='modal/SET_FLAG_FALSE';

export const setFlagTrue = createAction(SET_FLAG_TRUE);
export const setFlagFalse = createAction(SET_FLAG_FALSE);

const initialState = Map({
    flag:false
});

export default handleActions({
    [SET_FLAG_TRUE]: (state, action) => state.set('flag', true),
    [SET_FLAG_FALSE]: (state, action) => state.set('flag', false)
}, initialState);