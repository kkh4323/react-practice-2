import React from 'react';
import {Form} from "react-bootstrap";

const AgreeCheck = ({label}) => {
    return (
        <Form.Group className="mb-2">
            <Form.Check
                label={label}
            />
        </Form.Group>
    );
};

export default AgreeCheck;