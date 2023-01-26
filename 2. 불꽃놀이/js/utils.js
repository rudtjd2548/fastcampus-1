export function randomIntBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function randomNumBetween(min, max) {
  return Math.random() * (max - min) + min
}

export function randomFloatBetween(min, max, decimals) {
  const str = (Math.random() * (max - min) + min).toFixed(decimals)
  return parseFloat(str)
}