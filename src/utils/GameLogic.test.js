var assert = require("chai").assert;

var gameLogic = require("./GameLogic");
var roundEndStates = require("../shared/constants/roundEndStates");

describe("GameLogic", function() {
    describe("#stillHasSpiesInGame", function() {
        it("should return true when there are still spies in game", function() {
            var playersInGame = [
            {
                name: "player1",
                spy: true,
                spyChosenLocation: "random",
                inGame: true,
            },
            {
                name: "player2",
                spy: false,
                spyChosenLocation: "",
                inGame: false,
            },
            {
                name: "player3",
                spy: true,
                spyChosenLocation: "",
                inGame: false
            },
            {
                name: "player4",
                spy: false,
                spyChosenLocation: "",
                inGame: true
            }
        ]
        assert.equal(gameLogic.stillHasSpiesInGame(playersInGame), true);
        })

        it("should return false when there are no spies in game", function() {
            var playersInGame = [
            {
                name: "player1",
                spy: true,
                spyChosenLocation: "random",
                inGame: false,
            },
            {
                name: "player2",
                spy: false,
                spyChosenLocation: "",
                inGame: true,
            },
            {
                name: "player3",
                spy: true,
                spyChosenLocation: "",
                inGame: false
            },
            {
                name: "player4",
                spy: false,
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
                    name: "player1",
                    spy: true,
                    spyChosenLocation: "random",
                    inGame: true,
                },
                {
                    name: "player2",
                    spy: true,
                    spyChosenLocation: "random",
                    inGame: true,
                },
                {
                    name: "player3",
                    spy: false,
                    spyChosenLocation: "",
                    inGame: true
                },
                {
                    name: "player4",
                    spy: false,
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
                    name: "player1",
                    spy: true,
                    spyChosenLocation: "random",
                    inGame: true,
                },
                {
                    name: "player2",
                    spy: true,
                    spyChosenLocation: "random",
                    inGame: true,
                },
                {
                    name: "player3",
                    spy: false,
                    spyChosenLocation: "",
                    inGame: true
                },
                {
                    name: "player4",
                    spy: false,
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
                    name: "player1",
                    spy: true,
                    spyChosenLocation: "random",
                    inGame: true,
                },
                {
                    name: "player2",
                    spy: true,
                    spyChosenLocation: "random",
                    inGame: true,
                },
                {
                    name: "player3",
                    spy: false,
                    spyChosenLocation: "",
                    inGame: true
                },
                {
                    name: "player4",
                    spy: false,
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
                    name: "player1",
                    spy: true,
                    spyChosenLocation: "random",
                    inGame: true,
                },
                {
                    name: "player2",
                    spy: true,
                    spyChosenLocation: "random",
                    inGame: true,
                },
                {
                    name: "player3",
                    spy: false,
                    spyChosenLocation: "",
                    inGame: true
                },
                {
                    name: "player4",
                    spy: false,
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
            assert.isFalse(playerIndexToRemove[playerIndexToRemove].inGame);
        })
    })
})