import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { pender } from 'redux-pender';
import * as api from '../../lib/api';

const INITIALIZE = 'comment/INITIALIZE';
const ADD_COMMENT = 'comment/ADDPOST';

export const initialize = createAction(INITIALIZE);
export const addComment = createAction(ADD_COMMENT, api.addComment);

const initialState = Map({
    pid: '',
    writer: '',
    password: '',
    content: ''
});

export default handleActions({
    [INITIALIZE]:(state, action) => initialState,
    ...pender({
        type: ADD_COMMENT,
        onSuccess: (state, action) => {
            console.log(state);
        }
    })
}, initialState)