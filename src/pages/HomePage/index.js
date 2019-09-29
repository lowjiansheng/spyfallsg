import React, { Component } from 'react';
import HomePageView from './HomePageView';
import { Container } from '@material-ui/core';

// This is the main container / holder for the entire application
class HomePage extends Component {
    render() {
        return (
            <Container style={{
                position: 'absolute', left: '50%', top: '50%',
                transform: 'translate(-10%, -50%)'
            }}>
                <HomePageView {...this.props}/>
            </Container>
            
        )
    }
}

export default HomePage;