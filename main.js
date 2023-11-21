const gameSpace = document.querySelector("#gameSpace");
const context = gameSpace.getContext("2d");
const gameScore = document.querySelector("#gameScore");
const restartButton = document.querySelector("#restartButton");
const startButton = document.querySelector("#startButton");
const widthGame = gameSpace.width;
const heightGame = gameSpace.height;

const gameBackground = "black";
const colorSnake = "red";
const borderSnake = "white";
const foodColor = "lightgray";
const sizeUnit = 30;

let gameRunning = false;
let xSpeed = sizeUnit;
let ySpeed = 0;
let xFood;
let yFood;
let score = 0;

let snake = [
    { x: sizeUnit * 4, y: 0 },
    { x: sizeUnit * 3, y: 0 },
    { x: sizeUnit * 2, y: 0 },
    { x: sizeUnit, y: 0 },
    { x: 0, y: 0 }
];

window.addEventListener("keydown", alterDirection);
restartButton.addEventListener("click", restartGame);
startButton.addEventListener("click", startGame);

function startGame() {
    if (!gameRunning) {
        gameRunning = true;
        score = 0;
        gameScore.textContent = score;
        xSpeed = sizeUnit;
        ySpeed = 0;
        snake = [
            { x: sizeUnit * 4, y: 0 },
            { x: sizeUnit * 3, y: 0 },
            { x: sizeUnit * 2, y: 0 },
            { x: sizeUnit, y: 0 },
            { x: 0, y: 0 }
        ];
        popFood();
        nextTick();
    }
}

// ... (rest of the code remains unchanged)

function nextTick(){
    if(gameRunning){
        setTimeout(() => {
            cleanBoard();
            foodDraw();
            snakeMove();
            snakeDraw();
            gameOverCheck();
            nextTick();
        }, 80);
    }
    else{
        showGameOver();
    }
};
function cleanBoard(){
    context.fillStyle = gameBackground;
    context.fillRect(0, 0, widthGame, heightGame);
};
function popFood(){
    function randomFoods(min, max){
        const randomNumber = Math.round((Math.random() * (max - min) + min) / sizeUnit) * sizeUnit;
        return randomNumber; 
    } 
    xFood = randomFoods(0, widthGame - sizeUnit);
    yFood = randomFoods(0, widthGame - sizeUnit);
};
function foodDraw(){
    context.fillStyle = foodColor;
    context.fillRect(xFood, yFood, sizeUnit, sizeUnit);
};
function snakeMove(){
    const snakeHead = {x: snake[0].x + xSpeed, y: snake[0].y + ySpeed };

    snake.unshift(snakeHead);
    //if food is eaten
    if( snake[0].x == xFood &&  snake[0].y == yFood ){
       score +=1
       gameScore.textContent = score;
       popFood();
    }
    else{
        snake.pop();
    }
};
function snakeDraw(){
    context.fillStyle = colorSnake;
    context.strokeStyle = borderSnake;
    snake.forEach(snakePart => {
        context.fillRect(snakePart.x,snakePart.y, sizeUnit, sizeUnit);
        context.strokeRect(snakePart.x,snakePart.y, sizeUnit, sizeUnit);
    })
};
function alterDirection(event){
   const pressedKey = event.keyCode;
 const left =37;
const right = 39;
const up = 38;
const down = 40; 

const directionUP = (ySpeed == -sizeUnit);
const directionDOWN = (ySpeed == sizeUnit);
const directionRIGHT = (xSpeed == sizeUnit);
const directionLEFT = (xSpeed == -sizeUnit);

 
switch(true){
    case(pressedKey == left && !directionRIGHT):
    xSpeed = -sizeUnit;
    ySpeed = 0;
    break;
    case(pressedKey == right && !directionLEFT):
    xSpeed = sizeUnit;
    ySpeed = 0;
    break;
    case(pressedKey == up && !directionDOWN):
    xSpeed = 0;
    ySpeed = -sizeUnit;
    break;
    case(pressedKey == down && !directionUP):
    xSpeed = 0;
    ySpeed = sizeUnit;
    break;
};

};
function gameOverCheck(){
    switch(true){
        case (snake[0].x < 0):
            gameRunning = false;
            break;
        case (snake[0].x >= widthGame):
                gameRunning = false;
                break;
        case (snake[0].y < 0):
                    gameRunning = false;
                    break;
        case (snake[0].y >= heightGame):
                    gameRunning = false;
                        break;
                        
    }
    for( let i = 1; i < snake.length; i+=1){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y)
        gameRunning = false;
    }
};
function showGameOver(){
    context.font = "50px Impact";
    context.fillStyle = "white";
    context.textAlign = "center";
    context.fillText("GAME OVER!", widthGame / 2, heightGame /2);
    gameRunning = false;

};
 function restartGame(){
    score = 0;
    xSpeed = sizeUnit;
    ySpeed = 0;
     snake = [
        {x:sizeUnit * 4, y:0},
        {x:sizeUnit * 3, y:0},
        {x:sizeUnit * 2, y:0},
        {x:sizeUnit, y:0},
        {x:0, y:0}
    ];
     startGame();
 }; 

