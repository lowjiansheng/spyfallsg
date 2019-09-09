import React, { Component } from 'react';
import gameState from '../../constants/gameStates';
import CommunicateLayout from './CommunicateLayout';

class GameFlowLayout extends Component{
    constructor(props) {
        super(props);
        this.state = {
            gameState: gameState.Communicate
        }
        this.communicationEnds = this.communicationEnds.bind(this);
    }

    communicationEnds() {
        alert("Finished communication!");
        this.setState({
            gameState: gameState.Vote
        })
    }

    isGameEnd() {
        // Logic for end game. If both 
    }

    render() {
        switch (this.state.gameState) {
            case gameState.Communicate:
                return <CommunicateLayout communicationEnds={this.communicationEnds}/>

            case gameState.Vote:
                return <p>Time to vote!</p>

            default:
                return 
        }        
    }
}

export default GameFlowLayout;
