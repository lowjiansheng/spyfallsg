import React, { Component } from "react";
import { Form, Row, Col } from "react-bootstrap";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';



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
                cardContent = <DoneContent/>
                break;
        }
        return (
            <div className="p2">
                <Card>
                    {cardContent}
                </Card>
            </div>
        )
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
        displayContent = <p>You are a Spy!</p>
    } else {
        displayContent = <p>The location is {location}</p>
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
                <p>Wait for the start of the game.</p>
            </Typography>
        </CardContent>
    )
}


export default ClickableCard;