import React, { Component } from 'react';
import gameState from '../../constants/gameStates';
import CommunicateLayout from './CommunicateLayout';
import VotingLayout from './VotingLayout';
import { roundEndConclusion, stillHasSpiesInGame as stillHasSpiesInGame, removePlayerFromGame } from '../../../utils/GameLogic';
import roundEndStates from '../../constants/roundEndStates';

class GameFlowLayout extends Component{
    constructor(props) {
        super(props);
        var playersInGame = this.props.players.map(player => {
            return Object.assign(player, 
                {
                    inGame: true,
                    spyChosenLocation: ""   // this will only be set by a spy
                }
            )
        })
        this.state = {
            gameState: gameState.Communicate,
            playerIndexToVote: 0,
            playerVotes: new Array(this.props.players.length).fill(0),  // index: user index, value: no. of times user got voted
            playersInGame: playersInGame,
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
        var playersInGame = this.state.playersInGame;
        playersInGame[this.state.playerIndexToVote].spyChosenLocation = event.target;
        
        this.setState({
            playersInGame: playersInGame,    
            playerIndexToVote: this.state.playerIndexToVote + 1,
        })
    }

    handlePlayersDoneVoting() {
        // Tally results and see if spy has been caught.
        console.log("Voting ended!");
        var {results, playerIndexEliminated} = roundEndConclusion(this.state.playersInGame, this.state.playerVotes);

        switch (results) {
            case roundEndStates.Tie:
                this.setState({gameState: gameState.Communicate})
                break;
            case roundEndStates.SpyEliminated:
                // spy guessed correctly
                if (this.state.playersInGame[playerIndexEliminated].spyChosenLocation === this.props.gameLocation) this.props.handleGameEnd();
                else {
                    // spy eliminated
                    // TODO: make this more beautiful
                    alert(this.state.playersInGame[playerIndexEliminated].name + " is a spy!");
                    var playersInGame = removePlayerFromGame(this.state.playersInGame, playerIndexEliminated);
                    if (stillHasSpiesInGame(playersInGame)) {
                        this.setState({playersInGame: playersInGame});
                    } else this.props.handleGameEnd();      // commoners win
                } 
                break;
            case roundEndStates.CommonerEliminated:
                alert(this.state.playersInGame[playerIndexEliminated].name + " has been wrongfully eliminated...");
                this.setState({
                    playersInGame: removePlayerFromGame(this.state.playersInGame, playerIndexEliminated),
                    gameState: gameState.Communicate    
                });                
        }
    }

    render() {
        switch (this.state.gameState) {
            case gameState.Communicate:
                return <CommunicateLayout communicationEnds={this.communicationEnds}/>

            case gameState.Vote:
                return <VotingLayout 
                    playersInGame={this.state.playersInGame} 
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
