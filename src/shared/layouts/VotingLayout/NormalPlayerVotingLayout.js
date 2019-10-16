import React from 'react';
import { Button } from '@material-ui/core';

export const commonerButton = "commonerButton";

// Need to work on the button value.
export const NormalPlayerVotingLayout = ({players, playerIndex, handleVotingButtonClick}) => {
    // Disclaimer page first
    return (
        <div className="d-flex align-self-center flex-column">
            <div className="p2">
                Hi {players[playerIndex]['name']}! Please vote for the spy.
            </div>
            <div className="p2">
                {players.map(player => {
                    // one does not vote for oneself
                    if (player === players[playerIndex]) {
                        return null;
                    } else if (!player.inGame) {    // neither does one vote for one not in game
                        return null;
                    }
                    else {
                        return (<Button color="primary" key={player.id} onClick={handleVotingButtonClick} id={commonerButton} value={player.id}>
                            {player['name']}
                        </Button>)
                    }
                })}
            </div>
        </div>
    )
}