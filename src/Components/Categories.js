import React from 'react';
import profile from '../photos/profile.png';
import classNames from 'classnames/bind';
import Cookies from 'js-cookie';
import history from '../history';
const Categories = ({ handleSetFlagTrue }) => {
    const session = Cookies.get('session');
    const openModal = () => {
        handleSetFlagTrue();
    }
    /*const logout = () => {
        Cookies.remove('session');
        window.location.reload();
    }*/
    const goEdit = () => {
        history.push('/edit');
        window.location.reload();
    }

    return(
        <nav className={classNames('navbar', 'navbar-expand-lg', 'fixed-top', 'navbar-light', 'bg-orange', 'sideNav')}>
            <span className={classNames('d-block', 'd-lg-none')}>조현승's blog</span>
            <span className={classNames('d-none', 'd-lg-block')}>
                <img className={classNames('img-fluid', 'img-profile', 'rounded-circle')} src={profile} alt=""/>
            </span>
            <button 
            className={classNames('navbar-toggler')} 
            type="button" 
            data-toggle="collapse" 
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContnet"
            aria-expanded="false"
            aria-label="Toggle navigation">
                <span className={classNames('navbar-toggler-icon')}/>
            </button>
            <div className={classNames('collapse', 'navbar-collapse')}>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <div className="projectCategory"><a href="/">정보</a></div>
                    </li>
                    <li className="nav-item">
                        <a className={classNames('nav-link', 'bigblock')} href="/">프로필</a>
                    </li>
                    <li className="nav-item">
                        <a className={classNames('nav-link', 'bigblock')} href="/">기술</a>
                    </li>
                    <li className="nav-item">
                        <div className="projectCategory"><a href="/posts">게시판</a></div>
                    </li>
                    <li className="nav-item">
                        <a className={classNames('nav-link', 'bigblock')} href="/postsbycategory/java">java 프로젝트</a>
                    </li>
                    <li className="nav-item">
                        <a className={classNames('nav-link', 'bigblock')} href="/postsbycategory/react">React 프로젝트</a>
                    </li>
                    <li className="nav-item">
                        <a className={classNames('nav-link', 'bigblock')} href="/postsbycategory/study">공부</a>
                    </li>
                    <li className="nav-item">
                        <a className={classNames('nav-link', 'bigblock')} href="/postsbycategory/talk">잡답</a>
                    </li>
                    <li className="nav-item">
                        {session ? 
                        <button className={classNames('button', 'login')} onClick={goEdit}>글쓰기</button>
                        :
                        <button className={classNames('button', 'login')} onClick={openModal}>로그인</button>}
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Categories;

//<button className={classNames('button', 'login')}>글쓰기</button>