import React, { Component } from 'react';
import gameSettings from '../../constants/gameSettings';

class CommunicateLayout extends Component{
    constructor(props) {
        super(props);
        this.timer = this.timer.bind(this);
        let timeoutId = setInterval(this.timer, 1000);
        this.state = {
            counter : gameSettings.CommunicationTime,
            timeoutId,
        }
    }
    
    timer() {
        if (this.state.counter === 0) {
            this.props.communicationEnds();
            clearInterval(this.state.timeoutId);
            return;
        }
        this.setState({
            counter: this.state.counter - 1
        })
    }

    render(){
        return (
            <div className="d-flex p2 align-self-center flex-column">
                <div className="d-flex p2">
                    <h5>Find out who's the spy...</h5>
                </div>
                <div className="d-flex p2 justify-content-center">
                    <p>{this.state.counter} seconds left</p>
                </div>
            </div>
        )
    }
}


export default CommunicateLayout;