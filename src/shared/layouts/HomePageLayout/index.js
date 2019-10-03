import React from 'react';
import { Row, Container, Button, Col } from 'react-bootstrap';
import PrimaryBanner from '../GameSetupLayout/PrimaryBanner';

import "../../css/alignment.css"
import "../../css/bootstrap.min.css"

const HomePageLayout = ({startGameSetup}) => {
    return (
        <div className="d-flex align-self-center flex-column ">
            <div className="p2 ">
                <PrimaryBanner />
            </div>
            <div className="d-flex p2 justify-content-center">
                <Button variant="light" onClick={startGameSetup} >Start Game</Button>
            </div>  
        </div>
    )
}

export default HomePageLayout;