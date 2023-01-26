import { useEffect, useRef, useState } from 'react'
import { Engine, Render, Runner, Mouse, MouseConstraint, Composite, Bodies, Events } from 'matter-js'

import '../style/containers/RotateCanvas.css'

import IconAFRAME from '../assets/icon_AFRAME.png'
import IconCSS from '../assets/icon_CSS.png'
import IconHTML from '../assets/icon_HTML.png'
import IconJS from '../assets/icon_JS.png'
import IconREACT from '../assets/icon_REACT.png'
import IconTHREE from '../assets/icon_THREE.png'

const data = {
  'JS': { title: 'Javascript', level: 4, desc: '자바스크립트에 대한 설명이라고 할 수 있습니다. 자바스크립트에 대한 설명. 자바스크립트에 대한 설명.' },
  'REACT': { title: 'React.js', level: 5, desc: 'React에 대한 설명이라고 할 수 있습니다. React에 대한 설명. React에 대한 설명.' },
  'CSS': { title: 'CSS/SASS', level: 3, desc: 'CSS에 대한 설명이라고 할 수 있습니다. CSS에 대한 설명. CSS에 대한 설명.' },
  'AFRAME': { title: 'Aframe.js', level: 4, desc: 'AFRAME에 대한 설명이라고 할 수 있습니다. AFRAME에 대한 설명. AFRAME에 대한 설명.' },
  'THREE': { title: 'Three.js', level: 2, desc: 'THREE에 대한 설명이라고 할 수 있습니다. THREE에 대한 설명. THREE에 대한 설명.' },
  'HTML': { title: 'HTML', level: 5, desc: 'HTML에 대한 설명이라고 할 수 있습니다. HTML에 대한 설명. HTML에 대한 설명.' },
}

const RotateCanvas = () => {
  const [selected, setSelected] = useState(data['JS'])
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const cw = 1000
    const ch = 1000

    const garvityPower = 0.5
    let gravityDeg = 0

    let engine, render, runner, mouse, mouseConstraint

    let observer

    initScene()
    initMouse()
    initIntersectionObserver()
    initGround()
    initImageBoxes()

    Events.on(mouseConstraint, 'mousedown', () => {
      const newSelected = mouseConstraint.body && data[mouseConstraint.body.label]
      newSelected && setSelected(newSelected)
    })

    Events.on(runner, 'tick', () => {
      gravityDeg += 1
      engine.world.gravity.x = garvityPower * Math.cos(Math.PI / 180 * gravityDeg)
      engine.world.gravity.y = garvityPower * Math.sin(Math.PI / 180 * gravityDeg)
    })

    function initScene() {
      engine = Engine.create()
      render = Render.create({
        canvas: canvas,
        engine: engine,
        options: { width: cw, height: ch, wireframes: false, background: '#1b1b19' }
      })
      runner = Runner.create()

      Render.run(render)
      Runner.run(runner, engine)
    }
    function initMouse() {
      mouse = Mouse.create(canvas)
      mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse
      })
      Composite.add(engine.world, mouseConstraint)

      canvas.removeEventListener('mousewheel', mouse.mousewheel)
      canvas.removeEventListener('DOMMouseScroll', mouse.mousewheel)
    }
    function initIntersectionObserver() {
      const options = {
        threshold: 0.1
      }
      observer = new IntersectionObserver(entries => {
        const canvasEntry = entries[0]
        if (canvasEntry.isIntersecting) {
          runner.enabled = true
          Render.run(render)
        } else {
          runner.enabled = false
          Render.stop(render)
        }
      }, options)

      observer.observe(canvas)
    }
    function initGround() {
      const segments = 32
      const deg = (Math.PI * 2) / segments
      const width = 50
      const radius = cw / 2 + width / 2
      const height = radius * Math.tan(deg / 2) * 2

      for (let i = 0; i < segments; i++) {
        const theta = deg * i
        const x = radius * Math.cos(theta) + cw / 2
        const y = radius * Math.sin(theta) + ch / 2
        addRect(x, y, width, height, { isStatic: true, angle: theta })
      }
    }
    function initImageBoxes() {
      const scale = 0.7
      const t1 = { w: 250 * scale, h: 250 * scale }
      const t2 = { w: 732 * scale, h: 144 * scale }
      addRect(cw / 2, ch / 2, t1.w, t1.h, {
        label: 'JS',
        chamfer: { radius: 20 },
        render: { sprite: { texture: IconJS, xScale: scale, yScale: scale } }
      })
      addRect(cw / 2 - t1.w, ch / 2, t1.w, t1.h, {
        label: 'CSS',
        chamfer: { radius: 20 },
        render: { sprite: { texture: IconCSS, xScale: scale, yScale: scale } }
      })
      addRect(cw / 2 + t1.w, ch / 2, t1.w, t1.h, {
        label: 'HTML',
        chamfer: { radius: 20 },
        render: { sprite: { texture: IconHTML, xScale: scale, yScale: scale } }
      })
      addRect(cw / 2, ch / 2 + t1.h, t1.w, t1.h, {
        label: 'THREE',
        chamfer: { radius: 20 },
        render: { sprite: { texture: IconTHREE, xScale: scale, yScale: scale } }
      })
      addRect(cw / 2 - t1.w, ch / 2 + t1.h, t1.w, t1.h, {
        label: 'REACT',
        chamfer: { radius: 75 },
        render: { sprite: { texture: IconREACT, xScale: scale, yScale: scale } }
      })
      addRect(cw / 2, ch / 2 - t2.h, t2.w, t2.h, {
        label: 'AFRAME',
        chamfer: { radius: 20 },
        render: { sprite: { texture: IconAFRAME, xScale: scale, yScale: scale } }
      })
    }
    function addRect(x, y, w, h, options = {}) {
      const rect = Bodies.rectangle(x, y, w, h, options)
      Composite.add(engine.world, rect)
    }

    return () => {
      observer.unobserve(canvas)

      Composite.clear(engine.world)
      Mouse.clearSourceEvents(mouse)
      Runner.stop(runner)
      Render.stop(render)
      Engine.clear(engine)
    }
  }, [])

  return (
    <div className="rotate-canvas-wrapper">
      <canvas ref={canvasRef}></canvas>
      <aside>
        <h1>{selected.title}</h1>
        <h2>{Array(5).fill(null).map((_, i) => (
          <span key={i} style={{ filter: `grayscale(${selected.level <= i ? 1 : 0})` }}>&#11088;</span>
        ))}</h2>
        <p>{selected.desc}</p>
      </aside>
    </div>
  )
}

export default RotateCanvas