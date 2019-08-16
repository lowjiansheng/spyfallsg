import React, { Component } from 'react';
import PrimaryBanner from '../../shared/layouts/GameSetupLayout/PrimaryBanner';
import GameSetupLayout from '../../shared/layouts/GameSetupLayout';

class HomePageView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <GameSetupLayout/>
        )
    }

}

export default HomePageView;