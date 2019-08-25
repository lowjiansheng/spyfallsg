import React from 'react';
import PrimaryBanner from './PrimaryBanner';
import PrimaryButton from './PrimaryButton';
import {Container, Row, Col} from 'react-bootstrap';
import GameSetupForm from './GameSetupForm';


const GameSetupLayout = ({startGame, numPlayers, numSpies, maxSpies, handleNumPlayersChange, handleNumSpiesChange}) => {    
    return (
        <Container>
            <Row>
                <PrimaryBanner/>     
            </Row>
            <Row>
                <GameSetupForm
                    startGame={startGame} 
                    numPlayers={numPlayers}
                    numSpies={numSpies}
                    maxSpies={maxSpies}
                    handleNumPlayersChange={handleNumPlayersChange}
                    handleNumSpiesChange={handleNumSpiesChange}/>
            </Row>
        </Container>
    )
};

export default GameSetupLayout;