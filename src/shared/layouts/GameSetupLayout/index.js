import React from 'react';
import PrimaryBanner from './PrimaryBanner';
import PrimaryButton from './PrimaryButton';
import {Container, Row, Col} from 'react-bootstrap';
import GameSetupForm from './GameSetupForm';


const GameSetupLayout = ({startGame, numPlayers, numSpies, maxSpies, handleNumPlayersChange, handleNumSpiesChange}) => {    
    return (
        <div className="d-flex align-self-center flex-column">
            <div className="p2">
                <PrimaryBanner/>     
            </div>

            <div className="d-flex p2 justify-content-center">
                <GameSetupForm
                    startGame={startGame} 
                    numPlayers={numPlayers}
                    numSpies={numSpies}
                    maxSpies={maxSpies}
                    handleNumPlayersChange={handleNumPlayersChange}
                    handleNumSpiesChange={handleNumSpiesChange}/>
            </div>
        </div>
    )
};

export default GameSetupLayout;