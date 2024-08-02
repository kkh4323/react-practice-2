import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const CreateProfile = () => {
    const navigate = useNavigate()
    const [birthday, setBirthday] = useState('')
    const [age, setAge] = useState(0)
    const [graduated, setGraduated] = useState('')

    const getProfile = async () => {
        try {
            const accessToken = await localStorage.getItem("accessToken")
            const config = {
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                }

            }
            const url = 'http://localhost:8000/api/auth'

            const { data, status } = await axios.get(url, config)
            console.log(data)
            if (status === 200) {
                setBirthday(data?.body?.userInfo?.birthday)
                setAge(data?.body?.userInfo?.age)
                setGraduated(data?.body?.userInfo?.graduated)
            }
        } catch (err) {
            console.log(err.messages)
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        const userInput = {
            birthday,
            age: parseInt(age),
            graduated
        }
        console.log(typeof userInput.birthday)
        try {
            const accessToken = await localStorage.getItem("accessToken")
            const config = {
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                }

            }
            console.log(config)

            const url = 'http://localhost:8000/api/user-info'
            if (birthday !== null) {
                const { data, status } = await axios.put(url, userInput, config)
                console.log('=====', data, status)
                if (status === 200) {
                    alert('상세정보 수정이 완료되었습니다.')
                    navigate('/profile')
                }
            } else {
                const { data, status } = await axios.post(url, userInput, config)
                console.log('=====', data, status)
                if (status === 201) {
                    alert('상세정보 설정이 완료되었습니다.')
                    navigate('/profile')
                }
            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        getProfile()
    }, []);
    return (
        <Container className={"mt-5"}>
            <Row className="justify-content-md-center mt-5">
                <Col md={6}>
                    <h2 className="mb-5">상세 정보 등록</h2>
                    <Form className="d-grid" onSubmit={submitHandler}>
                        <Form.Group className="mb-3" controlId="birthday">
                            <Form.Label style={{fontWeight: "bold"}}>생일</Form.Label>
                            <Form.Control
                                type="string"
                                placeholder="생일을 입력해주세요"
                                value={birthday}
                                onChange={e => setBirthday(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="age">
                            <Form.Label style={{fontWeight: "bold"}}>나이</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="나이를 입력해주세요"
                                value={age}
                                onChange={e => setAge(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="graduated">
                            <Form.Label style={{fontWeight: "bold"}}>최종학력</Form.Label>
                            <Form.Control
                                type="string"
                                placeholder="최종학력을 입력해주세요"
                                value={graduated}
                                onChange={e => setGraduated(e.target.value)}
                            />
                        </Form.Group>
                        <Button className="mb-5" variant="primary" type="submit">
                            {birthday !== null ? '수정' : '저장'}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default CreateProfile;