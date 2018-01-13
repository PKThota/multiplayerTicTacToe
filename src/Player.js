let isSubset = function(set,superSet){
  return set.every(function(element){
    return superSet.includes(element);
  })
}

let Player = function(name,symbol){
  this.name = name;
  this.symbol = symbol;
  this.moves = [];
}

Player.prototype = {
  makeMove : function(position){
    this.moves.push(+position);
  },
  get getMoves(){
    return this.moves;
  },
  hasWon : function(){
    let winningCombinations = [
      [ 1, 2, 3 ],
      [ 4, 5, 6 ],
      [ 7, 8, 9 ],
      [ 1, 4, 7 ],
      [ 2, 5, 8 ],
      [ 3, 6, 9 ],
      [ 1, 5, 9 ],
      [ 3, 5, 7 ]
    ];
    let moves = this.moves;
    return winningCombinations.some(function(combination){
      return isSubset(combination,moves)
    });
  },
  get getSymbol(){
    return this.symbol;
  },
  getReadyForNewGame : function(){
    this.moves = [];
  }
}

module.exports = Player;
