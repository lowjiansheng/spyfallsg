import React, { Component } from 'react';
import PrimaryBanner from '../../shared/layouts/GameSetupLayout/PrimaryBanner';
import GameSetupLayout from '../../shared/layouts/GameSetupLayout';
import HomePageLayout from '../../shared/layouts/HomePageLayout';

// This is the main view for the entire game
class HomePageView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameSetup : false,
            gameStart: false,
            homePage: true,
        };
        this.startGameSetup = this.startGameSetup.bind(this);
    }

    startGameSetup() {
        console.log("STARTING GAME SETUP")
        this.setState({
            homePage: false,
            gameSetup: true,
        })
    }

    startGame() {
        this.setState({
            gameStart: true,
        })
    }

    render() {
        if (this.state.homePage) {
            return <HomePageLayout startGameSetup={this.startGameSetup}/>
        } else if (this.state.gameSetup){
            return <GameSetupLayout startGame={this.startGame}/>
        } else if (this.state.gameStart){
             return <div>Game Start</div>
        }
        
    }

}

export default HomePageView;