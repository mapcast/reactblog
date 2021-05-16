import React, { useEffect } from 'react';
import Categories from '../Components/Categories';
import Editor from '../Components/EditPage/Editor';
import * as EditorActions from  '../store/modules/editor';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import useReactRouter from 'use-react-router';
const EditPage = () => {
    /*const category = useSelector(state => state.editor.get('category'));
    const title = useSelector(state => state.editor.get('title'));
    const content = useSelector(state => state.editor.get('content'));*/
    const dispatch = useDispatch();
    const handleChangeInput = ({name, value}) => {
        dispatch(EditorActions.changeInput({name, value}));
        //console.log(category);
        //console.log(title);
        //console.log(content);
    }
    /*const handleSubmit = async ({ category, title, content }) => {
        const post = {
            category,
            title,
            content
        }
        try{
            await dispatch(EditorActions.addPost(post));
        }catch(e){
            console.log(e);
        }
    }*/
    const handleSubmit = async(category, title, content) => {
        const post = {
            category, title, content
        };
        const { history } = useReactRouter;
        try{
            await dispatch(EditorActions.addPost(post));
        }catch(e){
            console.log(e);
        }
    }
    /*const handleChangeInput = ({name, value}) => {
        EditorActions.changeInput({name, value});
    }*/
    useEffect(() => {
        dispatch(EditorActions.initialize());
    }
    ,[]);
    return(
        <div className="appFlex">
            <Categories/>
            <Editor
            onChangeInput={handleChangeInput}
            onSubmit={handleSubmit}/>
        </div>
    )
}
export default EditPage;








/*export default connect(
    (state) => ({//hooks에서는 useState로 대체
        category: state.category,
        title: state.title,
        content: state.content
    }),
    (dispatch) => ({//hooks에서는 useDispatch로 대체
        EditorActions: bindActionCreators(EditorActions, dispatch)
    })
)(EditPage);*/