const screen = document.querySelectorAll(".screen");
const startBtn = document.querySelector(".start");
const timeList = document.querySelector(".time-list");
const timer = document.querySelector("#time");
const board = document.querySelector("#board");
const playAgain = document.getElementById("play-again");

let gameTimer = 0;
let score = 0;

const MIN_CIRCLE_SIZE = 5;
const MAX_CIRCLE_SIZE = 50;

//start the game
startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  screen[0].classList.add("up");
});

// player can play again if he/she wants
playAgain.addEventListener("click", (event) => {
  event.preventDefault();
  screen[1].className = "screen";
  screen[2].classList.add("down");
  
});

// choose the duration of the game
timeList.addEventListener("click", playGame);

// the main eventloop of the game further
function playGame(event) {

  // reset global values to default
  resetToDefault();

  gameTimer = setGameTimer(event);

  //hide durations options screen
  screen[1].classList.add("up");

  // begin to draw circles
  const circle = drawCircle();

  // LAUNCH THE TIMER 
  const interval = setInterval(() => {
    if (gameTimer > 0) {
      gameTimer--;

      // right timer view
      if (gameTimer < 10) {
        timer.innerHTML = `00:0${gameTimer}`;
      } else if (gameTimer < 60) {
        timer.innerHTML = `00:${gameTimer}`;
      } else {
        timer.innerHTML = `${parseInt(gameTimer / 60)}:${gameTimer % 60}`;
      }
    }

    // when the time has gone - escape from the loop and show the results
    if (gameTimer < 1) {
      clearInterval(interval);
      circle.remove();
      const playerResult = document.createElement("h1");
      playerResult.id = "playerResult";
      playerResult.innerHTML = `Your scores: <span class="primary">${score}</span>`;

      board.append(playerResult);
      playAgain.classList.remove("hide");
    }
  }, 1000);
}

function setGameTimer(event) {
  return event.target.id;
}

function drawCircle() {
  //create the circle element
  const circle = document.createElement("div");
  circle.classList.add("circle");

  //set initial size and position for circle
  setCircleSize(circle);
  setCircleColor(circle);
  setCirclePosition(circle);

  board.append(circle);

  circle.addEventListener("click", () => {
    score++;

    circle.classList.add("hide");

    if (gameTimer > 0) {
      //set new size and position for circle
      setCircleSize(circle);
      setCircleColor(circle);
      setCirclePosition(circle);

      circle.classList.remove("hide");
    }
  });
  return circle;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function setCircleSize(circle) {
  let circleSize = getRandomNumber(MIN_CIRCLE_SIZE, MAX_CIRCLE_SIZE);
  circle.style.height = `${circleSize}px`;
  circle.style.width = `${circleSize}px`;
  return circle;
}

function setCircleColor(circle) {
  const newColor = `#${getRandomNumber(0, 255).toString(16)}${getRandomNumber(
    0,
    255
  ).toString(16)}${getRandomNumber(0, 255).toString(16)}`;

  circle.style.background = newColor;
  return circle;
}

function setCirclePosition(circle) {
  let circleX = getRandomNumber(
    0,
    board.offsetWidth - parseInt(circle.style.width)
  );

  let circleY = getRandomNumber(
    0,
    board.offsetHeight - parseInt(circle.style.height)
  );

  circle.style.top = `${circleY}px`;
  circle.style.left = `${circleX}px`;
  return circle;
}

function resetToDefault() {
  gameTimer = 0;
  score = 0;
  playAgain.classList.add("hide");
  const playerResult = document.getElementById("playerResult");
  if (playerResult) {
    playerResult.remove();
  }
  screen[2].className = "screen";
}
