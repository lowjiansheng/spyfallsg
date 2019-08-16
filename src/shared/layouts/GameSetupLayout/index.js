import React from 'react';
import PrimaryBanner from './PrimaryBanner';
import PrimaryButton from './PrimaryButton';
import {Container, Row, Col} from 'react-bootstrap';


const GameSetupLayout = (centreLogo, gameButton) => {
    return (
        <Container>
            <Row>
                <PrimaryBanner logo={centreLogo}/>     
            </Row>
            <Row>
                <PrimaryButton buttonText="Start Game"/>
            </Row>
        </Container>
    )
};

export default GameSetupLayout;