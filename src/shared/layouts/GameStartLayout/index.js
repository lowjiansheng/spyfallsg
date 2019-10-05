import React, { Component } from 'react';
import  PlayerSetupLayout  from './PlayerSetupLayout';
import  GameFlowLayout from './GameFlowLayout';
import { Player } from './Player';

class GameStartLayout extends Component {
    constructor(props) {
        super(props);
        this.state= {
            gameSettings: props.gameSettings,
            gameReady: false,
            players: [],
            numPlayersDone: 0, // track how many players have finished setting up
            cardSettingUp: false,
        }
        this.setPlayerName = this.setPlayerName.bind(this);
        this.setPlayerDoneSettingUp = this.setPlayerDoneSettingUp.bind(this);
        this.handleCardInSetup = this.handleCardInSetup.bind(this);
    }

    setPlayerName(playerIndex, playerName) {
        var spies = this.state.gameSettings.spies
        if (playerIndex >= spies.length) {
            return;
        }
        var players = this.state.players;
        var newPlayer = new Player(players.length, playerName, spies.has(playerIndex), true, "");
        players.push(newPlayer);
        this.setState({
            players: players
        })
    }

    setPlayerDoneSettingUp(playerIndex) {
        if (this.state.numPlayersDone + 1 === this.state.gameSettings.numPlayers) {
            this.setState({
                gameReady: true
            })
        } else {
            this.setState({
                numPlayersDone: this.state.numPlayersDone + 1
            })
        }
    }

    // when a single player is setting up, other players will not be able to click their cards
    handleCardInSetup(isSettingUp) {
        if (isSettingUp) {
            this.setState({
                cardSettingUp: true,
            });
        } else {
            this.setState({
                cardSettingUp: false,
            })
        }
    }

    render() {
        if (this.state.gameReady){
            return <GameFlowLayout
                players={this.state.players}
                gameLocation={this.state.gameSettings["gameLocation"]}
                handleGameEnd={this.props.handleGameEnd}/>
        } else return <PlayerSetupLayout 
            gameSettings={this.state.gameSettings} 
            setPlayerName={this.setPlayerName}
            setPlayerDoneSettingUp={this.setPlayerDoneSettingUp}
            handleCardInSetup={this.handleCardInSetup}
            cardSettingUp={this.state.cardSettingUp}/>
    }

}

export default GameStartLayout;