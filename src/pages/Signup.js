import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import './style.css';
import GoogleIcon from "../assets/img/icon-google.png";
import KakaoIcon from "../assets/img/icon-kakao.png";
import NaverIcon from "../assets/img/icon-naver.png";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import InputForm from "../components/InputForm";
import AgreeCheck from "../components/AgreeCheck";
import agreeCheck from "../components/AgreeCheck";

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
        const agreeOfTerm = {
            overTwenty,
            useTerm,
            personalInfo,
            marketingAgree,
            etc
        }
        const userInput = {
            username,
            email,
            password,
            phone,
            agreeOfTerm,
        }
        console.log("userInput", userInput)
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
                        <InputForm
                            label={'이메일 주소'}
                            type={'email'}
                            placeholder={'이메일을 입력하세요'}
                            value={email}
                            func={e => setEmail(e.target.value)}
                        />
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
                        <InputForm
                            label={'닉네임'}
                            placeholder={'닉네임을 입력하세요.'}
                            value={username}
                            func={e => setUsername(e.target.value)}
                        />
                        <InputForm
                            label={'비밀번호'}
                            placeholder={'비밀번호를 입력하세요.'}
                            value={password}
                            func={e => setPassword(e.target.value)}
                        />
                        <InputForm
                            label={'비밀번호 확인'}
                            placeholder={'비밀번호를 한 번 더 입력해주세요.'}
                            value={confirmPassword}
                            func={e => setConfirmPassword(e.target.value)}
                        />
                        <InputForm
                            label={'전화번호'}
                            placeholder={'전화번호를 입력해주세요.'}
                            value={phone}
                            func={e => setPhone(e.target.value)}
                        />
                        <div className="mb-3">
                            <Form.Check // prettier-ignore
                                required
                                type={'checkbox'}
                                label={`20세 이상입니다.`}
                                value={overTwenty}
                                onChange={e=> setOverTwenty(!overTwenty)}
                            />
                            <Form.Check // prettier-ignore
                                required
                                type={'checkbox'}
                                label={`이용 약관에 동의합니다.`}
                                value={useTerm}
                                onChange={e=> setUseTerm(!useTerm)}
                            />
                            <Form.Check // prettier-ignore
                                required
                                type={'checkbox'}
                                label={`개인정보 제공에 동의합니다.`}
                                value={personalInfo}
                                onChange={e=> setPersonalInfo(!personalInfo)}
                            />
                            <Form.Check // prettier-ignore
                                type={'checkbox'}
                                label={`마케팅 정보를 수신하겠습니다.`}
                                value={marketingAgree}
                                onChange={e=> setMarketingAgree(!marketingAgree)}
                            />
                            <Form.Check // prettier-ignore
                                type={'checkbox'}
                                label={`기타 약관에 동의합니다.`}
                                value={etc}
                                onChange={e=> setEtc(!etc)}
                            />
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