import LOCATIONS from '../shared/constants/locations';
import { getRandomInt } from './MathUtils';

export { setupPlayers }

function setupPlayers (numPlayers, numSpies) {
    return {
        gameLocation: getGameLocation(),
        spies : selectSpies(numPlayers, numSpies),
        numPlayers: numPlayers,
    };
}   

const selectSpies = (numPlayers, numSpies) => {
    var potentialSpySet = [];
    for (let i = 0 ; i < numPlayers; i++) {
        potentialSpySet.push(i);
    }
    var finalSpySet = new Set();
    // selecting spies
    for (let i = 0 ; i < numSpies; i++) {
        let selectedSpy = potentialSpySet[getRandomInt(potentialSpySet.length)]
        console.log(selectedSpy);
        potentialSpySet.splice(selectedSpy, 1);        
        finalSpySet.add(selectedSpy);
    }
    return finalSpySet;
}


const getGameLocation = () => {
    return LOCATIONS[getRandomInt(LOCATIONS.length)];
}
