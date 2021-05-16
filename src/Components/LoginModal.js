import React, { useState } from 'react';
import classNames from 'classnames/bind';

import Cookies from 'js-cookie';
import axios from 'axios';

const LoginModal = ({flag, handleSetFlagFalse}) => {
    console.log(flag);
    const [id, setId] = useState();
    const [password, setPassword] = useState();

    const session = Cookies.get('session');

    const handleChangeId = (e) => {
        setId(e.target.value)
    }
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }
    const closeModal = () => {
        handleSetFlagFalse();
    }

    const handleLogin = async() => {
        await axios.post('/login', {
            id:id,
            password:password
        }).then(
            response => {
                if(response.data!=false){
                    Cookies.set('session', response.data);
                    handleSetFlagFalse();
                    window.location.reload();
                }else{
                    alert('아이디나 비밀번호가 잘못되었습니다.');
                }
            }
        );
    }

    return(
        <div className={classNames('modal', 'modallg', {'active': flag})}>
            <div className={classNames('modal-overlay')} onClick={closeModal}></div>
            <div className={classNames('modal-container')}>
            <div className="login-title">관리자 로그인</div>
                <div className="login-input-div"><input className={classNames("login-input", "nooutline")} onChange={handleChangeId} placeholder="아이디"></input></div>
                <div className="login-input-div"><input className={classNames("login-input", "nooutline")} onChange={handleChangePassword} type="password" placeholder="비밀번호"></input></div>
                <div className="width100"><button className={classNames('login-submit', 'button', 'width100')} onClick={handleLogin}>로그인</button></div>    
            </div>
        </div>
    )
}
export default LoginModal;