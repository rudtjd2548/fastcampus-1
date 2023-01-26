import { randomNumBetween } from "./utils.js"

export default class Particle {
  constructor(r) {
    this.r = r
    this.angle = randomNumBetween(0, 360)

    this.rAlpha = randomNumBetween(0, 5)
    this.rFriction = randomNumBetween(0.95, 1.01)

    this.angleAlpha = randomNumBetween(1, 2)
    this.angleFriction = randomNumBetween(0.97, 0.99)

    this.opacity = randomNumBetween(0.2, 1)
  }
  update() {
    this.rAlpha *= this.rFriction
    this.r += this.rAlpha

    this.angleAlpha *= this.angleFriction
    this.angle += this.angleAlpha

    this.x = innerWidth / 2 + this.r * Math.cos(Math.PI / 180 * this.angle)
    this.y = innerHeight / 2 + this.r * Math.sin(Math.PI / 180 * this.angle)

    this.opacity -= 0.003
  }
  draw(ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, 1, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
    ctx.fill()
    ctx.closePath()
  }
}