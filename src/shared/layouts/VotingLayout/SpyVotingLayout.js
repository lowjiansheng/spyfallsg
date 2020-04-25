import React from 'react';
import { Button } from '@material-ui/core';
import LOCATIONS from '../../constants/locations';

import "./spy-voting-layout.css";

export const spyButton = "spyButton";

export const SpyVotingLayout = ({playerName, handleVotingButtonClick}) => {
    return (
        <div className="d-flex align-self-center flex-column">
            <div className="p2 align-self-center">
                Hi {playerName}. Choose the correct location.
            </div>
            <div className="d-flex p2 flex-row justify-content-center">
                {LOCATIONS.map(location => {
                    return (
                    <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleVotingButtonClick} 
                    key={location.name}
                    value={location.name}
                    id={spyButton}>
                        {location.name}
                    </Button>)
                })}
            </div>
        </div>
    )
}