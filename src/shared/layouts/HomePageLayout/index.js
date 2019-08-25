import React from 'react';
import { Row, Container } from 'react-bootstrap';

const HomePageLayout = ({startGameSetup}) => {
    return (
        <Container>
            <Row>
                <p>Majulah Spy</p>
            </Row>
            <Row>
                <button onClick={startGameSetup}>Start Game</button>
            </Row>
        </Container>
    )
}

export default HomePageLayout;