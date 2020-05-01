export default class Ball {
  constructor(gameWidth, gameHeight) {
    this.gameHeight = gameHeight;
    this.gameWidth = gameWidth;
    this.radius = 10;
    this.gravity = 9.8;
    this.position = {
      x: gameWidth / 2,
      y: gameHeight - 100
    };
    this.maxSpeed = {
      x: 0,
      y: 0
    };
    this.speed = {
      x: 0,
      y: this.maxSpeed.y
    };
  }
  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }
  update() {
    this.speed.y += this.gravity / 100;
    this.position.y += this.speed.y;
  }
}
