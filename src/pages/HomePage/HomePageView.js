import React, { Component } from 'react';
import PrimaryBanner from '../../shared/layouts/GameSetupLayout/PrimaryBanner';
import GameSetupLayout from '../../shared/layouts/GameSetupLayout';
import HomePageLayout from '../../shared/layouts/HomePageLayout';

import PAGE from '../../shared/constants/pages'

// This is the main view for the entire game
class HomePageView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameState: PAGE.HOME,
            numPlayers: 4,
            numSpies: 1,
            maxSpies: 4,    // max spies cannot exceed num players
        };
        this.startGameSetup = this.startGameSetup.bind(this);
        this.startGame = this.startGame.bind(this);
        this.handleNumPlayersChange = this.handleNumPlayersChange.bind(this);
        this.handleNumSpiesChange = this.handleNumSpiesChange.bind(this);
    }

    startGameSetup() {
        this.setState({
            gameState: PAGE.GAME_SETUP
        })
    }

    startGame(e) {
        e.preventDefault();
        this.setState({
            gameState: PAGE.GAME_START
        })
    }

    handleNumPlayersChange(e, value){
        this.setState({
            numPlayers: value,
            maxSpies: value
        })
        
    }

    handleNumSpiesChange(e, value) {
        this.setState({
            numSpies: value
        })
    }


    render() {
        if (this.state.gameState === PAGE.HOME) {
            return <HomePageLayout startGameSetup={this.startGameSetup}/>
        } else if (this.state.gameState === PAGE.GAME_SETUP){
            return <GameSetupLayout 
            startGame={this.startGame} 
            numPlayers={this.state.numPlayers}
            numSpies={this.state.numSpies}
            maxSpies={this.state.maxSpies}
            handleNumPlayersChange={this.handleNumPlayersChange}
            handleNumSpiesChange={this.handleNumSpiesChange}/>
        } else if (this.state.gameState === PAGE.GAME_START){
             return (
                 <div>Game Start with {this.state.numPlayers} players and {this.state.numSpies} spy</div>
             )
        }
    }
}

export default HomePageView;