export default class InputHandler {
  constructor(ball) {
    document.addEventListener("keypress", event => {
      switch (event.keyCode) {
        case 32:
          ball.speed.y = -4;
          break;
      }
    });
    document.addEventListener("keyup", event => {
      switch (event.keyCode) {
      }
    });
  }
}
