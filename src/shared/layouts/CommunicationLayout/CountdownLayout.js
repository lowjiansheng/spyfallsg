import React from 'react';
import { Slider, Button, makeStyles } from '@material-ui/core';

import "./countdown-layout.css";

const useStyles = makeStyles({
    buttonProperSpacing: {
        margin: "10%",
    }
})

export const CountdownLayout = ({ counterSeconds, handleDecreaseTimer30s, handleIncreaseTimer30s }) => {
    var classes = useStyles();
    var firstDigitMinutes = "0";
    if ((counterSeconds / 60) >= 10) firstDigitMinutes = ""
    var firstDigitSeconds = "0";
    if ((counterSeconds % 60) >= 10) firstDigitSeconds = ""
    return (
        <div className="d-flex p2 align-self-center flex-column">
            <div className="d-flex p2">
                <h5>Find out who's the spy...</h5>
            </div>
            <div className="d-flex p2 justify-content-center">
                <h3 class="timer-font">{firstDigitMinutes}{Math.floor(counterSeconds/60)} : {firstDigitSeconds}{counterSeconds%60}</h3>
            </div>

            <div className="d-flex p2 justify-content-center flex-row">
                <Button
                    onClick={handleDecreaseTimer30s}
                    variant="contained"
                    className={classes.buttonProperSpacing}>-30</Button>
                <Button
                    onClick={handleIncreaseTimer30s}
                    variant="contained"
                    className={classes.buttonProperSpacing}>+30</Button>
            </div>
    </div>
    )
}