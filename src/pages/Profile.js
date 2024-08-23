import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Card, Col, Container, Form, ListGroup, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [phone, setPhone] = useState('')
    const [profileImg, setProfileImg] = useState('')
    const [overTwenty, setOverTwenty] = useState(null)
    const [useTerm, setUseTerm] = useState(null)
    const [personalInfo, setPersonalInfo] = useState(null)
    const [marketingAgree, setMarketingAgree] = useState(null)
    const [etc, setEtc] = useState(null)
    const [userInfo, setUserInfo] = useState({})

    const getProfile = async () => {
        try {
            const accessToken = await localStorage.getItem("accessToken")
            const config = {
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                }

            }
            console.log(config)
            const url = 'http://localhost:8000/api/auth'

            const { data, status } = await axios.get(url, config)

            console.log('++++++', status)
            console.log('***********',data.body)
            if (status === 200) {
                setUsername(data.body.username)
                setEmail(data.body.email)
                setPhone(data.body.phone)
                setProfileImg(data.body.profileImg)
                setOverTwenty(data.body.agreeOfTerm.overTwenty)
                setUseTerm(data.body.agreeOfTerm.useTerm)
                setPersonalInfo(data.body.agreeOfTerm.personalInfo)
                setMarketingAgree(data.body.agreeOfTerm.marketingAgree)
                setEtc(data.body.agreeOfTerm.etc)
                setUserInfo(data.body.userInfo)
            }
        } catch (err) {
            console.log(err.messages)
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        const agreeOfTerm = {
            overTwenty: true,
            useTerm: true,
            personalInfo: true,
            marketingAgree,
            etc
        }
        const profileInfo = {
            email,
            username,
            phone,
            profileImg,
        }
        const userInput = {
            email,
            username,
            phone,
            profileImg,
            agreeOfTerm
        }
        try {
            const accessToken = await localStorage.getItem("accessToken")
            const config = {
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                }
            }
            console.log(userInput)
            const profileUrl = "http://localhost:8000/api/user"
            const agreeOfTermUrl = "http://localhost:8000/api/agree-of-term"
            const {data, status} = await axios.put(profileUrl, userInput, config)
            console.log("put", data)
        } catch (err) {
            console.log("+++++++++++++++++", err)
        }


    }

    const linkCreateProfile = () => {
        navigate('/profile/create')
    }

    const linkUpdateProfile = (id) => {
        navigate(`/profile/${id}`)
    }

    useEffect(() => {
        getProfile()
    }, []);

    return (
        <Container className={"mt-5"}>
            <Row className={"justify-content-center"}>
                <Col className={"col-3"}></Col>
                <Col className={"col-6"}>
                    <Form className="d-grid" onSubmit={submitHandler}>
                        <Card style={{ width: '100%' }}>
                            <Card.Img variant="top" src={profileImg} style={{"width": "250px", "justify-content": "center"}} />
                            <Card.Body>
                                <Card.Title>{username}</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">

                                <ListGroup.Item>
                                    <Form.Group className="mb-3">
                                        <Form.Label style={{fontWeight: "bold"}}>이메일</Form.Label>
                                        <Form.Control
                                            type="string"
                                            placeholder={email}
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                    </Form.Group>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Form.Group className="mb-3">
                                        <Form.Label style={{fontWeight: "bold"}}>닉네임</Form.Label>
                                        <Form.Control
                                            type="string"
                                            placeholder={username}
                                            value={username}
                                            onChange={e => setUsername(e.target.value)}
                                        />
                                    </Form.Group>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Form.Group className="mb-3">
                                        <Form.Label style={{fontWeight: "bold"}}>전화번호</Form.Label>
                                        <Form.Control
                                            type="string"
                                            placeholder={phone}
                                            value={phone}
                                            onChange={e => setPhone(e.target.value)}
                                        />
                                    </Form.Group>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Form.Check // prettier-ignore
                                        disabled
                                        type={'checkbox'}
                                        label={`20세 이상입니다.`}
                                        defaultChecked={overTwenty}
                                        value={overTwenty}
                                        onChange={e => setOverTwenty(!overTwenty)}
                                    />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Form.Check // prettier-ignore
                                        disabled
                                        type={'checkbox'}
                                        label={`이용 약관에 동의합니다.`}
                                        defaultChecked={useTerm}
                                        value={useTerm}
                                        onChange={e => setUseTerm(!useTerm)}
                                    />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Form.Check // prettier-ignore
                                        disabled
                                        type={'checkbox'}
                                        label={`개인 정보 제공에 동의합니다.`}
                                        defaultChecked={personalInfo}
                                        value={personalInfo}
                                        onChange={e => setPersonalInfo(!personalInfo)}
                                    />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Form.Check // prettier-ignore
                                        type={'checkbox'}
                                        label={`마케팅 정보를 수신에 동의합니다.`}
                                        defaultChecked={marketingAgree}
                                        value={marketingAgree}
                                        onChange={e=> setMarketingAgree(!marketingAgree)}
                                    />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Form.Check // prettier-ignore
                                        type={'checkbox'}
                                        label={`기타 약관에 동의합니다.`}
                                        defaultChecked={etc}
                                        value={etc}
                                        onChange={e=> setEtc(!etc)}
                                    />
                                </ListGroup.Item>
                            </ListGroup>
                            <Button className="mb-5" variant="primary" type="submit">
                                기본 정보 변경
                            </Button>
                            <Card.Body>
                                <Card.Link onClick={userInfo !== null ? () => linkUpdateProfile(userInfo?.id) : linkCreateProfile}>{userInfo !== null ? 'Update' : 'Create'} Profile</Card.Link>
                                <Card.Link href="#">Logout</Card.Link>
                            </Card.Body>
                        </Card>
                    </Form>
                </Col>
                <Col className={"col-3"}></Col>
            </Row>
        </Container>
    );
};

export default Profile;