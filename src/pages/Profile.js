import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Card, ListGroup} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate()
    const [profile, setProfile] = useState({})

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
            console.log(profile)
            if (status === 200) {
                setProfile(data.body)
            }
        } catch (err) {
            console.log(err.messages)
        }
    }

    const linkCreateProfile = () => {
        navigate('/profile/create')
    }

    useEffect(() => {
        getProfile()
    }, []);

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={profile.profileImg} />
            <Card.Body>
                <Card.Title>{profile.username}</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>
                    <h3>Email</h3>
                    {profile.email}
                </ListGroup.Item>
                <ListGroup.Item>
                    <h3>Phone</h3>
                    {profile.phone}
                </ListGroup.Item>
                <ListGroup.Item>
                    <h3>birthday</h3>
                    {profile?.userInfo?.birthday}
                </ListGroup.Item>
            </ListGroup>
            <Card.Body>
                <Card.Link onClick={linkCreateProfile}>{profile?.userInfo !== null ? 'Update' : 'Create'} Profile</Card.Link>
                <Card.Link href="#">Logout</Card.Link>
            </Card.Body>
        </Card>
    );
};

export default Profile;