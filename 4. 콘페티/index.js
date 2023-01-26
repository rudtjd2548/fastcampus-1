import Particle from "./js/Partcle.js"

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const dpr = window.devicePixelRatio > 1 ? 2 : 1
let canvasWidth = innerWidth
let canvasHeight = innerHeight
const interval = 1000 / 60

const particles = []

function init() {
  canvasWidth = innerWidth
  canvasHeight = innerHeight
  canvas.style.width = canvasWidth + 'px'
  canvas.style.height = canvasHeight + 'px'
  canvas.width = canvasWidth * dpr
  canvas.height = canvasHeight * dpr
  ctx.scale(dpr, dpr)
}

function confetti({ x, y, count, deg, colors, shapes, spread }) {
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(x, y, deg, colors, shapes, spread))
  }
}

function render() {
  let now, delta
  let then = Date.now()

  let deg = 0

  const frame = () => {
    requestAnimationFrame(frame)
    now = Date.now()
    delta = now - then
    if (delta < interval) return
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)

    deg += 1

    // confetti({
    //   x: 0,
    //   y: 0.5,
    //   count: 6,
    //   deg: -50,
    // })

    // confetti({
    //   x: 1,
    //   y: 0.5,
    //   count: 6,
    //   deg: -130,
    // })

    // confetti({
    //   x: 0,
    //   y: 0,
    //   count: 6,
    //   deg: 45,
    // })

    // confetti({
    //   x: 1,
    //   y: 0,
    //   count: 6,
    //   deg: 135,
    // })

    // confetti({
    //   x: 0.5,
    //   y: 0.5,
    //   count: 5,
    //   deg: 270,
    //   spread: 1
    // })

    confetti({
      x: 0.5, y: 0.5,
      count: 5,
      deg: 225 + deg,
      spread: 1
    })

    confetti({
      x: 0.5, y: 0.5,
      count: 5,
      deg: 90 + deg,
      spread: 1
    })

    confetti({
      x: 0.5, y: 0.5,
      count: 5,
      deg: 315 + deg,
      spread: 1
    })

    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update()
      particles[i].draw(ctx)

      if (particles[i].opacity < 0) particles.splice(i, 1)
      if (particles[i].y > canvasHeight) particles.splice(i, 1)
    }

    then = now - (delta % interval)
  }
  requestAnimationFrame(frame)
}

window.addEventListener('click', () => {
  confetti({
    x: 0,
    y: 0.5,
    count: 10,
    deg: -50
  })
})
window.addEventListener('resize', init)
window.addEventListener('load', () => {
  init()
  render()
})