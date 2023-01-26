import Background from "./Background.js"
import Coin from "./Coin.js"
import GameHandler from "./GameHandler.js"
import Player from "./Player.js"
import Score from "./Score.js"
import Wall from "./Wall.js"

export default class App {
  static canvas = document.querySelector('canvas')
  static ctx = App.canvas.getContext('2d')
  static dpr = devicePixelRatio > 1 ? 2 : 1
  static interval = 1000 / 60
  static width = 1024
  static height = 768

  constructor() {
    this.backgrounds = [
      new Background({ img: document.querySelector('#bg3-img'), speed: -1 }),
      new Background({ img: document.querySelector('#bg2-img'), speed: -2 }),
      new Background({ img: document.querySelector('#bg1-img'), speed: -4 }),
    ]
    this.gameHandler = new GameHandler(this)
    this.reset()
  }

  reset() {
    this.walls = [new Wall({ type: 'SMALL' })]
    this.player = new Player()
    this.coins = []
    this.score = new Score()
  }

  init() {
    App.canvas.width = App.width * App.dpr
    App.canvas.height = App.height * App.dpr
    App.ctx.scale(App.dpr, App.dpr)
    this.backgrounds.forEach(background => {
      background.update()
      background.draw()
    })
  }

  render() {
    let now, delta
    let then = Date.now()

    const frame = () => {
      requestAnimationFrame(frame)

      now = Date.now()
      delta = now - then
      if (delta < App.interval) return

      if (this.gameHandler.status !== 'PLAYING') return

      App.ctx.clearRect(0, 0, App.width, App.height)

      // 배경 관리
      this.backgrounds.forEach(background => {
        background.update()
        background.draw()
      })

      // 벽 관리
      for (let i = this.walls.length - 1; i >= 0; i--) {
        this.walls[i].update()
        this.walls[i].draw()

        // 벽 제거관련
        if (this.walls[i].isOutside) {
          this.walls.splice(i, 1)
          continue
        }
        // 새로운 벽 생성관련
        if (this.walls[i].canGenerateNext) {
          this.walls[i].generatedNext = true
          const newWall = new Wall({ type: Math.random() > 0.3 ? 'SMALL' : 'BIG' })
          this.walls.push(newWall)

          // 새로운 벽에 코인 랜덤 생성
          if (Math.random() < 1) {
            const x = newWall.x + newWall.width / 2
            const y = newWall.y2 - newWall.gapY / 2
            this.coins.push(new Coin(x, y, newWall.vx))
          }
        }
        // 벽과 플레이어 충돌관련
        if (this.walls[i].isColliding(this.player.boundingBox)) {
          this.gameHandler.status = 'FINISHED'
        }
      }

      // 플레이어 관리
      this.player.update()
      this.player.draw()

      if (this.player.y > App.height || this.player.y + this.player.height < 0) {
        this.gameHandler.status = 'FINISHED'
      }

      // 코인 관련
      for (let i = this.coins.length - 1; i >= 0; i--) {
        this.coins[i].update()
        this.coins[i].draw()

        if (this.coins[i].x + this.coins[i].width < 0) {
          this.coins.splice(i, 1)
          continue
        }

        if (this.coins[i].boundingBox.isColliding(this.player.boundingBox)) {
          this.coins.splice(i, 1)
          this.score.coinCount += 1
        }
      }

      // 점수 관련
      this.score.update()
      this.score.draw()

      then = now - (delta % App.interval)
    }
    requestAnimationFrame(frame)
  }
}