import React from 'react';
import PrimaryBanner from './PrimaryBanner';
import PrimaryButton from './PrimaryButton';
import {Container, Row, Col} from 'react-bootstrap';
import GameSetupForm from './GameSetupForm';

import "../../css/alignment.css"

const GameSetupLayout = ({startGame, numPlayers, numSpies, maxSpies, handleNumPlayersChange, handleNumSpiesChange}) => {    
    return (
        <div className="d-flex align-self-center flex-column maximum-width">
            <div className="d-flex p2 justify-content-center">
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