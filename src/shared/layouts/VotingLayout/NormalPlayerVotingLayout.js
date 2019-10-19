import React from 'react';
import { Button, makeStyles } from '@material-ui/core';

import "./new-player-voting-layout.css";

export const commonerButton = "commonerButton";

const useStyles = makeStyles({
    votingButtonStyle: {
        margin: "5%"
    },
});

// Need to work on the button value.
export const NormalPlayerVotingLayout = ({players, playerIndex, handleVotingButtonClick}) => {
    // Disclaimer page first
    const classes = useStyles();
    return (
        <div className="d-flex align-self-center flex-column">
            <div className="p2 voting-title">
                Hi {players[playerIndex]['name']}! Please vote for the spy.
            </div>
            <div className="d-flex p2 flex-row justify-content-center">
                {players.map(player => {
                    // one does not vote for oneself
                    if (player === players[playerIndex]) {
                        return null;
                    } else if (!player.inGame) {    // neither does one vote for one not in game
                        return null;
                    }
                    else {
                        return (<Button 
                            color="primary" 
                            key={player.id} 
                            variant="contained"
                            onClick={handleVotingButtonClick} 
                            id={commonerButton} 
                            value={player.id}
                            className={classes.votingButtonStyle}>
                            {player['name']}
                        </Button>)
                    }
                })}
            </div>
        </div>
    )
}

