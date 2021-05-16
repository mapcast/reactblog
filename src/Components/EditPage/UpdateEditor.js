import React, { useEffect, useRef, useState } from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ckeditor, { CKEditor } from '@ckeditor/ckeditor5-react';
import classNames from 'classnames/bind';
import history from '../../history';

const UpdateEditor = ({onSubmit, Category, Title, Content, handleTitle, handleCategory}) => {
    console.log(Content);
    
    const handleChangeTitle = (e) => {
        handleTitle(e.target.value);
    }
    const handleCkeditorState = (event, editor) => {
        const data = editor.getData();
    }
    const handleSelect = (e) => {
        handleCategory(e.target.value);
    }
    const handleSubmit = async () => {
        /*await onSubmit(category, title, content);
        history.push('/posts/'+Id);
        window.location.reload();*/
    }


    
    return(
        <div className="editor-container">
            <h1 className="editor-title">포스트 수정</h1>
            <div className="editor-title-flex">
                <div className="etf-select">
                    <select className="form-control" onChange={handleSelect}>
                        <option value={Category}>{Category}</option>
                        <option value="java 프로젝트">java 프로젝트</option>
                        <option value="React 프로젝트">React 프로젝트</option>
                        <option value="공부">공부</option>
                        <option value="잡담">잡담</option>
                    </select>
                </div>
                <div className="etf-text">
                    <input type="text" value={Title} name="title" placeholder="제목을 입력해주세요." onChange={handleChangeTitle} className={classNames("form-control", "mb20", "jua")}/>
                </div>
            </div>
            <div className="default-font">
                <CKEditor
                editor={ClassicEditor}
                onReady={ editor => {
                    const checkUndefined = () => {
                        if(typeof Content != 'undefined'){
                            editor.setData(Content);
                        }else{
                            checkUndefined();
                        }
                    }
                    try{
                        editor.setData(Content);
                    }catch(e){
                        console.log(e);
                    }
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

export default UpdateEditor;