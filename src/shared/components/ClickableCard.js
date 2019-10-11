import React, { Component } from "react";
import { Form, Row, Col } from "react-bootstrap";
import Card from '@material-ui/core/Card';
import ReactCardFlip from 'react-card-flip';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import PropTypes from 'prop-types';
import clsx from 'clsx';

import cardStates from '../constants/cardStates';
import { withStyles } from "@material-ui/styles";

class ClickableCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFirstGame: this.props.isFirstGame,
            cardState: cardStates.Flipped,
            name: "",
            isFlipped: false
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
            cardState: cardStates.LocationSpyReveal
        })
    }

    handleInitialCardClick() {
        if (this.props.cardSettingUp) {
            return;
        } 
        this.props.handleCardInSetup(true); 

        this.setState({
            isFlipped: !this.state.isFlipped,
            cardState: cardStates.NameSetup
        })
    }

    handleLocationSpyRevealClick(event) {
        event.preventDefault();
        this.props.handleCardInSetup(false);
        this.setState({
            cardState: cardStates.Done,
            isFlipped: !this.state.isFlipped,
        })
        this.props.setPlayerDoneSettingUp();
    }

    // First let the user click the card, then allow for input. 
    render() {
        const { classes, children, className, ...other } = this.props;

        var cardContent;
        var flippedContent;
        switch (this.state.cardState) {
            case cardStates.Flipped:
                flippedContent = <FlippedContent handleInitialCardClick={this.handleInitialCardClick}/>
                break;
            case cardStates.NameSetup:
                cardContent = <NameCardContent handleSubmitFunction={this.handleNameCardSubmit} 
                handleChangeFunction = {this.handleNameCardChange} 
                nameValue={this.state.name}/>
                break;
            case cardStates.LocationSpyReveal:
                cardContent = <LocationSpyContent 
                    handleLocationSpyRevealClick={this.handleLocationSpyRevealClick}
                    location={this.props.gameLocation}
                    isSpy={this.props.isSpy}/>
                break;
            case cardStates.Done:
                flippedContent = <DoneContent/>
                break;
        }

        return (
            <div>
                <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal">
                    <Card key="back" >
                        {cardContent}
                    </Card>

                    <Card key="front"  >
                        {flippedContent}
                    </Card>

                </ReactCardFlip>
            </div>
        )
        //className={clsx(classes.root, className)} {...other}
    }
}

const FlippedContent = ({handleInitialCardClick}) => {
    return (
        <CardContent onClick={handleInitialCardClick}>
            <Typography color="textSecondary" variant="body2">
                Please click the card.
            </Typography>
        </CardContent>
    )
}

const LocationSpyContent = ({handleLocationSpyRevealClick, location, isSpy}) => {
    var displayContent;
    if (isSpy) { 
        displayContent = <p>You are a Spy.</p>
    } else {
        displayContent = <p>The location is {location}.</p>
    }
    return (
        <CardContent>
            <Typography className="d-flex p2" variant="body2">
                {displayContent}
            </Typography>
            <Typography className="d-flex p2 justify-content-center" variant="body2">
                <Button variant="contained" color="primary" onClick={handleLocationSpyRevealClick}>Done</Button>
            </Typography>
        </CardContent>
    )
}


const NameCardContent = ({handleSubmitFunction, handleChangeFunction, nameValue}) => {
    return (
        <CardContent>
            <Form onSubmit={handleSubmitFunction}>
                <Form.Group controlId="formName">
                    <Typography>
                        <Form.Label>Input Name</Form.Label>
                    </Typography>
                    <Form.Control type="text" onChange={handleChangeFunction} value={nameValue}/>
                </Form.Group>
                <div className="d-flex justify-content-center">
                    <Button variant="contained" color="primary" type="submit">Continue</Button>
                </div>
            </Form>

        </CardContent>
    )
}

const DoneContent = () => {
    return (
        <CardContent>
            <Typography>
                Wait for the start of the game.
            </Typography>
        </CardContent>
    )
}

ClickableCard.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
};

const clickableCardStyles = {
    root: {
        margin: "5%",
    }
}


export default withStyles(clickableCardStyles)(ClickableCard);