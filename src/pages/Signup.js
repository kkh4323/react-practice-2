import React, {useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import './style.css';
import GoogleIcon from "../assets/img/icon-google.png";
import KakaoIcon from "../assets/img/icon-kakao.png";
import NaverIcon from "../assets/img/icon-naver.png";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [overTwenty, setOverTwenty] = useState(false)
    const [useTerm, setUseTerm] = useState(false)
    const [personalInfo, setPersonalInfo] = useState(false)
    const [marketingAgree, setMarketingAgree] = useState(false)
    const [etc, setEtc] = useState(false)
    const submitHandler = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            alert('please check password')
            return
        }
        const userInput = {
            username,
            email,
            password,
            phone,
            // overTwenty,
            // useTerm,
            // personalInfo,
            // marketingAgree,
            // etc
        }
        try {
            const url = "http://localhost:8000/api/auth/signup";

            const result = await axios.post(url, userInput)
            console.log('+++++++++++++', result)
            if (result.status === 201) {
                navigate('/login')
            }
        } catch (err) {
            console.log(err)
        }
        console.log("*************", userInput)


    }

    return (
        <Container className={"mt-5"}>
            <Row className="justify-content-md-center mt-5">
                <Col md={6}>
                    <h2 className="mb-5">회원가입</h2>
                    <div className="text-center">
                        <h6 style={{color: "gray"}}>SNS계정으로 간편하게 회원가입</h6>
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
                    </div>
                    <Form onSubmit={submitHandler}>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label style={{fontWeight: "bold"}}>이메일 주소</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="이메일 입력"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label style={{fontWeight: "bold"}}>닉네임</Form.Label>
                            <Form.Control
                                type="string"
                                placeholder="닉네임 입력"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label style={{fontWeight: "bold"}}>비밀번호</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="비밀번호 입력"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="confirmPassword">
                            <Form.Label style={{fontWeight: "bold"}}>비밀번호 확인</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="비밀번호 확인"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="phone">
                            <Form.Label style={{fontWeight: "bold"}}>전화번호</Form.Label>
                            <Form.Control
                                type="string"
                                placeholder="전화번호 입력"
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                            />
                        </Form.Group>
                        <div>
                            <Form.Group className="mb-2" controlId="overTwenty">
                                <Form.Check
                                    required
                                    label="20세 이상입니다."
                                    feedback="필수 동의 사항입니다."
                                    feedbackType="invalid"
                                />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="useTerm">
                                <Form.Check
                                    required
                                    label="이용 약관에 동의합니다."
                                    feedback="필수 동의 사항입니다."
                                    feedbackType="invalid"
                                />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="personalInfo">
                                <Form.Check
                                    required
                                    label="개인정보 제공에 동의합니다.."
                                    feedback="필수 동의 사항입니다."
                                    feedbackType="invalid"
                                />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="marketingAgree">
                                <Form.Check
                                    required
                                    label="마케팅 약관에 동의합니다."
                                    feedback="필수 동의 사항입니다."
                                    feedbackType="invalid"
                                />
                            </Form.Group>
                            <Form.Group className="mb-2" controlId="etc">
                                <Form.Check
                                    required
                                    label="기타 등등 암튼 동의합니다."
                                    feedback="필수 동의 사항입니다."
                                    feedbackType="invalid"
                                />
                            </Form.Group>
                        </div>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Signup;