import React, { Component } from 'react';
import gameState from '../../constants/gameStates';
import CommunicateLayout from './CommunicateLayout';
import VotingLayout from '../VotingLayout';
import { roundEndConclusion, stillHasSpiesInGame as stillHasSpiesInGame, removePlayerFromGame } from '../../../utils/GameLogic';
import roundEndStates from '../../constants/roundEndStates';
import gameEndResults from '../../constants/gameEndResults';

class GameFlowLayout extends Component{
    constructor(props) {
        super(props);
        this.state = {
            gameState: gameState.Communicate,
            playerIndexToVote: 0,
            playerVotes: new Array(this.props.players.length).fill(0),  // index: user index, value: no. of times user got voted
            playersInGame: this.props.players,
        }
        this.communicationEnds = this.communicationEnds.bind(this);
        this.handlePlayerChoiceChange = this.handlePlayerChoiceChange.bind(this);
        this.handleSpyLocationChoice = this.handleSpyLocationChoice.bind(this);
        this.handlePlayersDoneVoting = this.handlePlayersDoneVoting.bind(this);
        this.skipPlayerForVoting = this.skipPlayerForVoting.bind(this);
    }

    communicationEnds() {
        alert("Finished communication!");
        this.setState({
            gameState: gameState.Vote
        })
    }

    handlePlayerChoiceChange(chosenPlayerIndex) {
        var playerVotesTemp = this.state.playerVotes;
        playerVotesTemp[chosenPlayerIndex] += 1;
        this.setState({
            playerIndexToVote: this.state.playerIndexToVote + 1,
            playerVotes: playerVotesTemp,
        })
    }

    handleSpyLocationChoice(chosenLocation) {
        var playersInGame = this.state.playersInGame;
        playersInGame[this.state.playerIndexToVote].spyChosenLocation = chosenLocation;
        
        this.setState({
            playersInGame: playersInGame,    
            playerIndexToVote: this.state.playerIndexToVote + 1,
        })
    }
    
    // this should be used when a player is out of the game and we want to skip his turn in voting
    skipPlayerForVoting() {
        this.setState({playerIndexToVote: this.state.playerIndexToVote + 1})
    }

    resetRound(){
        this.setState({
            playerVotes: this.state.playerVotes.fill(0),
            playerIndexToVote: 0
        })
    }

    handlePlayersDoneVoting() {
        // Tally results and see if spy has been caught.
        console.log("Voting ended!");
        var {results, playerIndexEliminated} = roundEndConclusion(this.state.playersInGame, this.state.playerVotes);
        console.log(this.state.playerVotes);
        switch (results) {
            case roundEndStates.Tie:
                alert("Tie round. No one was eliminated.");
                this.resetRound();
                this.setState({
                    gameState: gameState.Communicate
                })
                break;
            case roundEndStates.SpyEliminated:
                // spy guessed correctly
                if (this.state.playersInGame[playerIndexEliminated].spyChosenLocation === this.props.gameLocation) this.props.handleGameEnd(gameEndResults.SpyWinGuessedLocation);
                else {
                    // spy eliminated
                    // TODO: make this more beautiful
                    alert(this.state.playersInGame[playerIndexEliminated].name + " is a spy!");
                    var playersInGame = removePlayerFromGame(this.state.playersInGame, playerIndexEliminated);
                    if (stillHasSpiesInGame(playersInGame)) {
                        this.resetRound();
                        this.setState({
                            playersInGame: playersInGame
                        });
                    } else this.props.handleGameEnd(gameEndResults.CommonersWin);      // commoners win
                } 
                break;
            case roundEndStates.CommonerEliminated:
                alert(this.state.playersInGame[playerIndexEliminated].name + " has been wrongfully eliminated...");
                this.resetRound();
                var playersInGame = removePlayerFromGame(this.state.playersInGame, playerIndexEliminated);
                // Check if there are still commoners in game.
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
                    handlePlayersDoneVoting={this.handlePlayersDoneVoting}
                    skipPlayerForVoting={this.skipPlayerForVoting}/>
        }        
    }
}

export default GameFlowLayout;
