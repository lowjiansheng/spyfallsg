import React from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import PrimaryBanner from '../GameSetupLayout/PrimaryBanner';

import Button from '@material-ui/core/Button';

import "../../css/alignment.css"
import "../../css/bootstrap.min.css"

const HomePageLayout = ({startGameSetup}) => {
    return (
        <div className="d-flex align-self-center flex-column maximum-width" >
            <div className="d-flex p2 justify-content-center">
                <PrimaryBanner/>
            </div>
            <div className="d-flex p2 justify-content-center">
                <Button className="button-spacing" variant="contained" color="primary" onClick={startGameSetup}>Start Game</Button>
                <Button color="primary" className="button-spacing">Game Rules</Button>
            </div>  
        </div>
    )
}

export default HomePageLayout;