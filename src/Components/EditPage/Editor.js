import React, { useState } from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ckeditor, { CKEditor } from '@ckeditor/ckeditor5-react';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux'
import history from '../../history';

const Editor = ({onChangeInput, onSubmit}) => {
    //const dispatch = useDispatch();
    //const writeState = useSelector();
    /*const [category, setCategory] = useState('java 프로젝트');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    }
    const handleCkeditorState = (event, editor) => {
        const data = editor.getData();
        setContent(data);
        console.log(content);
    }
    const writePost = () => {
        //dispatch(addPost(category, title, content));
    }
    const handleSelect = (e) => {
        console.log(e.target.value);
        setCategory(e.target.value);
    }*/
    const [category, setCategory] = useState('java 프로젝트');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
        onChangeInput({
            name: 'title',
            value: e.target.value
        });
    }
    const handleCkeditorState = (event, editor) => {
        const data = editor.getData();
        setContent(data);
        onChangeInput({
            name: 'content',
            value: data
        });
    }
    const handleSelect = (e) => {
        setCategory(e.target.value);
        onChangeInput({
            name: 'category',
            value: e.target.value
        });
    }
    const handleSubmit = async () => {
        await onSubmit(category, title, content);
        history.push('/posts');
        window.location.reload();
    }
    return(
        <div className="editor-container">
            <h1 className="editor-title">포스트 작성</h1>
            <div className="editor-title-flex">
                <div className="etf-select">
                    <select className="form-control" onChange={handleSelect}>
                        <option value="java 프로젝트">java 프로젝트</option>
                        <option value="React 프로젝트">React 프로젝트</option>
                        <option value="공부">공부</option>
                        <option value="잡담">잡담</option>
                    </select>
                </div>
                <div className="etf-text">
                    <input type="text" name="title" placeholder="제목을 입력해주세요." onChange={handleChangeTitle} className={classNames("form-control", "mb20", "jua")}/>
                </div>
            </div>
            <div className="default-font">
                <CKEditor
                editor={ClassicEditor}
                onReady={ editor => {
                    //// this inializes our application ///
                }}
                config={
                    {
                        ckfinder:{
                            uploadUrl:'/uploads'
                        }
                    }
                }
                onChange={handleCkeditorState}
                />
            </div>
            <div className="editor-button-flex">
                <div>
                    <button className={classNames('button', 'edit', 'button-lg')} onClick={handleSubmit}>작성</button>
                </div>
                <div>
                    <button className={classNames('button', 'delete', 'button-lg')}>취소</button>
                </div>
            </div>
        </div>
    );
}

export default Editor;