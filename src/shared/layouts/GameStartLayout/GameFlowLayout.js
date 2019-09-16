import React, { Component } from 'react';
import gameState from '../../constants/gameStates';
import CommunicateLayout from './CommunicateLayout';
import VotingLayout from './VotingLayout';

class GameFlowLayout extends Component{
    constructor(props) {
        super(props);
        this.state = {
            gameState: gameState.Communicate
        }
        this.communicationEnds = this.communicationEnds.bind(this);
        this.handlePlayerChoiceChange = this.handlePlayerChoiceChange.bind(this);
        this.handleSpyLocationChoice = this.handleSpyLocationChoice.bind(this);
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

    handlePlayerChoiceChange(event) {
        
    }

    handleSpyLocationChoice(event) {

    }

    render() {
        switch (this.state.gameState) {
            case gameState.Communicate:
                return <CommunicateLayout communicationEnds={this.communicationEnds}/>

            case gameState.Vote:
                return <VotingLayout 
                    players={this.props.players} 
                    handlePlayerChoiceChange={this.handlePlayerChoiceChange}
                    handleSpyLocationChoice={this.handleSpyLocationChoice}/>
            default:
                return 
        }        
    }
}

export default GameFlowLayout;
