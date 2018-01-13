const http = require('http');
const fs = require('fs');
const qs = require('querystring');
const Game = require('./src/Game.js');

const PORT = process.argv[ process.argv.length - 1] || 8080;
const symbols = ['X','O'];
const maxPlayers = 2;
const players = {};
let status = {};
let game = new Game();

const getPlayersIPs = ()=> Object.keys(players);

const getCurrentPlayer = ()=> game.getCurrentPlayer;

const getNextPlayer = ()=> game.getNextPlayer;

const newSymbol = ()=> symbols[noOfPlayingCurrently()];

const noOfPlayingCurrently = ()=> game.getNoOfPlayers;

const extractData = (url)=> qs.parse(url.split('?')[1]);

const extractIP = (remoteAddress)=>{
  let components = remoteAddress.split(':');
  return components[components.length - 1];
}

const getGameInfo = function(){
  status = game.getStatus;
  return status;
}

const updateCell = function(pos,res){
  game.makeMove(pos);
  let status = getGameInfo();
  game.updatePlayers();
  res.statusCode = 200;
  res.write(JSON.stringify(status));
}

const selectedPosition = function(position,res){
  if(game.doesPositionOccupied(position)){
    return;
  }
  updateCell(position,res);
}

const handleClick = function(req,res){
  if (status.hasCompleted) {
    return ;
  }
  let currentPlayer = getCurrentPlayer();
  let requestedBy = extractIP(req.connection.remoteAddress);
  let cell = req.url.split('=')[1];
  if(currentPlayer.symbol != players[requestedBy].symbol){
    return ;
  }
  selectedPosition(cell,res);
}

const handleJoinRequest = function(req,res){
  let player = req.userData;
  player.symbol = newSymbol();
  IP = extractIP(req.connection.remoteAddress);
  let playersIPs = getPlayersIPs();
  if(noOfPlayingCurrently() < maxPlayers){
    players[IP] = player;
    game.addPlayer(player.name,player.symbol);
    res.writeHead(302,{"location":"/waiting.html"})
    console.log(player);
    return ;
  }
  res.write("Max player count reached");
}

const handleUpdateBoard = function(req,res){
  res.write(JSON.stringify(getGameInfo()));
}

const handleStartGame = function(req,res){
  if(noOfPlayingCurrently() >= maxPlayers){
    game.updateStatus();
    let redirect = {
      "goto" : "/gamePage.html"
    }
    res.write(JSON.stringify(redirect));
  }
}

let pages = {
  "/cell" : handleClick,
  "/join" : handleJoinRequest,
  "/updateBoard" : handleUpdateBoard,
  "/startGame" : handleStartGame
}

const isSpecialRequest = (page) => Object.keys(pages).includes(page);

const handleRequest = function(req,res){
  let url = (req.url=='/') ? '/index.html' : req.url;
  if(!url.startsWith('/updateBoard') || !url.startsWith('/startGame')) console.log(`Requested for ${url}`);
  if(fs.existsSync('.'+url)){
    res.write(fs.readFileSync('.'+url,'utf8'));
    res.end();
    return ;
  }
  req.userData = extractData(url);
  let page = url.split('.')[0];
  if(!isSpecialRequest(page)){
    res.statusCode = 404;
    res.end();
    return;
  }
  pages[page](req,res)
  res.end();
}

let server = http.createServer(handleRequest);

server.listen(PORT);

console.log(`Listening to ${PORT}`);
