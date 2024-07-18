import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Container, Form} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";

const ChangePassword = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const token = params.get('token')

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            alert('please check password')
            return
        }
        const userInput = {
            token,
            newPassword: password
        }
        console.log(userInput)
        try {
            const url = "http://localhost:8000/api/auth/change/password/before"
            const result = await axios.put(url, userInput)
            console.log(result)
            if (result.status === 200) {
                alert('password change success')
                navigate('/login')
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Container className={"mt-5"}>
            <Form className="d-grid" onSubmit={submitHandler}>
                <Form.Group className={"mb-3"} controlId="password">
                    <Form.Label style={{fontWeight: "bold"}}>새 비밀번호</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="비밀번호 입력"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className={"mb-3"} controlId="confirmPassword">
                    <Form.Label style={{fontWeight: "bold"}}>새 비밀번호 확인</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="비밀번호 확인"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>
                <Button className="mb-5" variant="primary" type="submit">
                    비밀번호 변경
                </Button>
            </Form>
        </Container>
    );
};

export default ChangePassword;