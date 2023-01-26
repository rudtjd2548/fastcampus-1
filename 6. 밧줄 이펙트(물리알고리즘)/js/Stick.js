export default class Stick {
  constructor(p1, p2) {
    this.startPoint = p1
    this.endPoint = p2

    this.tension = 1
    this.color = '#999'
    this.length = this.startPoint.pos.dist(this.endPoint.pos)
  }

  update() {
    const dx = this.endPoint.pos.x - this.startPoint.pos.x
    const dy = this.endPoint.pos.y - this.startPoint.pos.y
    const dist = Math.sqrt(dx*dx + dy*dy)
    const diff = (this.length - dist) / dist * this.tension

    const offsetX = dx * diff * 0.5
    const offsetY = dy * diff * 0.5

    const m = this.endPoint.mass + this.startPoint.mass
    const m1 = this.endPoint.mass / m
    const m2 = this.startPoint.mass / m

    if (!this.startPoint.pinned) {
      this.startPoint.pos.x -= offsetX * m1
      this.startPoint.pos.y -= offsetY * m1
    }

    if (!this.endPoint.pinned) {
      this.endPoint.pos.x += offsetX * m2
      this.endPoint.pos.y += offsetY * m2
    }
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.strokeStyle = this.color
    ctx.moveTo(this.startPoint.pos.x, this.startPoint.pos.y)
    ctx.lineTo(this.endPoint.pos.x, this.endPoint.pos.y)
    ctx.stroke()
    ctx.closePath()
  }
}