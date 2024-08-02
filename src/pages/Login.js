import React, { useState } from 'react';
import {Alert, Button, Container, Form} from 'react-bootstrap';
import './style.css';
import {Link, useNavigate} from "react-router-dom";
import GoogleIcon from "../assets/img/icon-google.png";
import KakaoIcon from "../assets/img/icon-kakao.png";
import NaverIcon from "../assets/img/icon-naver.png"
import axios from "axios";


const Login = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errAlert, setErrAlert] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        const userInput = {
            email,
            password
        };
        console.log(userInput);
        try {
            const url = "http://localhost:8000/api/auth/login"
            const { data, status } = await axios.post(url, userInput)
            console.log('+++++', data.accessToken)
            if (status === 201) {
                localStorage.setItem("accessToken", data.accessToken)
                navigate('/profile')
            }
        } catch (err) {
            if (err.response.status === 400) {
                setErrAlert(true)
            }
            console.log(err.response.status)
        }
    };

    const linkSignupPage = (e) => {
        navigate('/signup')
    }
    const linkResetPasswordPage = (e) => {
        navigate('/reset/password')
    }
    return (
        <Container className="login-container mt-5">
            {errAlert ? (
                <Alert variant="danger" onClose={() => setErrAlert(false)} dismissible>
                    <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                    <p>
                        Password do not matched!
                    </p>
                </Alert>
            ) : null}
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
                <div className="text-center mb-3 d-flex">
                    <h6 style={{marginRight: "20px"}} onClick={linkResetPasswordPage}>비밀번호 재설정</h6>
                    <h6 onClick={linkSignupPage}>회원가입</h6>
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