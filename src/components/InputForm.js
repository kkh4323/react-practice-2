import React from 'react';
import {Form} from "react-bootstrap";

const InputForm = ({label, type='text', placeholder, value, func}) => {
    return (
        <Form.Group className="mb-3">
            <Form.Label>{label}</Form.Label>
            <Form.Control
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={func}
            />
        </Form.Group>
    );
};

export default InputForm;