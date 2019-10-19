import React from 'react';
import { Button } from '@material-ui/core';
import { GenericSnackbar } from '../../components/Snackbar';

import SweetAlert from 'react-bootstrap-sweetalert';

export const PreVotingLayout = ({ playerName, handlePreConfirmationButtonClick, showAlert }) => {
    return(
        <div className="d-flex p2 align-self-center flex-column">
            <SweetAlert
                showConfirm = {false}
                show = {showAlert}
                onConfirm={
                    () => {return}
                }>
                    Start voting for the spy.
                </SweetAlert>
            Hi {playerName}. Please click the button to continue.
            <Button color="primary" onClick={handlePreConfirmationButtonClick}>Continue</Button>
        </div>

    )
}