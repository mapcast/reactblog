import { createAction, handleActions } from 'redux-actions';
import { Map, fromJS } from 'immutable';
import { pender } from 'redux-pender';
import * as api from '../../lib/api';

const GET_LAST_POST='posts/GET_LAST_POST';

export const getLastPost = createAction(GET_LAST_POST, api.getLastPost);

const initialState = Map({
    post:{}
});

export default handleActions({
    ...pender({
        type: GET_LAST_POST,
        onSuccess: (state, action) => {
            const { data:post } = action.payload;
            console.log(post);
            return state.set('post', fromJS(post));
        }
    })
}, initialState)

/*export default applyPenders(reducer, [
    {
        type: GET_LAST_POST,
        onPending:(state, action) => {
            console.log('now pending...')
        },
        onSuccess:(state,action) => {
            console.log('finally');
            const { data:post } = action.payload;
            console.log(post);
            return state.set('post', fromJS(post));
        },
        onFailure:(state,action) => {
            console.log('fuck off...');
        }
    }
])*/