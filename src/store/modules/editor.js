import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { pender } from 'redux-pender';
import * as api from '../../lib/api';

const INITIALIZE = 'editor/INITIALIZE';
const ADD_POST = 'editor/ADDPOST';
const CHANGE_INPUT = 'editor/CHANGE_INPUT';

export const initialize = createAction(INITIALIZE);
export const addPost = createAction(ADD_POST, api.addPost);
export const changeInput = createAction(CHANGE_INPUT);
const initialState = Map({
    category: 'java 프로젝트',
    title: '',
    content: ''
});

export default handleActions({
    [INITIALIZE]:(state, action) => initialState,
    [CHANGE_INPUT]: (state, action) => {
        /*switch(action.payload.name){
            case "category":
                state._root.entries[0][1]=action.payload.value;
                console.log(state);
                break;
            case "title":
                state._root.entries[1][1]=action.payload.value;
                console.log(state);
                break;
            case "content":
                state._root.entries[2][1]=action.payload.value;
                console.log(state);
                break;
        }*/
        console.log(state);
        const { name, value } = action.payload;
        return state.set(name, value);
    },
    ...pender({
        type: ADD_POST,
        onSuccess: (state, action) => {
            const { category, title, content } = action.payload.data;
            console.log(category);
            console.log(title);
            console.log(content);
        }
    })
}, initialState)

