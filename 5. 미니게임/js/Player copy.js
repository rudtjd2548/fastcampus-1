import App from "./App.js"

export default class Player {
  constructor() {
    this.img = document.querySelector('#bird3-img')
    this.x = App.width * 0.1
    this.y = App.height / 2
    this.width = 130
    this.height = this.width * (174 / 164.6667)

    this.counter = 1
    this.animationSpeed = 5
    this.frameX = 0
    this.frameY = 0
    this.numOfFrameX = 5
    this.numOfFrameY = 3
    this.totalSprite = 14
    this.offsetX = -5
    this.offsetY = 5
  }
  update() {
    if (this.frameY * this.numOfFrameX + (this.frameX + 1) === this.totalSprite) {
      this.frameX = 0
      this.frameY = 0
      return
    }
    if (++this.counter % this.animationSpeed === 0) {
      if (++this.frameX % this.numOfFrameX === 0) {
        this.frameX = 0
        if (++this.frameY % this.numOfFrameY === 0) {
          this.frameY = 0
        }
      }
    }
  }
  draw() {
    App.ctx.drawImage(
      this.img,
      this.img.width * (this.frameX / this.numOfFrameX) + this.offsetX,
      this.img.height * (this.frameY / this.numOfFrameY) + this.offsetY,
      this.img.width / this.numOfFrameX,
      this.img.height / this.numOfFrameY,
      this.x, this.y, this.width, this.height
    )
  }
}