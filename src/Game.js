let Player = require("./Player.js")

let Game = function(){
  this.players = {};
  this.symbols = ["X","O"];
  this.allMoves = [];
  this.currentPlayer = {};
  this.nextPlayer = {};
  this.status = {};
}

Game.prototype = {
  get getNoOfPlayers(){
    return Object.keys(this.players).length;
  },
  get getCurrentPlayer(){
    return this.currentPlayer;
  },
  get getNextPlayer(){
    return this.nextPlayer;
  },
  get getPlayers(){
    return this.players;
  },
  get getStatus(){
    return this.status;
  },
  isDraw : function(){
    return this.allMoves.length == 9;
  },
  get getEachPlayerMoves(){
    let moves = {};
    moves['X'] = this.players['X'].getMoves;
    moves['O'] = this.players['O'].getMoves;
    return moves;
  },
  updatePlayers : function(){
    let symbols = this.symbols;
    let movesMade = this.allMoves.length;
    let currentPlayerIndex = movesMade % 2;
    let nextPlayerIndex = 1 - currentPlayerIndex;
    this.currentPlayer = this.players[ symbols[currentPlayerIndex] ];
    this.nextPlayer = this.players[ symbols[nextPlayerIndex] ];
  },
  addPlayer : function(playerName,symbol){
    let player = new Player(playerName,symbol);
    this.players[symbol] = player;
    this.updatePlayers();
  },
  makeMove : function(pos){
    let currentPlayer = this.getCurrentPlayer;
    this.allMoves.push(pos);
    currentPlayer.makeMove(pos);
    this.updatePlayers();
    this.updateStatus();
  },
  doesPositionOccupied : function(position){
    return this.allMoves.includes(position);
  },
  reset : function(){
    this.allMoves = [];
    this.symbols.forEach((symbol)=>{
      this.players[symbol].getReadyForNewGame();
    })
    this.updatePlayers();
    this.updateStatus();
  },
  updateStatus : function(){
    let currentPlayer = this.getCurrentPlayer;
    let nextPlayer = this.getNextPlayer;
    this.status.hasCompleted = false;
    if(currentPlayer.hasWon()){
        this.status.message = `${currentPlayer.name} won`;
        this.status.hasCompleted = true;
      }else if (nextPlayer.hasWon()) {
        this.status.message = `${nextPlayer.name} won`;
        this.status.hasCompleted = true;
      }else if(this.isDraw()){
        this.status.message = `Game Drawn`;
        this.status.hasCompleted = true;
      }else{
      this.status.message = `${currentPlayer.name}'s turn`
    }
    this.status.allMoves = this.getEachPlayerMoves;
  }
}

module.exports = Game;
