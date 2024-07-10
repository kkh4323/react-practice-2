import React, {useEffect, useState} from 'react';
import {useLocation, useParams} from "react-router-dom";
import axios from "axios";

const Detail = () => {
    const id = useParams()
    const location = useLocation()
    console.log(id, location)

    const [detailData, setDetailData] = useState({})
    const getDetailData = async () => {
        try {
            const url = `http://localhost:8000/api${location.pathname}`
            const result = await axios.get(url)
            setDetailData(result.data.body)
        } catch (err) {
            console.log(err.messages)
        }
    }
    useEffect(() => {
        getDetailData()
    }, []);
    return (
        <div>
            <h1>{detailData.title}</h1>
        </div>
    );
};

export default Detail;