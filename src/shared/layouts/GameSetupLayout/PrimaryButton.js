import React from 'react';
import { Button } from 'react-bootstrap';


const PrimaryButton = ({buttonText, onClickFunction}) => {
    return (
        <button onClick={onClickFunction}>
            {buttonText}
        </button>
    )
}

export default PrimaryButton;