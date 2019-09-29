import React, { Component } from 'react';
import { Row, Button } from 'react-bootstrap';
import { Container } from '@material-ui/core';
import  LOCATIONS  from '../../constants/locations';

const VotingLayout = ({playersInGame, 
    playerIndexToVote, 
    handlePlayerChoiceChange,
    handleSpyLocationChoice,
    handlePlayersDoneVoting,
    skipPlayerForVoting}) => {
    if (playerIndexToVote >= playersInGame.length) {
        handlePlayersDoneVoting();
        return null;
    }
    if (!playersInGame[playerIndexToVote].inGame) {
        skipPlayerForVoting();
        return null;
    }
    console.log(playersInGame[playerIndexToVote].name + " isSpy: " + playersInGame[playerIndexToVote].isSpy);
    if (playersInGame[playerIndexToVote].isSpy) {
        return <SpyVotingLayout
                playerName={playersInGame[playerIndexToVote]['name']}
                handleSpyLocationChoice={handleSpyLocationChoice}/>
    } else {
        return <NormalPlayerVotingLayout 
            players={playersInGame} 
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
                    // one does not vote for oneself
                    if (player === players[playerIndex]) {
                        return null;
                    } else if (!player.inGame) {    // neither does one vote for one not in game
                        return null;
                    }
                    else {
                        return (<Button onClick={handlePlayerChoiceChange} value={player.id}>
                            {player['name']}
                        </Button>)
                    }
                })}
            </Row>
        </Container>
    )
}
export default VotingLayout;
