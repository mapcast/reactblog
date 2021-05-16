import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import * as CommentActions from '../../store/modules/comment';
const Comment = ({commentList, pid, deleteComment}) => {
    const [writer, setWriter] = useState();
    const [password, setPassword] = useState();
    const [content, setContent] = useState();
    const dispatch = useDispatch();
    const handleChange = (e) => {
        if(e.target.name==="writer"){
            setWriter(e.target.value);
        }else if(e.target.name==="password"){
            setPassword(e.target.value);
        }else if(e.target.name==="content"){
            setContent(e.target.value);
        }else{
            alert('error')
        }
    }
    const handleSubmit = async() => {
        const comment = {
            pid, writer, password, content
        };
        try{
            await dispatch(CommentActions.addComment(comment));
        }catch(e){
            console.log(e);
        }
        window.location.reload();
    }
    const handleDeleteComment = (e) => {
        let cid = e.target.getAttribute('cidData');
        deleteComment(cid);
    }
    const commentLists = commentList.map(
        (value, key) => {
            let date = value.writedate.substr(0,10);
            let time = value.writedate.substr(11, 8);
            return(
                <div className="comments" key={value.cid}>
                    <div className="comments-writer">{value.writer}</div>
                    <p className="comments-content">{value.content}</p>
                    <div className="comments-etc">
                        <div>
                            <br/>{date}&nbsp;{time}
                        </div>
                        <div>
                            <button className={classNames('button', 'delete')} cidData={value.cid} onClick={handleDeleteComment}>삭제</button>
                        </div>
                    </div>
                </div>
            )
        }
    )
    return(
        <div className="post-comment mt40">
            <div className="comment-container">
                {commentLists}
                <div className="comment-info">
                    <input className="guest-info" onChange={handleChange} name="writer" placeholder="이름"></input>
                    <input className="guest-info" onChange={handleChange} name="password" type="password" placeholder="비밀번호"></input>
                </div>
                <textarea className="comment-content" onChange={handleChange} name="content" placeholder="댓글을 입력해주세요"></textarea>
                <div className="flexend"><button onClick={handleSubmit} className={classNames('button', 'summit')}>등록</button></div>
            </div>
        </div>
    )
}

export default Comment;