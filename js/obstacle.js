export default class Obstacle {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.radius = 70;
    this.thick = 20;
    this.position = {
      x: gameWidth / 2,
      y: 300
    };
    this.startAngle = 0;
    this.colors = ["red", "blue", "green", "gold"];
    this.angularSpeed = 2;
  }

  draw(ctx) {
    for (var i = 0; i < 4; i++) {
      this.startAngle = this.startAngle + Math.PI / 2;
      var endAngle = this.startAngle + Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(this.position.x, this.position.y);
      ctx.arc(
        this.position.x,
        this.position.y,
        this.radius,
        this.startAngle,
        endAngle
      );
      ctx.closePath();
      ctx.fillStyle = this.colors[i];
      ctx.fill();
      ctx.strokeStyle = this.colors[i];
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.arc(
      this.position.x,
      this.position.y,
      this.radius - this.thick,
      0,
      Math.PI * 2,
      true
    );
    ctx.fillStyle = "#343a40";
    ctx.fill();
  }
  update() {
    this.startAngle += (this.angularSpeed / 180) * Math.PI;
  }
}
