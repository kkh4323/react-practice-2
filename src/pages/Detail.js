import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Button, Col, Container, Image, Row, Spinner} from "react-bootstrap";
import useProductDetail from "../hooks/useProductDetail";

const Detail = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    console.log(id)
    const {isLoading, isSuccess, data, error} = useProductDetail(id)
    // console.log(data)
    // const [detailData, setDetailData] = useState({})
    // const getDetailData = async () => {
    //     try {
    //         const url = `http://localhost:8000/api${location.pathname}`
    //         const result = await axios.get(url)
    //         setDetailData(result.data.body)
    //         console.log(result)
    //     } catch (err) {
    //         console.log(err.messages)
    //     }
    // }

    const backButton = (e) => {
        e.preventDefault()
        navigate(-1)
    }

    // useEffect(() => {
    //     getDetailData()
    // }, []);
    return (
        <>
            {isLoading && (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )}
            {error && <h1>{error.message}</h1>}
            {isSuccess && data && (
                <Container>
                    <Button className={"mt-5"} variant="outline-primary" onClick={backButton}>뒤로가기</Button>{' '}
                    <Row className={"mt-5"}>
                        <Col md={6}>
                            <Image src={data.img} fluid/>
                        </Col>
                        <Col md={6}>
                            <h1>{data.title}</h1>
                            <h6>{data.desc}</h6>
                            <p>{data.category}</p>
                            <p className={"mb-5"}>등록일: {data.createdAt}</p>
                            <h2>₩ {data.price}</h2>
                        </Col>
                    </Row>
                </Container>
            )}
        </>
    );
};

export default Detail;