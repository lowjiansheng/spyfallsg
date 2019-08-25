import React from 'react';
import { Form, Button } from 'react-bootstrap';
import Slider from '@material-ui/core/Slider';
import { Component } from 'react';


const GameSetupForm = ({startGame, numPlayers, numSpies, handleNumPlayersChange, handleNumSpiesChange}) => {
    return (
        <Form onSubmit={startGame}>
            <Form.Group>
                <Form.Label>Num players: {numPlayers}</Form.Label>
                    <Slider 
                        defaultValue={4}
                        value={numPlayers}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={4}
                        onChange={handleNumPlayersChange}
                        max={14}/>
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
                        max={14}/>
            </Form.Group>
            <Form.Group>
            <Button type="submit">Start game!</Button>
            </Form.Group>
        </Form>
    )
}

export default GameSetupForm;