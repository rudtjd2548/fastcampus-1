export default class CanvasOption {
  constructor() {
    this.canvas = document.querySelector('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.dpr = devicePixelRatio > 1 ? 2 : 1
    this.fps = 60
    this.interval = 1000 / this.fps
    this.canvasWidth = innerWidth
    this.canvasHeight = innerHeight
    this.bgColor = '#000000'
  }
}