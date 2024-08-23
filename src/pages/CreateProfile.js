import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";

const CreateProfile = () => {
    const {profileId} = useParams()
    console.log("*****", profileId)
    const navigate = useNavigate()
    const [country, setCountry] = useState('')
    const [gender, setGender] = useState(0)
    const [birthday, setBirthday] = useState('')
    const [age, setAge] = useState(0)
    const [height, setHeight] = useState(0)
    const [bloodType, setBloodType] = useState(0)
    const [mbtiType, setMbtiType] = useState(0)
    const [addressOfHome, setAddressOfHome] = useState('')
    const [activityArea, setActivityArea] = useState('')
    const [bornArea, setBornArea] = useState('')
    const [bodyType, setBodyType] = useState(0)
    const [drinking, setDrinking] = useState(0)
    const [smoking, setSmoking] = useState(false)
    const [selfIntroduce, setSelfIntroduce] = useState('')
    const [graduated, setGraduated] = useState(0)
    console.log("profileId", profileId)

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
                setCountry(data?.body?.userInfo?.country)
                setGender(data?.body?.userInfo?.gender)
                setAge(data?.body?.userInfo?.age)
                setBirthday(data?.body?.userInfo?.birth)
                setHeight(data?.body?.userInfo?.height)
                setBloodType(data?.body?.userInfo?.bloodType)
                setMbtiType(data?.body?.userInfo?.mbtiType)
                setAddressOfHome(data?.body?.userInfo?.addressOfHome)
                setActivityArea(data?.body?.userInfo?.activityArea)
                setBornArea(data?.body?.userInfo?.bornArea)
                setBodyType(data?.body?.userInfo?.bodyType)
                setDrinking(data?.body?.userInfo?.drinking)
                setSmoking(data?.body?.userInfo?.smoking)
                setSelfIntroduce(data?.body?.userInfo?.selfIntroduce)
                setGraduated(data?.body?.userInfo?.graduated)
            }
        } catch (err) {
            console.log(err.messages)
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        const userInput = {
            country,
            gender: parseInt(gender),
            birth: birthday,
            height: parseInt(height),
            bloodType: parseInt(bloodType),
            mbtiType: parseInt(mbtiType),
            addressOfHome,
            activityArea,
            bornArea,
            bodyType: parseInt(bodyType),
            drinking: parseInt(drinking),
            smoking,
            selfIntroduce,
            graduated
        }
        try {
            const accessToken = await localStorage.getItem("accessToken")
            const config = {
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                }

            }
            console.log(config)

            const url = 'http://localhost:8000/api/user-info'
            if (profileId !== undefined) {
                const { data, status } = await axios.put(url, userInput, config)
                console.log('put', data, status)
                if (status === 200) {
                    alert('상세정보 수정이 완료되었습니다.')
                    navigate('/profile')
                }
            } else {
                const { data, status } = await axios.post(url, userInput, config)
                console.log('post', data, status)
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
                    <h2 className="mb-5">상세 정보 {profileId !== undefined ? '수정' : '등록'}</h2>
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
                        <Form.Group className="mb-3" controlId="birthday">
                            <Form.Label style={{fontWeight: "bold"}}>키</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="키를 입력해주세요"
                                value={height}
                                onChange={e => setHeight(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label style={{fontWeight: "bold"}}>체형</Form.Label>
                            <Form.Select
                                value={bodyType}
                                onChange={e => {
                                    console.log("targetValue", e.target.value)
                                    setBodyType(e.target.value)
                                }}
                            >
                                <option>체형을 선택해주세요</option>
                                <option value="0">매우 마름</option>
                                <option value="1">마름</option>
                                <option value="2">보통</option>
                                <option value="3">통통함</option>
                                <option value="3">근육질</option>
                                <option value="3">체격이 있는 편</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label style={{fontWeight: "bold"}}>최종 학력</Form.Label>
                            <Form.Select
                                value={graduated}
                                onChange={e => {
                                    console.log("targetValue", e.target.value)
                                    setGraduated(e.target.value)
                                }}
                            >
                                <option>최종 학력을 선택해주세요.</option>
                                <option value="0">고졸 미만</option>
                                <option value="1">고졸</option>
                                <option value="2">대졸</option>
                                <option value="3">석사</option>
                                <option value="4">박사</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="graduated">
                            <Form.Label style={{fontWeight: "bold"}}>활동지</Form.Label>
                            <Form.Control
                                type="string"
                                placeholder="주요 활동지를 입력해주세요"
                                value={activityArea}
                                onChange={e => setActivityArea(e.target.value)}
                            />
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label style={{fontWeight: "bold"}}>혈액형</Form.Label>
                                    <Form.Select
                                        value={bloodType}
                                        onChange={e => {
                                            console.log("targetValue", e.target.value)
                                            setBloodType(e.target.value)}}
                                    >
                                        <option>혈액형을 골라주세요.</option>
                                        <option value="0">Type A</option>
                                        <option value="1">Type B</option>
                                        <option value="2">Type O</option>
                                        <option value="3">Type AB</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label style={{fontWeight: "bold"}}>성별</Form.Label>
                                    <Form.Select
                                        value={gender}
                                        onChange={e => {
                                            console.log("targetValue", e.target.value)
                                            setGender(e.target.value)
                                        }}
                                    >
                                        <option>성별을 선택해주세요.</option>
                                        <option value="0">남성</option>
                                        <option value="1">여성</option>
                                        <option value="2">기타</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label style={{fontWeight: "bold"}}>MBTI</Form.Label>
                                    <Form.Select
                                        value={mbtiType}
                                        onChange={e => {
                                            console.log("targetValue", e.target.value)
                                            setMbtiType(e.target.value)
                                        }}
                                    >
                                        <option>MBTI를 선택해주세요.</option>
                                        <option value="0">ENFP</option>
                                        <option value="1">ENFJ</option>
                                        <option value="2">ENTP</option>
                                        <option value="3">ENTJ</option>
                                        <option value="4">ESFP</option>
                                        <option value="5">ESFJ</option>
                                        <option value="6">ESTP</option>
                                        <option value="7">ESTJ</option>
                                        <option value="8">INFP</option>
                                        <option value="9">INFJ</option>
                                        <option value="10">INTP</option>
                                        <option value="11">INTJ</option>
                                        <option value="12">ISFP</option>
                                        <option value="13">ISFJ</option>
                                        <option value="14">ISTP</option>
                                        <option value="15">ISTJ</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label style={{fontWeight: "bold"}}>국가</Form.Label>
                                    <Form.Control
                                        type="string"
                                        placeholder="출신 국가"
                                        value={country}
                                        onChange={e => setCountry(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label style={{fontWeight: "bold"}}>도</Form.Label>
                                    <Form.Control
                                        type="string"
                                        placeholder="도, 특별시, 광역시"
                                        value={bornArea}
                                        onChange={e => setBornArea(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label style={{fontWeight: "bold"}}>시, 군, 구</Form.Label>
                                    <Form.Control
                                        type="string"
                                        placeholder="시, 군, 구"
                                        value={addressOfHome}
                                        onChange={e => setAddressOfHome(e.target.value)}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label style={{fontWeight: "bold"}}>음주</Form.Label>
                                    <Form.Select
                                        value={drinking}
                                        onChange={e => {
                                            console.log("targetValue", e.target.value)
                                            setDrinking(e.target.value)
                                        }}
                                    >
                                        <option>음주 빈도를 선택해주세요.</option>
                                        <option value="0">술을 마시지 않음</option>
                                        <option value="1">달 0~1회</option>
                                        <option value="2">주 1회</option>
                                        <option value="3">주 2회 이상</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label style={{fontWeight: "bold"}}>담배</Form.Label>
                                    <Form.Select
                                        value={smoking}
                                        onChange={e => {
                                            console.log("targetValue", e.target.value)
                                            setSmoking(!smoking)
                                        }}
                                    >
                                        <option>흡연 유무</option>
                                        <option value={false}>흡연 X</option>
                                        <option value={true}>흡연 O</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Label>자기소개</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                type="string"
                                placeholder="간단 자기소개를 입력해주세요."
                                value={selfIntroduce}
                                onChange={e => setSelfIntroduce(e.target.value)}
                            />
                        </Form.Group>
                        <Button className="mt-3" variant="primary" type="submit">
                            {profileId !== undefined ? '수정' : '저장'}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default CreateProfile;