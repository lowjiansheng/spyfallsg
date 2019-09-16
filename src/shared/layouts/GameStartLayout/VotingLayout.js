import React, { Component } from 'react';
import { Row, Button } from 'react-bootstrap';
import { Container } from '@material-ui/core';
import  LOCATIONS  from '../../constants/locations';

const VotingLayout = ({players, handlePlayerChoiceChange, handleSpyLocationChoice}) => {
    
    // TODO: Check if each card will appear sequentially.
    for (var playerIndex = 0; playerIndex < players.length; playerIndex++) {
        console.log(players[playerIndex]);
        if (players[playerIndex]['spy']){
            return <SpyVotingLayout
                playerName={players[playerIndex]['name']}
                handleSpyLocationChoice={handleSpyLocationChoice}/>
        } else {
            return <NormalPlayerVotingLayout 
            players={players} 
            playerIndex={playerIndex}
            handlePlayerChoiceChange={handlePlayerChoiceChange}/>
        }
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
                    return (<Button onClick={handlePlayerChoiceChange}>
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
