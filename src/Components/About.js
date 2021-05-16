import React from 'react';
import classNames from 'classnames/bind';

const About = () => {
    return(
        <div className="about">
            <h1 className='about-name'>조<font color="#bd5d38"> 현승</font></h1>
            <span className="desc">부산시 해운대구 · 010-6851-7574 · qlqldyd54321@gmail.com</span>
            <p className={classNames('pharagraph mt-4')}>
            부산 동의대학교 정보통신공학과를 졸업 후 부산IT학원에서 java 웹 개발
            과정을 수료한 신인 프로그래머로,<br />
            프로그래밍에 깊은 관심을 가지고 있고 열심히 배우는 자세를 지닌
            사람입니다.
            </p>
        </div>
    )
}

export default About;