const assert = require('assert');
const Player = require('../src/player.js');
let test = {};

test["makeMove should update the moves in player object and getMoves should return the moves made by player"] = function(){
  let player = new Player('X');
  player.makeMove(4);
  player.makeMove(2);
  player.makeMove(3);
  assert.deepEqual([4,2,3],player.getMoves());
}

test["isWon should return true if the player made winning moves"] = function(){
  let player = new Player('O');
  player.makeMove(9);
  player.makeMove(1);
  player.makeMove(5);
  assert.ok(player.isWon());
}

test["isWon should return false if the player didnt made winning moves"] = function(){
  let player = new Player('O');
  player.makeMove(6);
  player.makeMove(1);
  player.makeMove(5);
  assert.ok(!player.isWon());
}

exports.test = test;
