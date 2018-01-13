let getDetails;
let gotResponce = function () {
  if(this.responseText == '') return ;
  let status = JSON.parse(this.responseText);
  let moves = status.allMoves;
  let symbols = Object.keys(moves);
  symbols.reduce(function(moves,symbol){
    moves[symbol].forEach((pos)=>{
      document.getElementById(pos).innerText = symbol;
    });
    return moves;
  },moves);
  document.getElementById('display').innerText = status.message;
  if(status.hasCompleted){
    clearInterval(getDetails);
  }
}
let requestOnClick = function(event){
  let req = new XMLHttpRequest();
  let id = event.target.id;
  req.open('GET',"/cell.html?id="+id);
  req.addEventListener("load", gotResponce);
  req.send();
}
let updateBoard = function(){
  let req = new XMLHttpRequest();
  req.open('GET',"/updateBoard.html");
  req.addEventListener("load", gotResponce);
  req.send();
}
getDetails = setInterval(updateBoard,100);
