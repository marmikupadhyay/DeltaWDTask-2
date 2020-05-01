import Game from "/js/game.js";

var GAME_WIDTH = 500;
var GAME_HEIGHT = 700;
var canvas = document.getElementById("game-screen");
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;
var menus = document.querySelectorAll(".menu");
menus.forEach(menu => {
  menu.style.width = GAME_WIDTH + "px";
  menu.style.height = GAME_HEIGHT + "px";
});
var ctx = canvas.getContext("2d");
console.log(ctx);

var game = new Game(GAME_WIDTH, GAME_HEIGHT);

function gameLoop(timeStamp) {
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  game.draw(ctx);
  game.update();
  requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
