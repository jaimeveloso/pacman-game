const volumeUp = document.querySelector('.volume-up')
const mute = document.querySelector('.mute')
const waitingAudio = new Audio('images&music/waiting-music.mp3')

volumeUp.addEventListener('click', () => {
    waitingAudio.play()
})
mute.addEventListener('click',() => {
    waitingAudio.pause()
})