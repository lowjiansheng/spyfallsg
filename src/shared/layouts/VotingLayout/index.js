import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import { Container, Snackbar } from '@material-ui/core';
import  LOCATIONS  from '../../constants/locations';
import votingStates from '../../constants/votingStates';

/*
= ({playersInGame, 
    playerIndexToVote, 
    handlePlayerChoiceChange,
    handleSpyLocationChoice,
    handlePlayersDoneVoting,
    skipPlayerForVoting}) => {*/

class VotingLayout extends Component {
    constructor(props){
        super(props);

        if (props.playerIndexToVote >= props.playersInGame.length) {
            props.handlePlayersDoneVoting();
            return null;
        }
        if (!props.playersInGame[props.playerIndexToVote].inGame) {
            props.skipPlayerForVoting();
            return null;
        }
        
        this.state = {
            votingState: votingStates.PreConfirmation
        }
        this.handleVotingButtonClick = this.handleVotingButtonClick.bind(this);
        this.handlePreConfirmationButtonClick = this.handlePreConfirmationButtonClick.bind(this);
    }

    handlePreConfirmationButtonClick() {
        // assume that stateToChangeTo is passed correctly
        this.setState({
            votingState: votingStates.Selection,
        });
    }

    handleVotingButtonClick(e) {
        e.preventDefault();
        switch(e.currentTarget.id) {
            case "spyButton":
                this.props.handleSpyLocationChoice(e.currentTarget.value);
            case "commonerButton":
                this.props.handlePlayerChoiceChange(e.currentTarget.value);
        }
        if (this.props.playerIndexToVote >= this.props.playersInGame.length - 1) {
            this.setState({
                votingState: votingStates.PreConfirmation,
            })
        }
    
    }


    render() {
        if (this.props.playerIndexToVote >= this.props.playersInGame.length) {
            this.props.handlePlayersDoneVoting();
            return null;
        }
        if (!this.props.playersInGame[this.props.playerIndexToVote].inGame) {
            this.props.skipPlayerForVoting();
            return null;
        }

        switch (this.state.votingState) {
            case votingStates.PreConfirmation:
                return <PreVotingLayout 
                playerName={this.props.playersInGame[this.props.playerIndexToVote]['name']}
                handlePreConfirmationButtonClick={this.handlePreConfirmationButtonClick}/>

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

const PreVotingLayout = ({ playerName, handlePreConfirmationButtonClick }) => {
    return(
        <div className="d-flex p2 align-self-center flex-column">
            Hi {playerName}. Please click the button to continue.
            <Button color="primary" onClick={handlePreConfirmationButtonClick}>Continue</Button>
        </div>

    )
}

const SpyVotingLayout = ({playerName, handleVotingButtonClick}) => {
    return (
        <div className="d-flex align-self-center flex-column">
            <div className="p2">
                Hi {playerName}. Choose the correct location.
            </div>
            <div className="p2">
                {LOCATIONS.map(location => {
                    return (
                    <Button color="primary" onClick={handleVotingButtonClick} id="spyButton">
                        {location}
                    </Button>)
                })}
            </div>
        </div>
    )
}

// Need to work on the button value.
const NormalPlayerVotingLayout = ({players, playerIndex, handleVotingButtonClick}) => {
    // Disclaimer page first
    return (
        <div className="d-flex align-self-center flex-column">
            <div className="p2">
                Hi {players[playerIndex]['name']}! Please vote for the spy.
            </div>
            <div className="p2">
                {players.map(player => {
                    // one does not vote for oneself
                    if (player === players[playerIndex]) {
                        return null;
                    } else if (!player.inGame) {    // neither does one vote for one not in game
                        return null;
                    }
                    else {
                        return (<Button color="primary" key={player.id} onClick={handleVotingButtonClick} id="commonerButton" value={player.id}>
                            {player['name']}
                        </Button>)
                    }
                })}
            </div>
        </div>
    )
}
export default VotingLayout;
