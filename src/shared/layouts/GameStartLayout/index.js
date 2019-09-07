import React, { Component } from 'react';
import  PlayerSetupLayout  from './PlayerSetupLayout';


class GameStartLayout extends Component {
    constructor(props) {
        super(props);
        this.state= {
            gameSettings: props.gameSettings,
            gameReady: false,
            players: [],
        }
        this.setPlayerName = this.setPlayerName.bind(this);
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

    render() {
        if (this.state.gameReady){
            return <div>Game in progress</div>
        } else return <PlayerSetupLayout gameSettings={this.state.gameSettings} setPlayerName={this.setPlayerName}/>
    }

}

export default GameStartLayout;