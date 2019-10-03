import React, { Component } from "react";
import { Card, Form, Button, Row, Col } from "react-bootstrap";

import cardStates from '../constants/cardStates';

class ClickableCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFirstGame: this.props.isFirstGame,
            cardState: cardStates.Flipped,
            name: ""
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
        this.setState({
            cardState: cardStates.NameSetup
        })
    }

    handleLocationSpyRevealClick(event) {
        event.preventDefault();
        this.setState({
            cardState: cardStates.Done
        })
        this.props.setPlayerDoneSettingUp();
    }

    // First let the user click the card, then allow for input. 
    render() {
        console.log(this.state.cardState);
        var cardContent;
        switch (this.state.cardState) {
            case cardStates.Flipped:
                cardContent = <FlippedContent handleInitialCardClick={this.handleInitialCardClick}/>
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
                cardContent = (<p>Wait for the start of the game.</p>)
                break;
        }
        return (
            <div className="p2">
                <Card>
                    <Card.Body>
                        {cardContent}
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

const FlippedContent = ({handleInitialCardClick}) => {
    return (
        <Card.Body onClick={handleInitialCardClick}>Your turn. Please click the card.</Card.Body>
    )
}

const LocationSpyContent = ({handleLocationSpyRevealClick, location, isSpy}) => {
    var displayContent;
    if (isSpy) { 
        displayContent = <p>You are a Spy!</p>
    } else {
        displayContent = <p>The location is {location}</p>
    }
    return (
        <Card.Body>
        <div className="p2">
            {displayContent}
        </div>
        <div className="p2">
            <Button onClick={handleLocationSpyRevealClick}>Continue</Button>
        </div>
    </Card.Body>
    )
}


const NameCardContent = ({handleSubmitFunction, handleChangeFunction, nameValue}) => {
    return (
        <Card.Body>
            <Form onSubmit={handleSubmitFunction}>
                <Form.Group controlId="formName">
                    <Form.Label>Input Name</Form.Label>
                    <Form.Control type="text" onChange={handleChangeFunction} value={nameValue}/>
                </Form.Group>
                <Button variant="primary" type="submit">Go</Button>
            </Form>
        </Card.Body>
    )
}


export default ClickableCard;