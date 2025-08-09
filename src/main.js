const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const character = {
    x: 300,
    y: canvas.height / 2,
    jumpUp: false,
    jumpDown: false,
    jumpSpeed: 5,
    frame: 0
}

const character1 = new Image()
character1.src = '/character.png'
const character2 = new Image()
character2.src  = '/character2.png'

let actualCharacter = character1

character2.onload = draw

function changeCharacter() {
    if (character.frame === 0) actualCharacter = character1
    if (character.frame === 1) actualCharacter = character2
    character.frame++

    if (character.frame === 2) character.frame = 0
}

function drawCharacter() {
    if (character.jumpUp) {
        character.jumpSpeed = -5
    }

    if (character.y < canvas.height / 2 - 150 && character.jumpUp) {
        character.jumpUp = false
        character.jumpDown = true
        character.jumpSpeed = 5
    }

    if (character.y === canvas.height / 2  && character.jumpDown) {
        character.jumpDown = false
        character.jumpUp = false
    }

    if (character.jumpUp || character.jumpDown) {
        character.y += character.jumpSpeed
    }

    ctx.drawImage(actualCharacter, character.x, character.y)
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawCharacter()

    requestAnimationFrame(draw)
}

document.addEventListener('keydown', (e) => {
    if (e.key == ' ' && !character.jumpDown && !character.jumpUp) {
        character.jumpUp = true
    }
})

setInterval(changeCharacter, 250)