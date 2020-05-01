import Ball from "/js/ball.js";
import Input from "/js/input.js";
import Obstacle from "/js/obstacle.js";

var GAME_WIDTH = 500;
var GAME_HEIGHT = 700;
var canvas = document.getElementById("game-screen");
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;
var ctx = canvas.getContext("2d");
console.log(ctx);

var ball = new Ball(GAME_WIDTH, GAME_HEIGHT);
var input = new Input(ball);
var obstacle = new Obstacle(GAME_WIDTH, GAME_HEIGHT);

function gameLoop(timeStamp) {
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  obstacle.draw(ctx);
  obstacle.update();
  ball.draw(ctx);
  ball.update();
  requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
