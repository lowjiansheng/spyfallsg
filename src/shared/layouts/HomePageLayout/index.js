import React from 'react';
import { Row, Container, Button } from 'react-bootstrap';
import PrimaryBanner from '../GameSetupLayout/PrimaryBanner';

const HomePageLayout = ({startGameSetup}) => {
    return (
        <Container style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-10%, -50%)'
        }}>
            <Row>
                <PrimaryBanner />
            </Row>
            <Row>
                <Button variant="light" onClick={startGameSetup}>Start Game</Button>
            </Row>
        </Container>
    )
}

export default HomePageLayout;