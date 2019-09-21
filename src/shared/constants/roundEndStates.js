// These are the possible states at the end of a round
const roundEndStates = {
    SpyEliminated: "SpyEliminated",
    CommonerEliminated: "CommonerEliminated",
    Tie: "Tie"  // This is the case when multiple people have been selected
}

export default roundEndStates;