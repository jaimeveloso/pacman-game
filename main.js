const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

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

const pacmanBall = {
  x: 400,
  y: 400,
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

const ball = {
    radius: 5,
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    color: 'grey',
    draw: function() {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = ball.color;
        ctx.fill();
    }
  }

function draw(){
    if(pacmanBall.x < 15){
      keys.ArrowLeft = false
    }
    if(pacmanBall.y  < 15){
      keys.ArrowUp = false
    }
    if(canvas.clientWidth < pacmanBall.radius + pacmanBall.x) {
      keys.ArrowRight = false
    }
    if(canvas.clientHeight < pacmanBall.radius + pacmanBall.y){
      keys.ArrowDown = false
    }

    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height)
    if (keys.ArrowRight) {pacmanBall.x += pacmanBall.velocityXRight}
    if (keys.ArrowLeft) {pacmanBall.x -= pacmanBall.velocityXLeft}
    if (keys.ArrowUp) {pacmanBall.y -= pacmanBall.velocityYUp}
    if (keys.ArrowDown) {pacmanBall.y += pacmanBall.velocityYDown}
    
    const distance = Math.sqrt((pacmanBall.x - ball.x)*(pacmanBall.x - ball.x)+(pacmanBall.y - ball.y)*(pacmanBall.y - ball.y))
    if (distance < 20){
      ball.color= 'transparent' 
    }
 
    pacmanBall.draw()
    ball.draw()
    requestAnimationFrame(draw)
}
draw()


