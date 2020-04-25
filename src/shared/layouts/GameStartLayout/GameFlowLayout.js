import React, { Component } from 'react';
import gameState from '../../constants/gameStates';
import CommunicateLayout from '../CommunicationLayout';
import VotingLayout from '../VotingLayout';
import { roundEndConclusion, stillHasSpiesInGame as stillHasSpiesInGame, removePlayerFromGame } from '../../../utils/GameLogic';
import roundEndStates from '../../constants/roundEndStates';
import gameEndResults from '../../constants/gameEndResults';

class GameFlowLayout extends Component{
    constructor(props) {
        super(props);
        this.state = {
            gameState: gameState.Communicate,
            playerIndexToVote: this.getNextPlayerIndexInGame(0, this.props.players),
            playerVotes: new Array(this.props.players.length).fill(0),  // index: user index, value: no. of times user got voted
            playersInGame: this.props.players,
        }
        this.communicationEnds = this.communicationEnds.bind(this);
        this.handlePlayerChoiceChange = this.handlePlayerChoiceChange.bind(this);
        this.handleSpyLocationChoice = this.handleSpyLocationChoice.bind(this);
        this.handlePlayersDoneVoting = this.handlePlayersDoneVoting.bind(this);
        this.getNextPlayerIndexInGame = this.getNextPlayerIndexInGame.bind(this);
    }

    communicationEnds() {
        // alert("Finished communication!");
        this.setState({
            gameState: gameState.Vote
        })
    }

    handlePlayerChoiceChange(chosenPlayerIndex) {
        console.log("handlePlayerChoice called");
        var playerVotesTemp = this.state.playerVotes;
        playerVotesTemp[chosenPlayerIndex] += 1;
        //debugger;
        if (this.state.playerIndexToVote + 1 === this.state.playersInGame.length) this.handlePlayersDoneVoting();
        else {
            this.setState({
                playerIndexToVote: this.getNextPlayerIndexInGame(this.state.playerIndexToVote + 1, this.state.playersInGame),
                playerVotes: playerVotesTemp,
            });
        };
    }

    handleSpyLocationChoice(chosenLocation) {
        console.log("handleSpyLocationChoice called");
        var playersInGame = this.state.playersInGame;
        playersInGame[this.state.playerIndexToVote].spyChosenLocation = chosenLocation;
        
        if (this.state.playerIndexToVote + 1 === this.state.playersInGame.length) this.handlePlayersDoneVoting(); 
        else {
            this.setState({
                playersInGame: playersInGame,    
                playerIndexToVote: this.getNextPlayerIndexInGame(this.state.playerIndexToVote + 1, this.state.playersInGame)
            })
        }
    }

    resetRound(){
        this.setState({
            playerVotes: this.state.playerVotes.fill(0),
            playerIndexToVote: this.getNextPlayerIndexInGame(0, this.state.playersInGame)           // get index of player in game
        })
    }

    // Assumption: there is at least 1 player in game. Else it will be stucked in an infinite loop.
    getNextPlayerIndexInGame(currentIndex, playersInGame) {
        while (!playersInGame[currentIndex].inGame) {
            currentIndex += 1;
            if (currentIndex === playersInGame.length) return currentIndex;
        }
        return currentIndex;
    }

    handlePlayersDoneVoting() {
        // Tally results and see if spy has been caught.
        console.log("Voting ended!");
        var {results, playerIndexEliminated} = roundEndConclusion(this.state.playersInGame, this.state.playerVotes);
        console.log(this.state.playerVotes);
        console.log(this.state.playersInGame[playerIndexEliminated]);
        console.log(this.props.gameLocation);
        // Spy guessed correctly
        if (this.state.playersInGame[playerIndexEliminated].spyChosenLocation === this.props.gameLocation) {
            this.props.handleGameEnd(gameEndResults.SpyWinGuessedLocation)
            return;
        }
        else {
            switch (results) {
                case roundEndStates.SpyEliminated:
                    alert(this.state.playersInGame[playerIndexEliminated].name + " is a spy!");
                    this.props.handleGameEnd(gameEndResults.CommonersWin)
                    break;
                case roundEndStates.CommonerEliminated:
                    alert(this.state.playersInGame[playerIndexEliminated].name + " has been wrongfully eliminated...");
                    this.setState({
                        playersInGame: removePlayerFromGame(this.state.playersInGame, playerIndexEliminated),
                        gameState: gameState.Communicate
                    });
                    this.resetRound();
                    break;
                case roundEndStates.Tie:
                    // TODO: a random commoner should be eliminated in the scenario of a tie round
                    alert("Tie round. No one was eliminated.");
                    this.resetRound();
                    this.setState({
                        gameState: gameState.Communicate
                    })
            }
        }
    }

    render() {
        console.log("Rendering game flow layout. Player Index = " + this.state.playerIndexToVote)
        switch (this.state.gameState) {
            case gameState.Communicate:
                return <CommunicateLayout communicationEnds={this.communicationEnds}/>
            case gameState.Vote:
                // We will pass in a playerIndex that is in game
                return <VotingLayout 
                    playersInGame={this.state.playersInGame} 
                    playerIndexToVote={this.state.playerIndexToVote}
                    handlePlayerChoiceChange={this.handlePlayerChoiceChange}
                    handleSpyLocationChoice={this.handleSpyLocationChoice}/>
        }        
    }
}

export default GameFlowLayout;
