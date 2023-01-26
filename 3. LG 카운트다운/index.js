import Particle from './js/Particle.js'

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
const dpr = devicePixelRatio
const interval = 1000 / 60
let canvasWidth = innerWidth
let canvasHeight = innerHeight

let particles = []

function init() {
  canvasWidth = innerWidth
  canvasHeight = innerHeight
  canvas.style.width = canvasWidth + 'px'
  canvas.style.height = canvasHeight + 'px'
  canvas.width = canvasWidth * dpr
  canvas.height = canvasHeight * dpr
  ctx.scale(dpr, dpr)
}

function createRing() {
  const PARTICLE_NUM = 1000
  const r = innerHeight / 4
  for (let i = 0; i < PARTICLE_NUM; i++) {
    particles.push(new Particle(r))
  }
}

function render() {
  let now, delta
  let then = Date.now()

  const frame = () => {
    requestAnimationFrame(frame)
    now = Date.now()
    delta = now - then
    if (delta < interval) return
    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    particles.forEach((particle, i) => {
      particle.update()
      particle.draw(ctx)

      if (particle.opacity < 0) particles.splice(i, 1)
    })

    then = now - (delta % interval)
  }
  requestAnimationFrame(frame)
}

window.addEventListener('load', () => {
  init()
  render()
})

window.addEventListener('resize', init)
window.addEventListener('click', () => {
  const texts = document.querySelectorAll('span')
  const countDownOption = {
    scale: 1,
    opacity: 1,
    duration: 0.4,
    ease: 'Power4.easeOut'
  }
  gsap.fromTo(texts[0], { opacity: 0, scale: 5 }, {
    ...countDownOption
  })
  gsap.fromTo(texts[1], { opacity: 0, scale: 5 }, {
    ...countDownOption,
    delay: 1,
    onStart: () => texts[0].style.opacity = 0
  })
  gsap.fromTo(texts[2], { opacity: 0, scale: 5 }, {
    ...countDownOption,
    delay: 2,
    onStart: () => texts[1].style.opacity = 0
  })
  const ringImg = document.querySelector('#ring')
  gsap.fromTo(ringImg, { opacity: 1 }, {
    opacity: 0,
    duration: 1,
    delay: 3,
    onStart: () => {
      texts[2].style.opacity = 0
      createRing()
    }
  })
})