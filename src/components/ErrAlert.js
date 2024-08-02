import React from 'react';
import {Alert} from "react-bootstrap";

const ErrAlert = ({func, message}) => {
    return (
        <Alert variant="danger" onClose={func} dismissible>
            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
            <p>
                {message}
            </p>
        </Alert>
    );
};

export default ErrAlert;