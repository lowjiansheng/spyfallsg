import React from 'react';
import { Button } from '@material-ui/core';
import LOCATIONS from '../../constants/locations';

export const spyButton = "spyButton";

export const SpyVotingLayout = ({playerName, handleVotingButtonClick}) => {
    return (
        <div className="d-flex align-self-center flex-column">
            <div className="p2">
                Hi {playerName}. Choose the correct location.
            </div>
            <div className="p2">
                {LOCATIONS.map(location => {
                    return (
                    <Button color="primary" onClick={handleVotingButtonClick} key={location} id={spyButton}>
                        {location}
                    </Button>)
                })}
            </div>
        </div>
    )
}