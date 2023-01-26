export default class GameHandler {
  constructor(app) {
    this.app = app
    this._status = 'READY'

    this.init()
  }
  get status() {
    return this._status
  }
  set status(value) {
    this._status = value

    switch (value) {
      case 'READY': this.showReadyScreen(); break
      case 'FINISHED': this.showFinishScreen(); break
    }
  }

  init() {
    this.readyScreen = document.querySelector('.ready-screen')
    this.titleImage = this.readyScreen.querySelector('.title-img')
    this.playBtn = this.readyScreen.querySelector('.play-img')
    this.playBtn.addEventListener('click', () => {
      this.hideReadyScreen()
    })

    this.finishScreen = document.querySelector('.finish-screen')
    this.distanceText = this.finishScreen.querySelector('.distance')
    this.coinText = this.finishScreen.querySelector('.coin')
    this.replayBtn = this.finishScreen.querySelector('.replay-img')
    this.replayBtn.addEventListener('click', () => {
      this.hidieFinishScreen()
    })

    this.status = 'READY'
  }

  showReadyScreen() {
    gsap.to(this.titleImage, {
      scale: 1, rotation: 720, opacity: 1, duration: 0.5
    })
    gsap.to(this.playBtn, {
      scale: 1, duration: 1, ease: Elastic.easeOut.config(2, 0.5), delay: 0.5
    })
  }

  hideReadyScreen() {
    gsap.to(this.readyScreen, {
      opacity: 0, pointerEvents: 'none', duration: 0.3, onComplete: () => {
        this.status = 'PLAYING'
      }
    })
  }

  showFinishScreen() {
    this.distanceText.innerText = Math.floor(this.app.score.distCount) + 'm'
    this.coinText.innerText = this.app.score.coinCount + ' coin'

    gsap.fromTo(this.finishScreen, { opacity: 0 }, {
      opacity: 1, duration: 0.5, pointerEvents: 'all'
    })
    gsap.fromTo(this.distanceText, { opacity: 0, scale: 0 }, {
      opacity: 1, scale: 1, duration: 0.5, delay: 1
    })
    gsap.fromTo(this.coinText, { opacity: 0, scale: 0 }, {
      opacity: 1, scale: 1, duration: 0.5, delay: 1.1
    })
    gsap.fromTo(this.replayBtn, { opacity: 0, scale: 0, rotation: 0 }, {
      opacity: 1, scale: 1, rotation: 720, duration: 0.5, delay: 1.3
    })
  }

  hidieFinishScreen() {
    gsap.fromTo(this.finishScreen, { opacity: 1 }, {
      opacity: 0, pointerEvents: 'none', duration: 0.1
    })

    this.status = 'PLAYING'
    this.app.reset()
  }
}