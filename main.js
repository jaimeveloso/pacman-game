const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const points = document.getElementById('points')
const display = document.getElementById('display')
const backgroundAudio = new Audio("images&music/ingame-music.mp3")
const eatingAudio = new Audio("images&music/eating.mp3")
const victoryAudio = new Audio("images&music/victory.mp3")
const gameOverAudio = new Audio("images&music/game-over.mp3")

const NUMBER_OF_BALLS = 10
const BLOCK_SIZE = 50
const MARGIN_BEFORE_COLLISION = 1
const RADIUS_SUM = 20
const ballRoot = { radius: 5, color: 'grey',}
const keys = {
  ArrowLeft: false,
  ArrowRight: false,
  ArrowUp: false,
  ArrowDown: false
}
let eated = false
let totalPoints = 0

let countDownTime = 30

document.addEventListener('keydown', (event) => {
  if (event.key in keys) {
    keys[event.key] = true
    backgroundAudio.play()
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
  [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]

function drawmap(){
  for(let i = 0; i < map.length; i++){
    for(let n = 0; n < map[i].length; n++){
      if(map[i][n] === 1){
        ctx.fillStyle = 'rgb(105, 20, 20)'
        ctx.fillRect(n * BLOCK_SIZE, i * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE)
      } 
    }
  }
}

const pacmanBall = {
  x: 1 * BLOCK_SIZE + BLOCK_SIZE / 2,
  y: 1 * BLOCK_SIZE + BLOCK_SIZE / 2,
  radius: 15,
  velocityXRight: 1,
  velocityXLeft: 1, 
  velocityYUp: 1,
  velocityYDown: 1,
  color: 'yellow',
  draw: function() {
      ctx.beginPath();
      ctx.arc(pacmanBall.x, pacmanBall.y, pacmanBall.radius, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fillStyle = pacmanBall.color;
      ctx.fill();
    }
}

function detectBlockLocation(x, y){
  const blockY = Math.floor(y / BLOCK_SIZE)
  const blockX = Math.floor(x / BLOCK_SIZE)
  return map[blockY][blockX] === 1
}

const allBalls = []
function createBallFood(){
  for (let i = 0; i < NUMBER_OF_BALLS; i++){
    const x = Math.floor(Math.random() * (canvas.width - BLOCK_SIZE * 2 - ballRoot.radius * 2)) + BLOCK_SIZE + ballRoot.radius
    const y = Math.floor(Math.random() * (canvas.height - BLOCK_SIZE * 2 - ballRoot.radius * 2)) + BLOCK_SIZE + ballRoot.radius
    if(!detectBlockLocation(x, y)){
      allBalls.push({...ballRoot, x, y})
    } else {
      i--
    }
  }
}
createBallFood(allBalls)

const timerInterval = setInterval(()=> {
    countDownTime--
    if(totalPoints === NUMBER_OF_BALLS){
      points.textContent = `YOU WIN!!`
      pacmanBall.velocityXLeft = 0
      pacmanBall.velocityXRight = 0
      pacmanBall.velocityYDown = 0
      pacmanBall.velocityYUp = 0
      backgroundAudio.pause()
      victoryAudio.play()
      clearInterval(timerInterval)
    } else if(countDownTime === 0){
      clearInterval(timerInterval)
      pacmanBall.velocityXLeft = 0
      pacmanBall.velocityXRight = 0
      pacmanBall.velocityYDown = 0
      pacmanBall.velocityYUp = 0
      backgroundAudio.pause()
      gameOverAudio.play()
      points.textContent = `GAME OVER`
    } else {
      points.textContent = `SCORE:${totalPoints}`
    }
    display.innerHTML = `${countDownTime}`
  }, 1000)

function draw(){
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height)

    if (keys.ArrowRight && !detectBlockLocation(
      (pacmanBall.x + pacmanBall.radius + MARGIN_BEFORE_COLLISION), pacmanBall.y)) {
      pacmanBall.x += pacmanBall.velocityXRight
    }
    if (keys.ArrowLeft && !detectBlockLocation(
    (pacmanBall.x - pacmanBall.radius - MARGIN_BEFORE_COLLISION), pacmanBall.y)) {
      pacmanBall.x -= pacmanBall.velocityXLeft
    }
    if (keys.ArrowUp && !detectBlockLocation(
      pacmanBall.x, (pacmanBall.y - pacmanBall.radius - MARGIN_BEFORE_COLLISION))) {
      pacmanBall.y -= pacmanBall.velocityYUp
    }
    if (keys.ArrowDown && !detectBlockLocation(
      pacmanBall.x, (pacmanBall.y + pacmanBall.radius + MARGIN_BEFORE_COLLISION))) {
      pacmanBall.y += pacmanBall.velocityYDown
    }

    for ( let i = 0; i < allBalls.length; i++){
      const distanceX = pacmanBall.x - allBalls[i].x
      const distanceY = pacmanBall.y - allBalls[i].y
      const totalDistance = distanceX * distanceX + distanceY * distanceY
      if (totalDistance < RADIUS_SUM * RADIUS_SUM && !eated){
        allBalls[i] = !eated
        totalPoints++
        eatingAudio.play()
      }
      drawBall(allBalls[i])
    }
    
    function drawBall(allBalls){
      ctx.beginPath()
      ctx.arc(allBalls.x, allBalls.y, allBalls.radius, 0, Math.PI * 2, true)
      ctx.fillStyle = allBalls.color
      ctx.fill()
    }
    
    pacmanBall.draw()
    drawmap()
    requestAnimationFrame(draw)
}
draw()