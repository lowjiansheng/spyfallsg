import React, { Component } from 'react';
import { Row, Button } from 'react-bootstrap';
import { Container } from '@material-ui/core';
import  LOCATIONS  from '../../constants/locations';

const VotingLayout = ({players, playerIndexToVote, handlePlayerChoiceChange, handleSpyLocationChoice, handlePlayersDoneVoting}) => {
    if (playerIndexToVote >= players.length) {
        handlePlayersDoneVoting();
        return null;
    }
    if (players[playerIndexToVote]['spy']) {
        return <SpyVotingLayout
                playerName={players[playerIndexToVote]['name']}
                handleSpyLocationChoice={handleSpyLocationChoice}/>
    } else {
        return <NormalPlayerVotingLayout 
            players={players} 
            playerIndex={playerIndexToVote}
            handlePlayerChoiceChange={handlePlayerChoiceChange}/>
    }
}

const SpyVotingLayout = ({playerName, handleSpyLocationChoice}) => {
    return (
        <Container>
            <Row>
                Hi {playerName}. Choose the correct location.
            </Row>
            <Row>
                {LOCATIONS.map(location => {
                    return (
                    <Button onClick={handleSpyLocationChoice}>
                        {location}
                    </Button>)
                })}
            </Row>
        </Container>
    )
}

// Need to work on the button value.
const NormalPlayerVotingLayout = ({players, playerIndex, handlePlayerChoiceChange}) => {
    return (
        <Container>
            <Row>
                Hi {players[playerIndex]['name']}! Please vote for the spy.
            </Row>
            <Row>
                {players.map(player => {
                    return (<Button onClick={handlePlayerChoiceChange} value={playerIndex}>
                        {player['name']}
                    </Button>)
                })}
            </Row>
            <Row>

            </Row>
        </Container>
    )
}
export default VotingLayout;
