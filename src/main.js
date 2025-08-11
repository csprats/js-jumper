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

let obstacles = [{
    x: canvas.width - 50,
    y: canvas.height / 2,
    speed: 15,
}]

const obstacleImage  = new Image()
obstacleImage.src = '/obstacle.png'

let gameOver = false

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

function detectCollision(obstacl) {
    if (character.x + 48 > obstacl.x &&
        character.x < obstacl.x + 48 &&
        character.y + 48 > obstacl.y &&
        character.y < obstacl.y + 48)
    {
        gameOver = true
    }
}

function createObstacle(offset)  {
    obstacles.push({
        x: offset,
        y: canvas.height / 2,
        speed: 15
    })
}

function drawObstacle()  {
    obstacles.forEach(function(obstacl, i) {
        if (obstacl.x < 0) {
            obstacl.x = canvas.width
        }

        ctx.drawImage(obstacleImage, obstacl.x, obstacl.y)
        obstacl.x -= obstacl.speed

        detectCollision(obstacl)
    })
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawCharacter()
    drawObstacle()

    if (!gameOver) requestAnimationFrame(draw)
    else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.font = '50px Arial'
        ctx.fillStyle = 'black'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2)
    }
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

createObstacle(150)
setInterval(changeCharacter, 250)
setInterval(() => {
    createObstacle(Math.random() * 50)
}, 7000)