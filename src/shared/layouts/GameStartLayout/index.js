import React, { Component } from 'react';
import  PlayerSetupLayout  from './PlayerSetupLayout';
import  GameFlowLayout from './GameFlowLayout';

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
        var player = {
            spy : spies.has(playerIndex),
            name: playerName,
        }
        var players = this.state.players;
        players.push(player);
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
            return <GameFlowLayout/>
        } else return <PlayerSetupLayout 
            gameSettings={this.state.gameSettings} 
            setPlayerName={this.setPlayerName}
            setPlayerDoneSettingUp={this.setPlayerDoneSettingUp}/>
    }

}

export default GameStartLayout;