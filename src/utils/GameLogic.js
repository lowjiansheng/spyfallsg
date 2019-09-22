import roundEndStates from "../shared/constants/roundEndStates";

export const roundEndConclusion = (players, playerVotes) => {
    // assumption: players who are not in game will not be voted. they should be filtered
    // away when displaying voting choices
    if (playerVotes.length != players.length) {
        throw "Invalid length of players and playerVotes.";
    }
    var maxIndex = playerVotes.reduce((indexMax, x, i , playerVotes) => {
        return x > playerVotes[indexMax] ? i : indexMax
    }, 0)    
    if (isMultiplePlayersVoted(playerVotes, Math.max.apply(null, playerVotes))) return {results: roundEndStates.Tie, playerIndexEliminated: -1};
    if (players[maxIndex]['spy']) return {results: roundEndStates.SpyEliminated, playerIndexEliminated: maxIndex};
    return {results: roundEndStates.CommonerEliminated, playerIndexEliminated: maxIndex}; 
}

const isMultiplePlayersVoted = function(playerVotes, maxCount) {
    var appeared = false;
    for (var playerVote of playerVotes) {
        if (playerVote === maxCount && !appeared) {
            appeared = true;
        } else if (playerVote === maxCount) {
            return true;
        }
    }
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