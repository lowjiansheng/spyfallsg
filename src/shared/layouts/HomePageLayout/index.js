import React from 'react';
import { Row, Container, Button } from 'react-bootstrap';
import PrimaryBanner from '../GameSetupLayout/PrimaryBanner';

const HomePageLayout = ({startGameSetup}) => {
    return (
        <div>
            <Row>
                <PrimaryBanner />
            </Row>
            <Row>
                <Button variant="light" onClick={startGameSetup}>Start Game</Button>
            </Row>
        </div>
    )
}

export default HomePageLayout;