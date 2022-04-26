class Obstacle {
  constructor(ctx, x0, y0, img) {
    this.ctx = ctx;
    this.img = img;
    this.speedX = -10;
    this.speedY = 0;
    this.width = 100;
    this.height = 100;
    this.x = x0 - this.width - 20;
    this.y = y0 - this.height - 20;
  }

  move(frameId) {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  draw(frameId) {
    if (!this.img) this.ctx.fillRect(this.x, this.y, this.width, this.height);
    else this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}
