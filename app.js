const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['linear-gradient(229.99deg, #198DF9 -26%, #e0edf9 105%)', 'linear-gradient(200deg, #040905 -90%, #3fd168 195%)', 'linear-gradient(215.32deg, #21362d -1%, #5aac95 124%)','linear-gradient(221.87deg, #070707 1%, #ffffff 270%)', 'linear-gradient(220.16deg, #000000 -8%, #d2cbd0 138%)', 'linear-gradient(90deg, #16d9e3 0%, #30c7ec 47%, #46aef7 100%)'];
let time = 0
let score = 0

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) => {
    if(event.target.classList.contains('time-btn')){
       time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', (event) => {
    if (event.target.classList.contains('circle')){
        score ++
        event.target.remove()
        createRandomCircle()
    }
})


function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0 ){
        finishGame()
    } else {
        let current = --time
        if (current < 10){
            current = `0${current}`
        }
        setTime(current)
    }

}
function setTime(value){
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    if(score === 0){
        board.innerHTML = `<h1>Cчёт: <span class = 'negative'>${score}</span></h1>`
    } else {
        board.innerHTML = `<h1>Cчёт: <span class = 'primary'>${score}</span></h1>`
    }

}
function createRandomCircle(){
    const circle = document.createElement('div');
    const size = getRandomNumber(20, 60)
    const {width, height} = board.getBoundingClientRect()

    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)

    circle.classList.add('circle')
    circle.style.background = getRandomColor()

    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`

    board.append(circle)
}

function getRandomNumber(min,max){
    return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor(){
    const index =  Math.floor(Math.random() * colors.length)
    return colors[index]
}