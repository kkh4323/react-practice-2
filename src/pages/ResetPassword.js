import React, {useState} from 'react';
import {Button, Container, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')


    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            const url = "http://localhost:8000/api/auth/find/password"
            const result = await axios.post(url, {email})
            console.log(result)
            if (result.status === 201) {
                alert('sent email')
                navigate('/login')
            }
        } catch (err) {
            console.log(err)
        }
    }

    const linkLoginPage = (e) => {
        navigate('/login')
    }

    return (
        <Container className="login-container mt-5">
            <h2 className="text-center mb-4">비밀번호 재설정</h2>
            <Form onSubmit={submitHandler} className="login-form">
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>가입한 이메일 주소를 입력해주세요.</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="이메일"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 mb-3">
                    이메일로 비밀번호 변경 링크 받기
                </Button>
            </Form>
            <h6 onClick={linkLoginPage}>로그인 화면으로 돌아가기</h6>
        </Container>
    );
};

export default ResetPassword;