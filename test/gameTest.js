const assert = require('assert');
const Game = require('../src/game.js')
let test = {};

test["getCurrentPlayer should return first player Object if even moves are made"] = function() {
  let game = new Game();
  assert.deepEqual(game.getCurrentPlayer(),game.players[0]);
  game.makeMove(1);
  game.makeMove(2);
  assert.deepEqual(game.getCurrentPlayer(),game.players[0]);

}

test["getNextPlayer should return second player Object if odd moves are made"] = function() {
  let game = new Game();
  game.makeMove(8);
  assert.deepEqual(game.getCurrentPlayer(),game.players[1]);
}

test["doesPositionOccupied should return true if the position is occupied already"] = function() {
  let game = new Game();
  game.makeMove(1);
  assert.ok(game.doesPositionOccupied(1));
}

test["doesPositionOccupied should return false if the position is'nt occupied already"] = function() {
  let game = new Game();
  assert.ok(!game.doesPositionOccupied(1));
}

test["isDraw should return true if all positions are occupied"] = function(){
  let game = new Game();
  game.makeMove(1);
  game.makeMove(2);
  game.makeMove(3);
  game.makeMove(4);
  game.makeMove(5);
  game.makeMove(6);
  game.makeMove(7);
  game.makeMove(8);
  game.makeMove(9);
  assert.ok(game.isDraw());
}

test["isDraw should return false if all positions aren't occupied"] = function(){
  let game = new Game();
  game.makeMove(8);
  game.makeMove(9);
  assert.ok(!game.isDraw());
}

exports.test = test;
