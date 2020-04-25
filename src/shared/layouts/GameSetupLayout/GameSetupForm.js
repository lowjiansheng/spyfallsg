import React from 'react';
import { Form } from 'react-bootstrap';
import Slider from '@material-ui/core/Slider';
import { Component } from 'react';
import Button from '@material-ui/core/Button';

import "./game-setup-form.css";

const GameSetupForm = ({startGame, numPlayers, numSpies, maxSpies, handleNumPlayersChange, handleNumSpiesChange}) => {
    return (
        <Form onSubmit={startGame} className="form-size-inherit">
            <Form.Group>
                <Form.Label>Number of players: {numPlayers}</Form.Label>
                    <Slider 
                        defaultValue={4}
                        value={numPlayers}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={4}
                        onChange={handleNumPlayersChange}
                        max={10}/>
            </Form.Group>
            
            <Form.Group>
                <Form.Label>Number of Spies: {numSpies}</Form.Label>
                    <Slider
                        defaultValue={1}
                        value={numSpies}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        onChange={handleNumSpiesChange}
                        step={1}
                        marks
                        min={1}
                        max={maxSpies}/>
            </Form.Group>

            <Form.Group className="d-flex justify-content-center">
            <Button variant="contained" color="primary" type="submit">Start</Button>
            </Form.Group>
        </Form>
    )
}

export default GameSetupForm;