import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import votingStates from '../../constants/votingStates';
import { GenericSnackbar } from '../../components/Snackbar';

import { PreVotingLayout } from './PreVotingLayout';
import { SpyVotingLayout, spyButton } from './SpyVotingLayout';
import { NormalPlayerVotingLayout, commonerButton } from './NormalPlayerVotingLayout';


class VotingLayout extends Component {
    constructor(props){
        super(props);
        // Every player passed in has to be in game
        if (!props.playersInGame[props.playerIndexToVote].inGame) {
            console.log("Error. Player not in game not supposed to be here.");
            return null;
        }
        if (props.playerIndexToVote >= props.playersInGame.length) {
            console.log("Error. playerIndex higher than number of players.");
            return null;
        }
        this.state = {
            votingState: votingStates.PreConfirmation,
            showAlert: true,
        }
        setInterval(() => {
            this.setState({showAlert : false})
        }, 3000); 

        this.handleVotingButtonClick = this. handleVotingButtonClick.bind(this);
        this.handlePreConfirmationButtonClick = this.handlePreConfirmationButtonClick.bind(this);
        this.hideAlertClick = this.hideAlertClick.bind(this);
    }

    handlePreConfirmationButtonClick() {
        // assume that stateToChangeTo is passed correctly
        this.setState({
            votingState: votingStates.Selection,
        });
    }
    
    handleVotingButtonClick(e) {
        e.preventDefault();
        console.log(e.currentTarget)
        switch(e.currentTarget.id) {
            case spyButton:
                console.log("SPY HAS VOTED HERE")
                this.props.handleSpyLocationChoice(e.currentTarget.value);
                break;
            case commonerButton:
                this.props.handlePlayerChoiceChange(e.currentTarget.value);
                break;
        }
        // Only render if we are still rendering voting states
        // Warning: do not call this for the last player.
        if (this.props.playerIndexToVote < this.props.playersInGame.length - 1) {
            this.setState({
                votingState: votingStates.PreConfirmation,
            })
        }
    }

    hideAlertClick() {
        this.setState({
            showAlert: false,
        })
    }

    render() {
        switch (this.state.votingState) {
            case votingStates.PreConfirmation:
                return <PreVotingLayout 
                    playerName={this.props.playersInGame[this.props.playerIndexToVote]['name']}
                    handlePreConfirmationButtonClick={this.handlePreConfirmationButtonClick}
                    showAlert={this.state.showAlert}
                    hideAlertClick={this.hideAlertClick}/>;

            case votingStates.Selection:
                if (this.props.playersInGame[this.props.playerIndexToVote].isSpy){
                    return <SpyVotingLayout
                            playerName={this.props.playersInGame[this.props.playerIndexToVote]['name']}
                            handleVotingButtonClick={this.handleVotingButtonClick}/> 
                } else {
                    return <NormalPlayerVotingLayout 
                        players={this.props.playersInGame} 
                        playerIndex={this.props.playerIndexToVote}
                        handleVotingButtonClick={this.handleVotingButtonClick}/>
                }
        }        
    }
}


export default VotingLayout;
