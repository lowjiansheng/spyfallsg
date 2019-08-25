import React from 'react';
import { Row, Container, Button } from 'react-bootstrap';
import PrimaryBanner from '../GameSetupLayout/PrimaryBanner';

const HomePageLayout = ({startGameSetup}) => {
    return (
        <Container>
            <Row>
                <PrimaryBanner/>
            </Row>
            <Row>
                <Button variant="light" onClick={startGameSetup}>Start Game</Button>
            </Row>
        </Container>
    )
}

export default HomePageLayout;