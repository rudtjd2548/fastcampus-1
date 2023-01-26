import CanvasOption from "./js/CanvasOption.js"
import Particle from "./js/Particle.js"
import Spark from "./js/Spark.js"
import Tail from "./js/Tail.js"
import { randomFloatBetween, randomIntBetween, randomNumBetween } from "./js/utils.js"

class Canvas extends CanvasOption {
  constructor() {
    super()

    this.particles = []
    this.tails = []
    this.sparks = []
  }

  init() {
    this.canvasWidth = innerWidth
    this.canvasHeight = innerHeight

    this.canvas.width = this.canvasWidth * this.dpr
    this.canvas.height = this.canvasHeight * this.dpr
    this.ctx.scale(this.dpr, this.dpr)

    this.canvas.style.width = this.canvasWidth + 'px'
    this.canvas.style.height = this.canvasHeight + 'px'
  }

  createTail() {
    const x = randomIntBetween(this.canvasWidth * 0.2, this.canvasWidth * 0.8)
    const vy = randomIntBetween(this.canvasHeight / 30, this.canvasHeight / 25) * -1
    this.tails.push(new Tail(x, vy))
  }

  createFirework(x, y) {
    const PARTICLE_NUM = 100
    const colorDeg = randomIntBetween(0, 360)
    for (let i = 0; i < PARTICLE_NUM; i++) {
      this.particles.push(new Particle(x, y, colorDeg))
    }
  }

  render() {
    let now, delta
    let then = Date.now()

    const frame = () => {
      requestAnimationFrame(frame)
      now = Date.now()
      delta = now - then

      if (delta < this.interval) return

      this.ctx.fillStyle = this.bgColor + '40'
      this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight)

      this.ctx.fillStyle = `rgba(255, 255, 255, ${this.particles.length / 40000})`
      this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight)

      if (Math.random() < 0.015) this.createTail()

      this.tails.forEach((tail, i) => {
        tail.update()
        tail.draw()

        for (let i = 0; i < Math.round(Math.abs(tail.vy * 0.3)); i++) {
          const vx = randomNumBetween(-5, 5) * 0.01
          const vy = randomNumBetween(-30, 30) * 0.01
          const opacity = randomNumBetween(5, 7) * 0.1
          const spark = new Spark(tail.x, tail.y, vx, vy, opacity)
          this.sparks.push(spark)
        }

        if (tail.opacity <= 0.05) {
          this.tails.splice(i, 1)
          this.createFirework(tail.x, tail.y)
        }
      })

      this.sparks.forEach((spark, i) => {
        spark.update()
        spark.draw()
        if (spark.opacity <= 0.05) {
          this.sparks.splice(i, 1)
        }
      })

      this.particles.forEach((particle, i) => {
        particle.update()
        particle.draw()

        if (Math.random() < 0.1) {
          const opacity = randomNumBetween(0.2, 0.5)
          const spark = new Spark(particle.x, particle.y, 0, 0, opacity)
          this.sparks.push(spark)
        }

        if (particle.opacity <= 0) this.particles.splice(i, 1)
      })

      then = now - (delta % this.interval)
    }

    requestAnimationFrame(frame)
  }
}

const canvas = new Canvas()

window.addEventListener('load', () => {
  canvas.init()
  canvas.render()
})

window.addEventListener('resize', () => {
  canvas.init()
})