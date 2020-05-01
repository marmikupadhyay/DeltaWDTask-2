import Ball from "/js/ball.js";
import Input from "/js/input.js";
import Obstacle from "/js/obstacle.js";

const GAMESTATE = {
  paused: 0,
  running: 1,
  menu: 2,
  gameover: 3,
  newlevel: 4,
  gamecomplete: 5
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameHeight = gameHeight;
    this.gameWidth = gameWidth;
    this.gameState = GAMESTATE.menu;
    this.ball = new Ball(this);
    this.obstacle = new Obstacle(this);
    this.lives = 1;
    this.objects = [];
    new Input(this);
    this.gameState = 2;

    document.getElementById("play").addEventListener("click", e => {
      e.target.parentElement.parentElement.className += " hide";
      this.gameState = 1;
    });
    document.getElementById("scores").addEventListener("click", e => {
      e.target.parentElement.parentElement.nextElementSibling.classList.remove(
        "hide"
      );
      e.target.parentElement.parentElement.className += " hide";
      this.gameState = 2;
    });
    document.getElementById("back").addEventListener("click", e => {
      e.target.parentElement.parentElement.previousElementSibling.classList.remove(
        "hide"
      );
      e.target.parentElement.parentElement.className += " hide";
      this.gameState = 2;
    });
  }
  start() {
    if (
      this.gameState != GAMESTATE.menu &&
      this.gameState != GAMESTATE.newlevel
    )
      return;
    this.gameState = GAMESTATE.running;
  }

  update() {
    if (
      this.gameState == GAMESTATE.paused ||
      this.gameState === GAMESTATE.menu ||
      this.gameState === GAMESTATE.gameover ||
      this.gameState === GAMESTATE.gamecomplete
    )
      return;
    this.ball.update(this);
    if (this.lives < 0) {
      this.gameState = GAMESTATE.gameover;
    }
    this.obstacle.update(this);
  }

  draw(ctx) {
    if (this.gameState === GAMESTATE.gameover) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.fill();
      ctx.font = "32px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("GameOver", this.gameWidth / 2, this.gameHeight / 2);
    }
    if (this.gameState === GAMESTATE.gamecomplete) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.fill();
      ctx.font = "32px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("GameComplete", this.gameWidth / 2, this.gameHeight / 2);
    }
    if (this.gameState === GAMESTATE.paused) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fill();
      ctx.font = "32px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
    }
    this.obstacle.draw(ctx);
    this.ball.draw(ctx);
    ctx.rect(400, 0, 20, 20);
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(`Level: ${this.currentLevel + 1}`, 400, 20);
  }

  togglePause() {
    if (this.gameState === GAMESTATE.paused) {
      this.gameState = GAMESTATE.running;
    } else this.gameState = GAMESTATE.paused;
  }
}
