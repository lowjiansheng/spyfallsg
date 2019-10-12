import React, { Component } from "react";
import Card from '@material-ui/core/Card';
import ReactCardFlip from 'react-card-flip';

import PropTypes from 'prop-types';
import clsx from 'clsx';

import { FrontContent } from './FrontContent';
import { BackContent } from './BackContent';

import cardStates from '../../constants/cardStates';
import { withStyles } from "@material-ui/styles";

class ClickableCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFirstGame: this.props.isFirstGame,
            cardState: cardStates.Flipped,
            name: "",
            isDone: false,
            isFlipped: false,
            isNameSetup: false
        }
        this.handleInitialCardClick = this.handleInitialCardClick.bind(this);
        this.handleNameCardChange = this.handleNameCardChange.bind(this);
        this.handleNameCardSubmit = this.handleNameCardSubmit.bind(this);
        this.handleLocationSpyRevealClick = this.handleLocationSpyRevealClick.bind(this);
    }

    handleNameCardChange(event) {
        this.setState({name:event.target.value})
    }

    handleNameCardSubmit(event) {
        event.preventDefault();
        // Name validation
        if (this.state.name === "") {
            return;
        }
        this.props.setPlayerName(this.props.playerIndex, this.state.name)
        this.setState({
            isNameSetup: false,
        })
    }

    handleInitialCardClick() {
        if (this.props.cardSettingUp) {
            return;
        } 
        this.props.handleCardInSetup(true); 

        this.setState({
            isFlipped: !this.state.isFlipped,
            isNameSetup: true,
        })
    }

    handleLocationSpyRevealClick(event) {
        event.preventDefault();
        this.props.handleCardInSetup(false);
        this.setState({
            isDone: true,
            isFlipped: !this.state.isFlipped,
        })
        this.props.setPlayerDoneSettingUp();
    }

    // First let the user click the card, then allow for input. 
    render() {
        const { classes, children, className, ...other } = this.props;

        return (
            <ReactCardFlip isFlipped={this.state.isFlipped} 
                flipDirection="horizontal"
                containerStyle={
                    {
                        margin: "5%",
                        width: 150,
                        height: 200,
                    }
                }>
                    <Card key="front" className={clsx(classes.root, className)} {...other}>
                        <FrontContent
                            isDone={this.state.isDone}
                            handleInitialCardClick={this.handleInitialCardClick}/>
                    </Card>

                    <Card key="back" className={clsx(classes.root, className)} {...other}>
                        <BackContent
                            setupPlayerNames={this.state.isNameSetup} // states
                            handleSubmitFunction={this.handleNameCardSubmit}
                            handleChangeFunction={this.handleNameCardChange}
                            nameValue={this.state.name}
                            handleLocationSpyRevealClick={this.handleLocationSpyRevealClick}
                            location={this.props.gameLocation}
                            isSpy={this.props.isSpy}/>
                    </Card>

            </ReactCardFlip>
        )
    }
}

ClickableCard.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
};

const clickableCardStyles = {
    root: {
        minHeight: "100%",
        minWidth: "100%",
        display: "flex"
    }
}


export default withStyles(clickableCardStyles)(ClickableCard);