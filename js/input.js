export default class InputHandler {
  constructor(game) {
    document.addEventListener("keypress", event => {
      switch (event.keyCode) {
        case 32:
          game.ball.speed.y = -4;
          if (game.ball.position.y < game.ball.gameHeight / 2) {
            game.obstacles.forEach(obstacle => {
              obstacle.speed.y = 4;
            });
          }
          break;
      }
    });
    document.addEventListener("keyup", event => {
      switch (event.keyCode) {
      }
    });
  }
}
