import React from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';
const Post = ({Category, Title, Content, Date, handleDelete, handleUpdate}) => {
    let content = Content+"";//String 형변환
    let content2 = content.replace("img src=\"", "img src=\"http://localhost:3000/");//이미지 소스를 절대경로로 변경

    const handleDel = () => {
        console.log('call handleDel');
        handleDelete();
    }
    let isHave=true;
    if(typeof Title==='undefined'){
        isHave=false;
    }

    return(
        <div>
        {isHave?
            <div>
                <div className="post-category">{Category}</div>
                <h1 className="post-title">{Title}</h1>
                <div className="post-date">
                    {Date}
                </div>
                <hr/>
                <div className="post-content" dangerouslySetInnerHTML={{
                    __html: content2
                }}>
                </div>
                <div className="post-buttons">
                    <button className={classNames("button", "edit")} onClick={handleUpdate}>수정</button>
                    <button className={classNames("button", "delete")} onClick={handleDel}>삭제</button>
                </div>
            </div>
            :
            <div><div className="post-category"></div>
            <h1 className="post-title">글이 업거든요</h1></div>
        }
        </div>
    );
}

export default Post;