export function getDistance(p1, p2) {
  const dx = p2.x - p1.x
  const dy = p2.y - p1.y

  return Math.sqrt(dx * dx + dy * dy)
}

export function getAngle(p1, p2) {
  const dx = p2.x - p1.x
  const dy = p2.y - p1.y

  return Math.atan2(dy, dx)
}

export function getScrupedPercent(ctx, width, height) {
  const pixels = ctx.getImageData(0, 0, width, height)
  const gap = 32
  const total = pixels.data.length / gap
  let count = 0

  for (let i = 0; i < pixels.data.length - 3; i += gap) {
    if (pixels.data[i + 3] === 0) count++
  }

  return Math.round(count / total * 100)
}

export function drawImageCenter(canvas, ctx, image) {
  const cw = canvas.width
  const ch = canvas.height

  const iw = image.width
  const ih = image.height

  const ir = ih / iw
  const cr = ch / cw

  let sx, sy, sw, sh

  if (ir >= cr) {
    sw = iw
    sh = sw * (ch / cw)
  } else {
    sh = ih
    sw = sh * (cw / ch)
  }
  sx = iw / 2 - sw / 2
  sy = ih / 2 - sh / 2

  ctx.drawImage(image, sx, sy, sw, sh, 0, 0, cw, ch)
}