import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Card, Container, Row, Spinner} from "react-bootstrap";
import {Link} from "react-router-dom";
import useProductList from "../hooks/useProductList";

const BlogList = () => {
    const { isLoading, isSuccess, data, error} = useProductList()
    console.log("isLoading: ", isLoading)
    console.log("+++++++++++", data)


    

    // const [blogs, setBlogs] = useState([])
    //
    // const getBlogData = async () => {
    //     try {
    //         const url = 'http://localhost:8000/api/blog'
    //
    //         const data = await axios.get(url)
    //         console.log(data.data.body.data)
    //         setBlogs(data.data.body.data)
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }
    //
    // useEffect(() => {
    //     getBlogData()
    // }, []);
    return (
        <>
        {isLoading && (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        )}
            {error && <h1>{error.message}</h1>}
        {isSuccess && (
            <Container className={"mt-5"}>
                <h1>Apple Catalog</h1>
                <Row>
                    {data.map(blog => (
                        <Card className={"m-3"} style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={blog.img} />
                            <Card.Body>
                                <Card.Title>{blog.title}</Card.Title>
                                <Card.Text>{`${blog.price}원`}</Card.Text>
                                <Card.Text style={{height: "100px"}}>{blog.desc}</Card.Text>
                                <Link to={`/blog/${blog.id}`}>
                                    <Button variant="primary">Go somewhere</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    ))}
                </Row>
            </Container>
        )}

        </>
    );
};

export default BlogList;