import React, { Component } from 'react';
import gameState from '../../constants/gameStates';
import CommunicateLayout from './CommunicateLayout';
import VotingLayout from './VotingLayout';

class GameFlowLayout extends Component{
    constructor(props) {
        super(props);
        this.state = {
            gameState: gameState.Communicate,
            playerIndexToVote: 0,
            playerVotes: new Array(this.props.players.length).fill(0),
        }
        this.communicationEnds = this.communicationEnds.bind(this);
        this.handlePlayerChoiceChange = this.handlePlayerChoiceChange.bind(this);
        this.handleSpyLocationChoice = this.handleSpyLocationChoice.bind(this);
        this.handlePlayersDoneVoting = this.handlePlayersDoneVoting.bind(this);
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
        event.preventDefault();
        var playerVotesTemp = this.state.playerVotes;
        playerVotesTemp[event.target] += 1;
        this.setState({
            playerIndexToVote: this.state.playerIndexToVote + 1,
            playerVotes: playerVotesTemp,
        })
    }

    handleSpyLocationChoice(event) {
        event.preventDefault();
        this.setState({
            playerIndexToVote: this.state.playerIndexToVote + 1,
        })
    }

    handlePlayersDoneVoting() {
        // Tally results and see if spy has been caught.
        console.log("Voting ended!");
    }

    render() {
        switch (this.state.gameState) {
            case gameState.Communicate:
                return <CommunicateLayout communicationEnds={this.communicationEnds}/>

            case gameState.Vote:
                return <VotingLayout 
                    players={this.props.players} 
                    playerIndexToVote={this.state.playerIndexToVote}
                    handlePlayerChoiceChange={this.handlePlayerChoiceChange}
                    handleSpyLocationChoice={this.handleSpyLocationChoice}
                    handlePlayersDoneVoting={this.handlePlayersDoneVoting}/>
            default:
                return 
        }        
    }
}

export default GameFlowLayout;
