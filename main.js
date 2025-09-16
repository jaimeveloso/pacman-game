const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

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

const pacmanBall = {
  objectX: 400,
  objectY: 400,
  radius: 15,
  color: 'yellow',
  draw: function() {
      ctx.beginPath();
      ctx.arc(this.objectX, this.objectY, this.radius, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fillStyle = this.color;
      ctx.fill();
    }
}

const ball = {
    x: 100,
    y: 100,
    radius: 5,
    color: 'grey',
    draw: function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
    }
  };

function draw(){
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height)
    if (keys.ArrowRight) {pacmanBall.objectX += 1}
    if (keys.ArrowLeft) {pacmanBall.objectX -= 1}
    if (keys.ArrowUp) {pacmanBall.objectY -= 1}
    if (keys.ArrowDown) {pacmanBall.objectY += 1}
    pacmanBall.draw()
    ball.draw()
    requestAnimationFrame(draw)
}
draw()

