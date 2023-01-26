import CanvasOption from './CanvasOption.js'
import { randomFloatBetween, randomNumBetween } from './utils.js'

export default class Particle extends CanvasOption {
  constructor(x, y, colorDeg) {
    super()
    this.angle = Math.PI / 180 * randomNumBetween(0, 360)
    this.r1 = 1
    this.r2 = 10
    this.r = randomFloatBetween(this.r1, this.r2, 1)
    this.x = x
    this.y = y
    this.vx = this.r * Math.cos(this.angle) * this.canvasHeight * 0.002
    this.vy = this.r * Math.sin(this.angle) * this.canvasHeight * 0.002
    this.radius = 2
    this.gravity = 0.12
    this.friction = 0.93
    this.rotation = randomNumBetween(0, 360)
    this.opacity = randomNumBetween(0.9, 1)
    this.colorDeg = colorDeg
    this.colorRange = randomNumBetween(this.colorDeg % 360, (this.colorDeg + 30) % 360)
  }

  update() {
    this.rotation += 1
    this.opacity -= 0.02

    this.vy += this.gravity

    this.vx = this.vx * this.friction
    this.vy = this.vy * this.friction

    this.y += this.vy
    this.x += this.vx
  }

  draw() {
    this.ctx.fillStyle = this.color
    this.ctx.fillStyle = `hsla(${this.colorRange}, 100%, 65%, ${this.opacity})`
    this.ctx.beginPath()
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    this.ctx.fill()
    this.ctx.closePath()
  }
}