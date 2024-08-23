import React, {useEffect, useState} from 'react';
import {Route, useLocation, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {Button, Col, Container, Image, Row} from "react-bootstrap";

const Detail = () => {
    const id = useParams()
    const location = useLocation()
    const navigate = useNavigate()

    const [detailData, setDetailData] = useState({})
    const getDetailData = async () => {
        try {
            const url = `http://localhost:8000/api${location.pathname}`
            const result = await axios.get(url)
            setDetailData(result.data.body)
            console.log(result)
        } catch (err) {
            console.log(err.messages)
        }
    }

    const backButton = (e) => {
        e.preventDefault()
        navigate(-1)
    }

    useEffect(() => {
        getDetailData()
    }, []);
    return (
        <Container>
            <Button className={"mt-5"} variant="outline-primary" onClick={backButton}>뒤로가기</Button>{' '}
            <Row className={"mt-5"}>
                <Col md={6}>
                    <Image src={detailData.img} fluid/>
                </Col>
                <Col md={6}>
                    <h1>{detailData.title}</h1>
                    <h6>{detailData.desc}</h6>
                    <p>{detailData.category}</p>
                    <p className={"mb-5"}>등록일: {detailData.createdAt}</p>
                    <h2>₩ {detailData.price}</h2>
                </Col>
            </Row>
        </Container>
    );
};

export default Detail;