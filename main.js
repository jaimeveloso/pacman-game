const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const points = document.getElementById('points')

const NUMBER_OF_BALLS = 10
const BLOCK_SIZE = 50
let totalPoints = 0
let keys = {
  ArrowLeft: false,
  ArrowRight: false,
  ArrowUp: false,
  ArrowDown: false
}

document.addEventListener('keydown', (event) => {
  if (event.key in keys) {
    keys[event.key] = true
  }
})
document.addEventListener('keyup', (event) => {
  if (event.key in keys) {
    keys[event.key] = false
  }
})

const map = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]

function drawmap(){
  for(let i = 0; i < map.length; i++){
    for(let n = 0; n < map[i].length; n++){
      if(map[i][n] === 1){
        ctx.fillStyle = 'blue'
        ctx.fillRect(n * BLOCK_SIZE, i * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE)
      } 
    }
  }
}

const pacmanBall = {
  x: 1 * BLOCK_SIZE + BLOCK_SIZE / 2,
  y: 1 * BLOCK_SIZE + BLOCK_SIZE / 2,
  radius: 15,
  velocityXRight: 2,
  velocityXLeft: 2, 
  velocityYUp: 2,
  velocityYDown: 2,
  color: 'yellow',
  draw: function() {
      ctx.beginPath();
      ctx.arc(pacmanBall.x, pacmanBall.y, pacmanBall.radius, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fillStyle = pacmanBall.color;
      ctx.fill();
    }
}

const allBalls = []
for (let i = 0; i < 10; i++){
  const x = Math.floor(Math.random() * (canvas.width - 20)) + 10
  const y = Math.floor(Math.random() * (canvas.width - 20)) + 10
  if(!detectBlockCollision(x, y)){
    allBalls.push({x, y, radius: 5, color: 'grey'})
  } else {
    i--
  }
}

function detectBlockCollision(x, y){
  const blockX = Math.floor(x / BLOCK_SIZE)
  const blockY = Math.floor(y / BLOCK_SIZE)
  if(blockY < 0 || blockY >= map.length || blockX < 0 || blockX >= map[0].length){
    return true
  }
  return map[blockY][blockX] === 1
}

function draw(){
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height)
    if (keys.ArrowRight && !detectBlockCollision(pacmanBall.x + pacmanBall.radius + 1, pacmanBall.y)) {
      pacmanBall.x += pacmanBall.velocityXRight
    }
    if (keys.ArrowLeft && !detectBlockCollision(pacmanBall.x - pacmanBall.radius - 1, pacmanBall.y)) {
      pacmanBall.x -= pacmanBall.velocityXLeft
    }
    if (keys.ArrowUp && !detectBlockCollision(pacmanBall.x, pacmanBall.y - pacmanBall.radius - 1)) {
      pacmanBall.y -= pacmanBall.velocityYUp
    }
    if (keys.ArrowDown && !detectBlockCollision(pacmanBall.x, pacmanBall.y + pacmanBall.radius + 1)) {
      pacmanBall.y += pacmanBall.velocityYDown
    }
    
    for ( let i = 0; i < allBalls.length; i++){
      const distance = Math.sqrt((pacmanBall.x - allBalls[i].x)*(pacmanBall.x - allBalls[i].x)+(pacmanBall.y - allBalls[i].y)*(pacmanBall.y - allBalls[i].y))
      if (distance < 20 && allBalls[i].color === 'grey'){
        allBalls[i].color= 'transparent'
        totalPoints++
      }
    }
    function drawBall(allBalls){
      ctx.beginPath()
      ctx.arc(allBalls.x, allBalls.y, allBalls.radius, 0, Math.PI * 2, true)
      ctx.fillStyle = allBalls.color
      ctx.fill()
    }
    for(let i = 0; i < allBalls.length; i++){
      drawBall(allBalls[i])
    }
 
    if(totalPoints === 10){
      points.textContent = `YOU WIN!!`
    } else {
      points.textContent = `SCORE:${totalPoints}`
    }
    pacmanBall.draw()
    drawmap()
    requestAnimationFrame(draw)
}
draw()
