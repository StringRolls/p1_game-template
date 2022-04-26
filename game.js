class Game {
  screen = 1; // 0= splash start, 1 = game, 2 = gamover
  points = 0;
  ctx = null;
  frameId = null;
  background = null;
  sounds = new Sounds();
  player = null;
  obstacles = [];

  init() {
    if (this.ctx === null) {
      this.ctx = document.getElementById("canvas").getContext("2d");
    }
    this.setCanvasToFullScreen();
    this.setEventHandlers();
    this.start();
  }

  start() {
    switch (this.screen) {
      case 0:
        this.displaySplashStart();
        break;
      case 1:
        this.reset();
        this.frameId = window.requestAnimationFrame(this.play.bind(this));
        break;
      case 2:
        break;
      default:
        console.log("This screen code is unknown!");
    }
  }

  setCanvasToFullScreen() {
    this.ctx.canvas.height = window.innerHeight;
    this.ctx.canvas.width = window.innerWidth;
  }

  setEventHandlers() {
    window.addEventListener("resize", this.setCanvasToFullScreen.bind(this));
    window.addEventListener("keydown", (event) => {
      if (event.code === "Space") this.player.jump();
    });
  }

  displaySplashStart() {
    const startButton = document.createElement("button");
    startButton.id = "game-start";
    startButton.textContent = "Start Game";
    startButton.onclick = () => {
      this.screen = 1;
      this.start();
      startButton.remove();
    };
    document.body.appendChild(startButton);
  }

  generateObstacle() {
    if (this.frameId > 100) {
      if (this.frameId % 150 === 0) {
        console.log("Obstacle generated");
        this.obstacles.push(
          new Obstacle(this.ctx, this.ctx.canvas.width, this.ctx.canvas.height)
        );
      }
    }
  }

  checkCollisions() {
    this.obstacles = this.obstacles.filter(
      (obstacle) => obstacle.x + obstacle.width > 0
    );
    this.obstacles.forEach((obstacle) => {
      if (
        this.player.x + this.player.width > obstacle.x &&
        this.player.x < obstacle.x + obstacle.width
      ) {
        if (this.player.y + this.player.height > obstacle.y) {
          console.log("collision");
        }
      }
    });
  }

  reset() {
    this.background = new Background(this.ctx);
    this.player = new Player(this.ctx);
    // this.sounds.play("main");
  }

  play() {
    this.background.move(this.frameId);
    this.player.move(this.frameId);
    this.generateObstacle();
    this.obstacles.forEach((obstacle) => obstacle.move(this.frameId));
    this.checkCollisions();
    this.background.draw(this.frameId);
    this.player.draw(this.frameId);
    this.obstacles.forEach((obstacle) => obstacle.draw(this.frameId));
    this.frameId = requestAnimationFrame(this.play.bind(this));
  }
}
