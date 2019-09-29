import React, { Component } from 'react';
import PrimaryBanner from '../../shared/layouts/GameSetupLayout/PrimaryBanner';
import GameSetupLayout from '../../shared/layouts/GameSetupLayout';
import HomePageLayout from '../../shared/layouts/HomePageLayout';

import PAGE from '../../shared/constants/pages';
import { setupPlayers } from '../../utils/GameSetup';
import GameStartLayout from '../../shared/layouts/GameStartLayout';
import gameEndResults from '../../shared/constants/gameEndResults';

// This is the main view for the entire game
class HomePageView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameState: PAGE.HOME,
            numPlayers: 4,
            numSpies: 1,
            maxSpies: 4,    // max spies cannot exceed num players
            gameSettings: null,

        };
        this.startGameSetup = this.startGameSetup.bind(this);
        this.startGame = this.startGame.bind(this);
        this.handleNumPlayersChange = this.handleNumPlayersChange.bind(this);
        this.handleNumSpiesChange = this.handleNumSpiesChange.bind(this);
        this.handleGameEnd = this.handleGameEnd.bind(this);
    }

    startGameSetup() {
        this.setState({
            gameState: PAGE.GAME_SETUP
        })
    }

    startGame(e) {
        e.preventDefault();
        if (this.state.numPlayers < 4 || this.state.numSpies < 1) {
            alert("Error in game setup!");
        }
        let gameSettings = setupPlayers(this.state.numPlayers, this.state.numSpies);
        
        this.setState({
            gameState: PAGE.GAME_START,
            gameSettings: gameSettings,
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

    handleGameEnd(results) {
        // When a single game ends. 
        switch (results) {
            case gameEndResults.SpyWinAllCommonersDead:
                alert("Spy won! All the commoners are dead.");
            case gameEndResults.SpyWinGuessedLocation:
                alert("Spy won! Spy has guessed the location!");
            case gameEndResults.CommonersWin:
                alert("Commoners won! They have eliminated the spy and the spy did not get the location.");
        }                
        // For now just return back to home, probably need to erase all the game settings from state
        this.setState({gameState: PAGE.HOME})
    }

    render() {
        switch(this.state.gameState) {
            case PAGE.HOME: 
                return <HomePageLayout startGameSetup={this.startGameSetup}/>
            case PAGE.GAME_SETUP:
                return <GameSetupLayout 
                startGame={this.startGame} 
                numPlayers={this.state.numPlayers}
                numSpies={this.state.numSpies}
                maxSpies={this.state.maxSpies}
                handleNumPlayersChange={this.handleNumPlayersChange}
                handleNumSpiesChange={this.handleNumSpiesChange}/>
            case PAGE.GAME_START:
                return <GameStartLayout 
                gameSettings={this.state.gameSettings}
                handleGameEnd={this.handleGameEnd}/>
        }
    }
}

export default HomePageView;