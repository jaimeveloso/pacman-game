const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let objectX = 300
let objectY = 300
const objectSize = 20

const keys = {
  ArrowLeft: false,
  ArrowRight: false,
  ArrowUp: false,
  ArrowDown: false
}

document.addEventListener('keydown', (event) => {
  if (event.key in keys) keys[event.key] = true
})

document.addEventListener('keyup', (event) => {
  if (event.key in keys) keys[event.key] = false
})

function draw(){
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height)
    ctx.fillStyle = "yellow"
    ctx.fillRect(objectX, objectY, objectSize, objectSize)
    if (keys.ArrowRight) {objectX += 1}
    if (keys.ArrowLeft) {objectX -= 1}
    if (keys.ArrowUp) {objectY -= 1}
    if (keys.ArrowDown) {objectY += 1}
    requestAnimationFrame(draw)
}
draw()

