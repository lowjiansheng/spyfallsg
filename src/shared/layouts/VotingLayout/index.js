import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import  LOCATIONS  from '../../constants/locations';
import votingStates from '../../constants/votingStates';
import { GenericSnackbar } from '../../components/Snackbar';

const commonerButton = "commonerButton";
const spyButton = "spyButton";

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
            case spyButton:
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

    render() {
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
            <GenericSnackbar/>
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
                    <Button color="primary" onClick={handleVotingButtonClick} key={location} id={spyButton}>
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
                        return (<Button color="primary" key={player.id} onClick={handleVotingButtonClick} id={commonerButton} value={player.id}>
                            {player['name']}
                        </Button>)
                    }
                })}
            </div>
        </div>
    )
}
export default VotingLayout;
