import React from 'react';
import { Button } from 'react-bootstrap';

const PrimaryButton = ({buttonText}) => {
    return (
        <Button>
            {buttonText}
        </Button>
    )
}

export default PrimaryButton;