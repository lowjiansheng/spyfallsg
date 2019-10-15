import React from 'react';
import { Button, Slider } from '@material-ui/core';

export const TimerSetup = ( { onSliderChange, onStart, counterMinutes} ) => {
    return (
        <div className="d-flex p2 flex-column align-self-center">
            <div>
                <h5>Time to communicate! How long do you want to set this round for?</h5>
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