import React, { Component } from 'react';
import gameSettings from '../../constants/gameSettings';
import { Slider } from '@material-ui/core';
import communicationStates from '../../constants/communicationStates';
import { TimerSetup } from './TimerSetup';

class CommunicateLayout extends Component{
    constructor(props) {
        super(props);
        this.timer = this.timer.bind(this);
        this.state = {
            counterMinutes : gameSettings.CommunicationTime,            // this is purely used only during setup by player
            counterSeconds: -1,
            timeoutId : "",
            communicationState: communicationStates.TimerSetup
        }
        this.handleSliderChange = this.handleSliderChange.bind(this);
        this.onTimerSetupSliderChange = this.onTimerSetupSliderChange.bind(this);
        this.onTimerSetupStartButtonClick = this.onTimerSetupStartButtonClick.bind(this);
    }
    
    handleSliderChange(e, value) {
        this.setState({counterSeconds : value})
    }
    
    timer() {
        if (this.state.counterSeconds === 0) {
            this.props.communicationEnds();
            clearInterval(this.state.timeoutId);
            return;
        }
        this.setState({
            counterSeconds: this.state.counterSeconds - 1
        })
    }

    onTimerSetupStartButtonClick(e) {
        e.preventDefault();
        this.setState({
            counterSeconds: this.state.counterMinutes * 60
        })
        let timeoutId = setInterval(this.timer, 1000);
        this.setState({
            timeoutId: timeoutId,
            communicationState: communicationStates.Countdown
        })

    }

    onTimerSetupSliderChange(e, value) {
        this.setState({
            counterMinutes: value,
        })
    }

    render(){
        switch (this.state.communicationState) {
            case communicationStates.TimerSetup:
                return <TimerSetup
                onSliderChange={this.onTimerSetupSliderChange}
                onStart={this.onTimerSetupStartButtonClick}
                counterMinutes={this.state.counterMinutes}/>
            case communicationStates.Countdown:
                return (
                    <div className="d-flex p2 align-self-center flex-column">
                        <div className="d-flex p2">
                            <h5>Find out who's the spy...</h5>
                        </div>
                        <div className="d-flex p2 justify-content-center">
                            <p>{Math.floor(this.state.counterSeconds/60)} min {this.state.counterSeconds%60} seconds left</p>
                        </div>
                        <div className="d-flex p2 justify-content-center">
                            <Slider 
                            value={this.state.counterSeconds} 
                            onChange={this.handleSliderChange} 
                            aria-labelledby="continuous-slider"
                            max={600}/>
                        </div>
                </div>
                );
        }
    }
}


export default CommunicateLayout;