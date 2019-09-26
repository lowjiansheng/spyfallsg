var assert = require("chai").assert;

var gameLogic = require("./GameLogic");
var roundEndStates = require("../shared/constants/roundEndStates");

describe("GameLogic", function() {
    describe("#stillHasSpiesInGame", function() {
        it("should return true when there are still spies in game", function() {
            var playersInGame = [
            {
                id: 0,
                name: "player1",
                isSpy: true,
                spyChosenLocation: "random",
                inGame: true,
            },
            {
                id: 1,
                name: "player2",
                isSpy: false,
                spyChosenLocation: "",
                inGame: false,
            },
            {
                id: 2,
                name: "player3",
                isSpy: true,
                spyChosenLocation: "",
                inGame: false
            },
            {
                id: 3,
                name: "player4",
                isSpy: false,
                spyChosenLocation: "",
                inGame: true
            }
        ]
        assert.equal(gameLogic.stillHasSpiesInGame(playersInGame), true);
        })

        it("should return false when there are no spies in game", function() {
            var playersInGame = [
            {
                id: 0,
                name: "player1",
                isSpy: true,
                spyChosenLocation: "random",
                inGame: false,
            },
            {
                id: 1,
                name: "player2",
                isSpy: false,
                spyChosenLocation: "",
                inGame: true,
            },
            {
                id: 2,
                name: "player3",
                isSpy: true,
                spyChosenLocation: "",
                inGame: false
            },
            {
                id: 3,
                name: "player4",
                isSpy: false,
                spyChosenLocation: "",
                inGame: true
            }
        ]
        assert.equal(gameLogic.stillHasSpiesInGame(playersInGame), false);
        })
    })

    describe("#roundEndConclusion", function() {
        it("should return tie when there is equal votes", function() {
            var playersInGame = [
                {
                    id: 0,
                    name: "player1",
                    isSpy: true,
                    spyChosenLocation: "random",
                    inGame: true,
                },
                {
                    id: 1,
                    name: "player2",
                    isSpy: true,
                    spyChosenLocation: "random",
                    inGame: true,
                },
                {
                    id: 2,
                    name: "player3",
                    isSpy: false,
                    spyChosenLocation: "",
                    inGame: true
                },
                {
                    id: 3,
                    name: "player4",
                    isSpy: false,
                    spyChosenLocation: "",
                    inGame: true
                }
            ]
            var playerVotes = [1,2,3,3]
            assert.deepEqual(gameLogic.roundEndConclusion(playersInGame, playerVotes), {results: roundEndStates.default.Tie, playerIndexEliminated: -1});
            var playerVotes = [3,3,1,1]
            assert.deepEqual(gameLogic.roundEndConclusion(playersInGame, playerVotes), {results: roundEndStates.default.Tie, playerIndexEliminated: -1});
            var playerVotes = [3,1,3,1]
            assert.deepEqual(gameLogic.roundEndConclusion(playersInGame, playerVotes), {results: roundEndStates.default.Tie, playerIndexEliminated: -1});
            playerVotes = [1,1,1,1]
            assert.deepEqual(gameLogic.roundEndConclusion(playersInGame, playerVotes), {results: roundEndStates.default.Tie, playerIndexEliminated: -1});            
        })
        it("should return spy eliminated when spy has highest votes", function() {
            var playersInGame = [
                {
                    id: 0,
                    name: "player1",
                    isSpy: true,
                    spyChosenLocation: "random",
                    inGame: true,
                },
                {
                    id: 1,
                    name: "player2",
                    isSpy: true,
                    spyChosenLocation: "random",
                    inGame: true,
                },
                {
                    id: 2,
                    name: "player3",
                    isSpy: false,
                    spyChosenLocation: "",
                    inGame: true
                },
                {
                    id: 3,
                    name: "player4",
                    isSpy: false,
                    spyChosenLocation: "",
                    inGame: true
                }
            ]
            var playerVotes = [3,1,1,1]
            assert.deepEqual(gameLogic.roundEndConclusion(playersInGame, playerVotes), {results: roundEndStates.default.SpyEliminated, playerIndexEliminated: 0});
        })

        it("should return commoner eliminated when commoner has highest votes", function() {
            var playersInGame = [
                {
                    id: 0,
                    name: "player1",
                    isSpy: true,
                    spyChosenLocation: "random",
                    inGame: true,
                },
                {
                    id: 1,
                    name: "player2",
                    isSpy: true,
                    spyChosenLocation: "random",
                    inGame: true,
                },
                {
                    id: 2,
                    name: "player3",
                    isSpy: false,
                    spyChosenLocation: "",
                    inGame: true
                },
                {
                    id: 3,
                    name: "player4",
                    isSpy: false,
                    spyChosenLocation: "",
                    inGame: true
                }
            ]
            var playerVotes = [1,1,3,1]
            assert.deepEqual(gameLogic.roundEndConclusion(playersInGame, playerVotes), {results: roundEndStates.default.CommonerEliminated, playerIndexEliminated: 2});
        })
    })

    describe("#removePlayerFromGame", function() {
        it("should remove player from game", function() {
            var playersInGame = [
                {
                    id: 0,
                    name: "player1",
                    isSpy: true,
                    spyChosenLocation: "random",
                    inGame: true,
                },
                {
                    id: 1,
                    name: "player2",
                    isSpy: true,
                    spyChosenLocation: "random",
                    inGame: true,
                },
                {
                    id: 2,
                    name: "player3",
                    isSpy: false,
                    spyChosenLocation: "",
                    inGame: true
                },
                {
                    id: 3,
                    name: "player4",
                    isSpy: false,
                    spyChosenLocation: "",
                    inGame: true
                }
            ]
            let playerIndexToRemove = 2;
            gameLogic.removePlayerFromGame(playersInGame, playerIndexToRemove)
            assert.isFalse(playersInGame[playerIndexToRemove].inGame);
            playerIndexToRemove = 3;
            assert.isTrue(playersInGame[playerIndexToRemove].inGame);
            gameLogic.removePlayerFromGame(playersInGame, playerIndexToRemove);
            assert.isFalse(playersInGame[playerIndexToRemove].inGame);
        })
    })

    describe("#stillHasCommonersInGame", function() {
        it("should return true if more than 1 commoners are left in the game", function() {
            var playersInGame = [
                {
                    id: 0,
                    name: "player1",
                    isSpy: true,
                    spyChosenLocation: "random",
                    inGame: true,
                },
                {
                    id: 1,
                    name: "player2",
                    isSpy: false,
                    spyChosenLocation: "random",
                    inGame: false,
                },
                {
                    id: 2,
                    name: "player3",
                    isSpy: false,
                    spyChosenLocation: "",
                    inGame: true
                },
                {
                    id: 3,
                    name: "player4",
                    isSpy: false,
                    spyChosenLocation: "",
                    inGame: true
                }
            ]
            assert.isTrue(gameLogic.stillHasCommonersInGame(playersInGame));
        })

        it("should return false if only 1 commoners are left in the game", function() {
            var playersInGame = [
                {
                    id: 0,
                    name: "player1",
                    isSpy: true,
                    spyChosenLocation: "random",
                    inGame: true,
                },
                {
                    id: 1,
                    name: "player2",
                    isSpy: false,
                    spyChosenLocation: "random",
                    inGame: true,
                },
                {
                    id: 2,
                    name: "player3",
                    isSpy: false,
                    spyChosenLocation: "",
                    inGame: false
                },
                {
                    id: 3,
                    name: "player4",
                    isSpy: false,
                    spyChosenLocation: "",
                    inGame: false
                }
            ]
            assert.isFalse(gameLogic.stillHasCommonersInGame(playersInGame));
        })
    })
})