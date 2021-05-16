import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import history from '../../history';

const PostList = ({postList, currentPage, onPrev, onNext, isEndPage, category}) => {
    const postLists = postList.map(
        (value, key) => {
            let date = value.writedate.substr(0,10);
            return(
                <tr className="postlist-posts" key={value.id}>
                    {category ? <td className="paddingleft10"><a href={`/postsbycategory/${category}/${value.id}`}>{value.title}</a></td>:<td className="paddingleft10"><a href={`/posts/${value.id}`}>{value.title}</a></td>}
                    <td className="postlist-date">{date}</td>
                </tr>
            )
        }
    );
    /*const pageLists = pageList.map(
        (value, key) => {currentPage===value?<button className="postlist-paging-selected">{value}</button>:<button className="postlist-paging">{value}</button>}
    );*/

    return(
        <div className="postlist">
            <table className="postlist-table">
                <thead>
                    <tr className="postlist-category">
                        <th width="90%" className="paddingleft10">전체 카테고리 포스트</th>
                        <th width="10%"></th>
                    </tr>
                </thead>
                <tbody>
                    {postLists}
                </tbody>
            </table>
            <div className="post-prevnext">
                {currentPage===1 ? <button className="post-prevnext-button">←prev</button> : <button className="post-prevnext-button" onClick={onPrev}>←prev</button>}
                {isEndPage ? <button className="post-prevnext-button">next→</button>:<button className="post-prevnext-button" onClick={onNext}>next→</button>}
            </div>
        </div>
    );
}

export default PostList;

/*<table width="100%" className="mt20">
                <tbody>
                    <tr>
                        <td width="100%" align="center">
                            <button className="postlist-paging-selected">1</button>
                            <button className="postlist-paging">2</button>
                            <button className="postlist-paging">3</button>
                            <button className="postlist-paging">4</button>
                            <button className="postlist-paging">5</button>
                            <button className="postlist-paging">6</button>
                            <button className="postlist-paging">7</button>
                            <button className="postlist-paging">8</button>
                            <button className="postlist-paging">9</button>
                            <button className="postlist-paging">10</button>
                        </td>
                    </tr>
                </tbody>
            </table>*/