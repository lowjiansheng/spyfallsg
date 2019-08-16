import React, { Component } from 'react';
import HomePageView from './HomePageView';


class HomePage extends Component {
    render() {
        return (
            <HomePageView {...this.props}/>
        )
    }
}

export default HomePage;