const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const character = {
    x: 300,
    y: canvas.height / 2,
    jumpUp: false,
    jumpDown: false,
    jumpSpeed: 8,
    jumpDirection: 0,
    frame: 0
}

const character1 = new Image()
character1.src = '/character.png'
const character2 = new Image()
character2.src  = '/character2.png'

let actualCharacter = character1

character2.onload = draw


const obstacle = {
    x: canvas.width,
    y: canvas.height / 2,
    speed: 15,
}
let obstacles = [{
    x: canvas.width - 50,
    y: canvas.height / 2,
    speed: 15,}
]

const obstacleImage  = new Image()
obstacleImage.src = '/obstacle.png'

function changeCharacter() {
    if (character.frame === 0) actualCharacter = character1
    if (character.frame === 1) actualCharacter = character2
    character.frame++

    if (character.frame === 2) character.frame = 0
}

function drawCharacter() {
    if (character.jumpUp) {
        character.jumpDirection = -character.jumpSpeed
    }

    if (character.y < canvas.height / 2 - 150 && character.jumpUp) {
        character.jumpUp = false
        character.jumpDown = true
        character.jumpDirection = character.jumpSpeed
    }

    if (character.y === canvas.height / 2  && character.jumpDown) {
        character.jumpDown = false
        character.jumpUp = false
    }

    if (character.jumpUp || character.jumpDown) {
        character.y += character.jumpDirection 
    }

    ctx.drawImage(actualCharacter, character.x, character.y)
}

function createObstacle(offset)  {
    obstacles.push(obstacle)
    obstacles[obstacles.length - 1].x -= offset
}

function drawObstacle()  {
    obstacles = obstacles.filter((obstacl) => {
        if (obstacl.x < 0) {
            /*createObstacle(0)
            createObstacle(250)*/

            return false
        }

        ctx.drawImage(obstacleImage, obstacl.x, obstacl.y)
        obstacl.x -= obstacl.speed

        return true
    })
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawCharacter()
    drawObstacle()

    requestAnimationFrame(draw)
}

document.addEventListener('keydown', (e) => {
    if (e.key == ' ' && !character.jumpDown && !character.jumpUp) {
        character.jumpUp = true
    }
})
canvas.addEventListener('click', () => { 
    if (!character.jumpDown && !character.jumpUp) {
        character.jumpUp = true
    }
})

createObstacle(250)
setInterval(changeCharacter, 250)