const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let objectX = 300
let objectY = 300
const objectSize = 15

let leftPressed = false
let rightPressed = false
let upPressed = false
let downPressed = false

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
    leftPressed = true;
  } else if (event.key === 'ArrowRight') {
    rightPressed = true;
  } else if (event.key === 'ArrowUp') {
    upPressed = true;
  } else if (event.key === 'ArrowDown') {
    downPressed = true;
  }
})

document.addEventListener('keyup', (event) => {
  if (event.key === 'ArrowLeft') {
    leftPressed = false
  } else if (event.key === 'ArrowRight') {
    rightPressed = false
  } else if (event.key === 'ArrowUp') {
    upPressed = false
  } else if (event.key === 'ArrowDown') {
    downPressed = false
  }
})

function draw(){
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height)
    ctx.fillStyle = "yellow"
    ctx.fillRect(objectX, objectY, objectSize, objectSize)
    if(rightPressed){
        objectX += 1
    } else if (leftPressed){
        objectX -= 1
    }
    if (upPressed){
        objectY -= 1
    } else if (downPressed){
        objectY += 1
    }
    requestAnimationFrame(draw)
}
draw()

