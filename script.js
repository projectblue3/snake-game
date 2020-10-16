//tic tac toe is done so now I will try to make snake
//consider adding a settings page to change resolution, snake speed, etc

const gameBoard = document.getElementById('game-board');
const snakeHead = document.getElementById('snake-head');
const fruit = document.getElementById('fruit');
const playBtns = document.getElementById('play-btns');
const quitBtn = document.getElementById('quit-btn');
const docScore = document.getElementById('score');
const body = document.body;

let direction = 'right';
let endGame = false;

function gameLoop() {
    let xValue = 190;
    let yValue = 190;

    let lastX = 0;
    let lastY = 0;

    let tempX = 0;
    let tempY = 0;

    let fruitx = 300;
    let fruity = 300;

    let re = /\d{0,6}/;

    let snakeRate = 10;

    let score = 0;

    let snakeParts = [snakeHead];

    let startGame = setInterval(updateGame, 100);

    function checkForMunch() {
        if (xValue === fruitx && yValue === fruity) {
            const snakePart = document.createElement('div');
            snakePart.classList.add('snake-part');
            snakePart.style.left = lastX + 'px';
            snakePart.style.top = lastY + 'px';
            gameBoard.appendChild(snakePart);
            snakeParts.push(snakePart);

            fruitx = Math.floor((Math.random() * (35 - 5) + 5)) * 10;
            fruity = Math.floor((Math.random() * (35 - 5) + 5)) * 10;

            fruit.style.left = fruitx + 'px';
            fruit.style.top = fruity + 'px';

            score = snakeParts.length - 1;

            docScore.textContent = `Score: ${score}`;
        }
    }

    function checkForLoss() {
        if (xValue < 0 || xValue > 380 || yValue < 0 || yValue > 380) {
            endGame = true;
        }

        for (let i = 0; i < snakeParts.length; i++){
            if (i > 1){
                if (snakeHead.style.left == snakeParts[i].style.left && snakeHead.style.top === snakeParts[i].style.top){
                    endGame = true;
                }
            }
        }

        if (endGame === true) {
            clearInterval(startGame);
            quitBtn.innerHTML = `Game Over! Your Score was: ${score} Click to play again!`;
            playBtns.style.display = 'block';
            quitBtn.style.display = 'block';
        }
    }

    function updateSnake() {

        for (let i = 0; i < snakeParts.length; i++) {

            if (i == 0) {

                lastX = parseInt(snakeHead.style.left.match(re).join());
                lastY = parseInt(snakeHead.style.top.match(re).join());

                switch (direction) {
                    case 'up':
                        yValue -= snakeRate;
                        snakeHead.style.left = xValue + 'px';
                        snakeHead.style.top = yValue + 'px';
                        break;

                    case 'down':
                        yValue += snakeRate;
                        snakeHead.style.left = xValue + 'px';
                        snakeHead.style.top = yValue + 'px';
                        break;

                    case 'left':
                        xValue -= snakeRate;
                        snakeHead.style.left = xValue + 'px';
                        snakeHead.style.top = yValue + 'px';
                        break;

                    case 'right':
                        xValue += snakeRate;
                        snakeHead.style.left = xValue + 'px';
                        snakeHead.style.top = yValue + 'px';
                        break;
                }

            } else {
                tempX = parseInt(snakeParts[i].style.left.match(re).join());
                tempY = parseInt(snakeParts[i].style.top.match(re).join());

                snakeParts[i].style.left = lastX + 'px';
                snakeParts[i].style.top = lastY + 'px';

                lastX = tempX;
                lastY = tempY;
            }
        }
    }

    function updateGame() {
        checkForLoss();
        updateSnake();
        checkForMunch();
    }
}

document.addEventListener('keydown', e => {

    switch (e.code) {
        case 'KeyD':
            direction = 'right';
            break;

        case 'KeyA':
            direction = 'left';
            break;

        case 'KeyW':
            direction = 'up';
            break;

        case 'KeyS':
            direction = 'down';
            break;
    }

});

body.addEventListener('click', e => {
    e.preventDefault();

    if (e.target.id === 'start-btn') {
        gameLoop();
        playBtns.style.display = 'none';
    }

    if (e.target.id === 'quit-btn') {
        location.reload();
    }
});