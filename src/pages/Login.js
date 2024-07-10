import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import './style.css';
import {Link} from "react-router-dom";
import GoogleIcon from "../assets/img/icon-google.png";
import KakaoIcon from "../assets/img/icon-kakao.png";
import NaverIcon from "../assets/img/icon-naver.png"
import axios from "axios";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        const userInput = {
            email,
            password
        };
        console.log(userInput);
    };


    return (
        <Container className="login-container mt-5">
            <h2 className="text-center mb-4">로그인</h2>
            <Form onSubmit={submitHandler} className="login-form">
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>이메일 주소</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="이메일을 입력하세요"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 mb-3">
                    로그인
                </Button>
                <div className="text-center mb-3">
                    <Link to="/users/password/new" className="text-muted">비밀번호를 잊으셨나요?</Link>
                </div>
                <div className="social-login-buttons">
                    <Button variant="light" className="w-100 mb-2">
                        <img src={GoogleIcon} alt="Google" className="social-icon"/>
                    </Button>
                    <Button variant="light" className="w-100 mb-2">
                        <img src={KakaoIcon} alt="Facebook" className="social-icon"/>
                    </Button>
                    <Button variant="light" className="w-100 mb-2">
                        <img src={NaverIcon} alt="Apple" className="social-icon"/>
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default Login;