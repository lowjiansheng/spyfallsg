var assert = require("assert");
var gameLogic = require("./GameLogic");


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
    })
})