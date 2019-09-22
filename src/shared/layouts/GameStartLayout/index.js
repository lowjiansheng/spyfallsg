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
            numPlayersDone: 0 // track how many players have finished setting up
        }
        this.setPlayerName = this.setPlayerName.bind(this);
        this.setPlayerDoneSettingUp = this.setPlayerDoneSettingUp.bind(this);
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

    render() {
        if (this.state.gameReady){
            return <GameFlowLayout
                players={this.state.players}
                gameLocation={this.state.gameSettings["gameLocation"]}
                handleGameEnd={this.props.handleGameEnd}/>
        } else return <PlayerSetupLayout 
            gameSettings={this.state.gameSettings} 
            setPlayerName={this.setPlayerName}
            setPlayerDoneSettingUp={this.setPlayerDoneSettingUp}/>
    }

}

export default GameStartLayout;