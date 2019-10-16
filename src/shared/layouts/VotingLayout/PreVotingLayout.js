import React from 'react';
import { Button } from '@material-ui/core';

export const PreVotingLayout = ({ playerName, handlePreConfirmationButtonClick }) => {
    return(
        <div className="d-flex p2 align-self-center flex-column">
            Hi {playerName}. Please click the button to continue.
            <Button color="primary" onClick={handlePreConfirmationButtonClick}>Continue</Button>
        </div>

    )
}