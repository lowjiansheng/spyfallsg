import React from 'react';
import { Button, Slider } from '@material-ui/core';

import "./timer-setup.css";

export const TimerSetup = ( { onSliderChange, onStart, counterMinutes} ) => {
    return (
        <div className="d-flex p2 flex-column align-self-center timer-setup-style">
            <div>
                <h5>Communication duration</h5>
            </div>
            <div className="d-flex align-self-center">
                {counterMinutes} minutes
            </div>
            <div>
                <Slider 
                    value={counterMinutes}
                    onChange={onSliderChange} 
                    aria-labelledby="continuous-slider"
                    min={1}
                    max={10}/>
            </div>
            <Button onClick={onStart} color="primary">Start</Button>
        </div>
    )
}