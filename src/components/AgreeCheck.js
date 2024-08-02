import React from 'react';
import {Form} from "react-bootstrap";

const AgreeCheck = ({label, feedback}) => {
    return (
        <Form.Group className="mb-2">
            <Form.Check
                required
                label={label}
                feedback={feedback}
                feedbackType="invalid"
            />
        </Form.Group>
    );
};

export default AgreeCheck;