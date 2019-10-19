import React, { Component } from 'react';
import gameSettings from '../../constants/gameSettings';
import { Slider } from '@material-ui/core';
import communicationStates from '../../constants/communicationStates';
import { TimerSetup } from './TimerSetup';
import { CountdownLayout } from './CountdownLayout';


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
        this.handleDecreaseTimer30s = this.handleDecreaseTimer30s.bind(this);
        this.handleIncreaseTimer30s = this.handleIncreaseTimer30s.bind(this);
        this.onTimerSetupSliderChange = this.onTimerSetupSliderChange.bind(this);
        this.onTimerSetupStartButtonClick = this.onTimerSetupStartButtonClick.bind(this);
    }
    
    handleSliderChange(e, value) {
        this.setState({counterSeconds : value})
    }
    
    handleDecreaseTimer30s(){
        var counterSecondsToSet = 600;
        if ((this.state.counterSeconds - 30) < 0) {
            counterSecondsToSet = 0;
        } else {
            counterSecondsToSet = this.state.counterSeconds - 30;
        }
        this.setState({
            counterSeconds: counterSecondsToSet,
        })
    }

    handleIncreaseTimer30s() {
        this.setState({
            counterSeconds: this.state.counterSeconds + 30,
        })
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
                    <CountdownLayout
                        counterSeconds={this.state.counterSeconds}
                        handleDecreaseTimer30s={this.handleDecreaseTimer30s}
                        handleIncreaseTimer30s={this.handleIncreaseTimer30s}
                        handleSliderChange={this.handleSliderChange}/>
                );
        }
    }
}


export default CommunicateLayout;