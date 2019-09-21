import roundEndStates from "../shared/constants/roundEndStates";

export const roundEndConclusion = (players, playerVotes) => {
    // TODO: correctly return the player eliminated
    var maxIndex = playerVotes.reduce((indexMax, x, i , playerVotes) => {
        return x > playerVotes[indexMax] ? i : indexMax
    }, 0)    
    if (isMultiplePlayersVoted) return {results: roundEndStates.Tie, playerIndexEliminated: -1};
    if (players[maxIndex]['spy']) return {results: roundEndStates.SpyEliminated, playerIndexEliminated: maxIndex};
    return {results: roundEndStates.CommonerEliminated, playerIndexEliminated: maxIndex}; 
}

const isMultiplePlayersVoted = function(playerVotes, maxCount) {
    var appeared = false;
    playerVotes.foreach(vote => {
        if (vote === maxCount && !appeared) {
            appeared = true
        } else if (vote === maxCount) {
            return true;
        }
    })
    return false;
}

export const removePlayerFromGame = (players, playerIndexToBeRemoved) => {
    players[playerIndexToBeRemoved].inGame = false;
    return players; 
}

export const stillHasSpiesInGame = (players) => {
    let noSpiesLeft = players.every(player => {
        if (player.spy && player.inGame) {
            return false;
        } else return true;
    })
    return !noSpiesLeft;
}