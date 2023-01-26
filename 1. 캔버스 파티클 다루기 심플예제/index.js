const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const dpr = window.devicePixelRatio

let canvasWidth
let canvasHeight

const randomNumBetween = (min, max) => {
  return Math.random() * (max - min + 1) + min
}
let particles

let interval = 1000 / 60
let now, delta
let then = Date.now()

const feGaussianBlur = document.querySelector('feGaussianBlur')
const feColorMatrix = document.querySelector('feColorMatrix')

const controls = new function () {
  this.blurValue = 40
  this.alphaChannel = 100
  this.alphaOffset = -23
  this.acc = 1.03
}
let gui = new dat.GUI()

const f1 = gui.addFolder('Gooey Effect')
f1.open()
f1.add(controls, 'blurValue', 0, 100).onChange(v => {
  feGaussianBlur.setAttribute('stdDeviation', v)
})
f1.add(controls, 'alphaChannel', 1, 200).onChange(v => {
  feColorMatrix.setAttribute('values', `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${v} ${controls.alphaOffset}`)
})
f1.add(controls, 'alphaOffset', -40, 40).onChange(v => {
  feColorMatrix.setAttribute('values', `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${controls.alphaChannel} ${v}`)
})
const f2 = gui.addFolder('Particle Property')
f2.open()
f2.add(controls, 'acc', 1, 1.5, 0.01).onChange(v => {
  particles.forEach(particle => particle.acc = v)
})

class Particle {
  constructor(x, y, radius, vy) {
    this.x = x
    this.y = y
    this.radius = radius
    this.vy = vy
    this.acc = 1.03
  }
  update() {
    this.vy *= this.acc
    this.y += this.vy
  }
  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI / 180 * 360)
    ctx.fillStyle = 'orange'
    ctx.fill()
    ctx.closePath()
  }
}

function init() {
  canvasWidth = innerWidth
  canvasHeight = innerHeight

  canvas.width = canvasWidth * dpr
  canvas.height = canvasHeight * dpr
  ctx.scale(dpr, dpr)

  canvas.style.width = canvasWidth + 'px'
  canvas.style.height = canvasHeight + 'px'

  particles = []
  const TOTAL = canvasWidth / 10

  for (let i = 0; i < TOTAL; i++) {
    const x = randomNumBetween(0, canvasWidth)
    const y = randomNumBetween(0, canvasHeight)
    const radius = randomNumBetween(50, 100)
    const vy = randomNumBetween(1, 5)
    const particle = new Particle(x, y, radius, vy)
    particles.push(particle)
  }
}

function animate() {
  window.requestAnimationFrame(animate)
  now = Date.now()
  delta = now - then

  if (delta < interval) return

  ctx.clearRect(0, 0, canvasWidth, canvasHeight)

  particles.forEach(particle => {
    particle.update()
    particle.draw()

    if (particle.y - particle.radius > canvasHeight) {
      particle.y = -particle.radius
      particle.x = randomNumBetween(0, canvasWidth)
      particle.radius = randomNumBetween(50, 100)
      particle.vy = randomNumBetween(1, 5)
    }
  })

  then = now - (delta % interval)
}

window.addEventListener('load', () => {
  init()
  animate()
})

window.addEventListener('resize', () => {
  init()
})