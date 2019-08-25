import React from 'react';
import PrimaryBanner from './PrimaryBanner';
import PrimaryButton from './PrimaryButton';
import {Container, Row, Col} from 'react-bootstrap';

const GameSetupLayout = (startGame) => {    
    return (
        <Container>
            <Row>
                <PrimaryBanner/>     
            </Row>
            <Row>
                "Game Setup"
            </Row>
        </Container>
    )
};

export default GameSetupLayout;