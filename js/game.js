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
    this.obstacles = [];
    var params = {
      x: this.gameWidth / 2,
      y: 300,
      angle: 10
    };
    this.obstacles.push(new Obstacle(this, params));
    for (var i = 0; i < 10; i++) {
      var params = {
        x: this.gameWidth / 2,
        y:
          this.obstacles[this.obstacles.length - 1].position.y -
          getRndInt(250, 450),
        angle: getRndInt(0, 360)
      };
      this.obstacles.push(new Obstacle(this, params));
    }

    this.lives = 1;
    new Input(this);
    this.gameState = 2;

    this.counter = 1;
    this.ops = 400;
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
    if (this.counter % 6000 == 0) {
      this.counter = 0;
      console.log("what");
    }

    if (this.obstacles.length < 10) {
      var params = {
        x: this.gameWidth / 2,
        y:
          this.obstacles[this.obstacles.length - 1].position.y -
          getRndInt(250, 450),
        angle: getRndInt(0, 360)
      };
      this.obstacles.push(new Obstacle(this, params));
    }

    this.counter++;
    this.obstacles.forEach(obstacle => {
      obstacle.update(this);
    });
    this.obstacles = this.obstacles.filter(object => !object.markedForDeletion);
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
    this.obstacles.forEach(obstacle => {
      obstacle.draw(ctx);
    });
    this.ball.draw(ctx);
  }

  togglePause() {
    if (this.gameState === GAMESTATE.paused) {
      this.gameState = GAMESTATE.running;
    } else this.gameState = GAMESTATE.paused;
  }
}
function getRndInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
