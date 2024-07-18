import React, {useEffect, useState} from 'react';
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
    const [verifyingCode, setVerifyingCode] = useState('')
    const [overTwenty, setOverTwenty] = useState(false)
    const [useTerm, setUseTerm] = useState(false)
    const [personalInfo, setPersonalInfo] = useState(false)
    const [marketingAgree, setMarketingAgree] = useState(false)
    const [etc, setEtc] = useState(false)

    const [sendEmailBtnDisable, setSendEmailBtnDisable] = useState(true)
    const [submitBtnDisable, setSubmitBtnDisable] = useState(true)
    const [verifyCodeShow, setVerifyCodeShow] = useState(false)




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
    const sendEmail = async (e) => {
        e.preventDefault()

        const userInput = {email}
        try {
            const url = "http://localhost:8000/api/auth/email/send";
            const result = await axios.post(url, userInput);
            console.log('+++++++++++++++++', result)
            if (result.status === 201) {
                setVerifyCodeShow(true)
            }
        } catch (err) {
            console.log(err)
        }
    }
    const checkVerifyingCode = async (e) => {
        e.preventDefault()

        const userInput = {
            email,
            code: verifyingCode
        }
        try {
            const url = "http://localhost:8000/api/auth/email/verify"
            const result = await axios.post(url, userInput)
            console.log(result)
            if (result.status === 201) {
                setVerifyCodeShow(false)
                setSubmitBtnDisable(false)
            }
        } catch (err) {
            console.log(err)
        }
    }
    const linkLoginPage = (e) => {
        navigate('/login')
    }
    useEffect(() => {

    }, []);
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
                    <Form className="d-grid" onSubmit={submitHandler}>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label style={{fontWeight: "bold"}}>이메일 주소</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="이메일 입력"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Button className={"mb-3"} variant="primary" onClick={sendEmail}>
                            이메일 인증하기
                        </Button>
                        {verifyCodeShow ? (
                            <Form.Group className={"mb-3 d-grid"}>
                                <Form.Label>이메일로 받은 인증코드를 입력해주세요</Form.Label>
                                <Form.Control
                                    type="string"
                                    placeholder="인증코드 6자리"
                                    value={verifyingCode}
                                    onChange={e => setVerifyingCode(e.target.value)}
                                    className={"mb-3"}
                                >
                                </Form.Control>
                                <Button className={"mb-3"} variant="primary" onClick={checkVerifyingCode}>
                                    이메일 확인
                                </Button>
                            </Form.Group>
                        ) : null}

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
                        <Button className="mb-5" variant="primary" type="submit" disabled={submitBtnDisable}>
                            Submit
                        </Button>
                    </Form>
                    <div style={{display: "flex"}}>
                        <h6 style={{marginRight: "10px"}}>이미 아이디가 있으신가요?</h6>
                        <h6 onClick={linkLoginPage} style={{color: "blue"}}> 로그인</h6>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Signup;