const grid = document.querySelector('.grid')
const startButton = document.getElementById('start')
const scoreDisplay = document.getElementById('score')

const gridKey = document.getElementById('keyPad');




let squares = []
let squareKey = [];
let currentSnake = [2, 1, 0]
let direction = 1
const width = 10
let appleIndex ={position: 0, foodName: 0};
let score = 0
let intervalTime = 1000
let speed = 0.9
let timerId = 0

const food = ['🍆', '🥕', '🍅', '🥒','🍎'];



function createVirtualKeypad(){
  const upKeyBtn=document.createElement("button");
  const upKey=document.createElement("img");
  upKey.setAttribute("src", "./pics/up-chevron.png");
  upKey.setAttribute("width", "70px");
  upKeyBtn.setAttribute("id","upKeyId");
  upKeyBtn.appendChild(upKey);
  const leftKeyBtn=document.createElement("button");
  const leftKey=document.createElement("img");
  leftKey.setAttribute("src", "./pics/leftbutton.png");
  leftKey.setAttribute("width", "70px");
  leftKeyBtn.setAttribute("id","leftKeyId");
  leftKeyBtn.appendChild(leftKey);
  const rightKeyBtn=document.createElement("button");
  const rightKey=document.createElement("img");
  rightKey.setAttribute("src", "./pics/right-arrow.png");
  rightKey.setAttribute("width", "70px");
  rightKeyBtn.setAttribute("id","rightKeyId");
  rightKeyBtn.appendChild(rightKey);
  const downKeyBtn=document.createElement("button");
  const downKey=document.createElement("img");
  downKey.setAttribute("src", "./pics/down-arrow.png");
  downKey.setAttribute("width", "70px");
  downKeyBtn.setAttribute("id","downKeyId");
  downKeyBtn.appendChild(downKey);

  for(let i=0; i<9; i++){
    const square = document.createElement('div');
    if(i==1){
      square.appendChild(upKeyBtn);
    }else if(i==3){
      square.appendChild(leftKeyBtn);
    }else if(i==5){
      square.appendChild(rightKeyBtn);
    }else if(i==7){
      square.appendChild(downKeyBtn);
    }else{
      ;
    }
    square.classList.add('squareKey');
    gridKey.appendChild(square);
    squareKey.push(square);
  }
}
createVirtualKeypad();
const upKeyBtnPressed = document.getElementById('upKeyId');
const leftKeyBtnPressed = document.getElementById('leftKeyId');
const rightKeyBtnPressed = document.getElementById('rightKeyId');
const downKeyBtnPressed = document.getElementById('downKeyId');

upKeyBtnPressed.addEventListener('click', () => direction = -width);
leftKeyBtnPressed.addEventListener('click', () => direction = -1);
rightKeyBtnPressed.addEventListener('click', () => direction = 1);
downKeyBtnPressed.addEventListener('click', () => direction = +width);


function createGrid() {
  //create 100 of these elements with a for loop
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < width; j++) {
      //create element
      const square = document.createElement('div')
      //add styling to the element
      if (i % 2 == j % 2) {
        square.classList.add('square_deep')
      } else {
        square.classList.add('square_light')
      }
      //put the element into our grid
      grid.appendChild(square)
      //push it into a new squares array
      squares.push(square)

    }
  }
}
createGrid()

currentSnake.forEach(index => squares[index].classList.add('snake'))

function startGame() {
  //remove the snake
  currentSnake.forEach(index => squares[index].classList.remove('snake'))
  //remove the apple
  squares[appleIndex.position].classList.remove('apple')
  squares[appleIndex.position].textContent = '';

  clearInterval(timerId)
  currentSnake = [2, 1, 0]
  score = 0
  //re add new score to browser
  scoreDisplay.textContent = score
  direction = 1
  intervalTime = 1000
  generateApple()
  //readd the class of snake to our new currentSnake
  currentSnake.forEach(index => squares[index].classList.add('snake'))
  timerId = setInterval(move, intervalTime)
}

function move() {
  if (
    (currentSnake[0] + width >= width * width && direction === width) || //if snake has hit bottom
    (currentSnake[0] % width === width - 1 && direction === 1) || //if snake has hit right wall
    (currentSnake[0] % width === 0 && direction === -1) || //if snake has hit left wall
    (currentSnake[0] - width < 0 && direction === -width) || //if snake has hit top
    squares[currentSnake[0] + direction].classList.contains('snake')
  )
    return clearInterval(timerId)

  //remove last element from our currentSnake array
  const tail = currentSnake.pop()
  //remove styling from last element
  squares[tail].classList.remove('snake')
  //add square in direction we are heading
  currentSnake.unshift(currentSnake[0] + direction)
  //add styling so we can see it

  //deal with snake head gets apple
  if (squares[currentSnake[0]].classList.contains('apple')) {
    //remove the class of apple
    squares[currentSnake[0]].classList.remove('apple')
    squares[appleIndex.position].textContent = '';

    //grow our snake by adding class of snake to it
    squares[tail].classList.add('snake')
    console.log(tail)
    //grow our snake array
    currentSnake.push(tail)
    console.log(currentSnake)
    //generate new apple
    generateApple()
    //add one to the score
    score++
    //display our score
    scoreDisplay.textContent = score
    //speed up our snake
    clearInterval(timerId)
    console.log(intervalTime)
    intervalTime = intervalTime * speed
    console.log(intervalTime)
    timerId = setInterval(move, intervalTime)
  }



  squares[currentSnake[0]].classList.add('snake')
}






function generateApple() {
  do {
    appleIndex.position = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex.position].classList.contains('snake'));
  //I create one random number in 0~999, if 0~700 '🍆',
  //701-900'🥕', 901-960'🍅', 961~999'🥒'
  //It's only show Apple in the begging... Hahaha....
  const temp = Math.floor(Math.random() *1000);
  if(temp<=700)
    appleIndex.foodName = 0;
  else if(temp>700 && temp <=900)
    appleIndex.foodName = 1;
  else if(temp>900 && temp <=960)
    appleIndex.foodName = 2;
  else
    appleIndex.foodName = 3;
  //console.log( appleIndex.foodName ); 
  squares[appleIndex.position].classList.add('apple');
  squares[appleIndex.position].textContent = '🍎';

}
generateApple()

// 39 is right arrow
// 38 is for the up arrow
// 37 is for the left arrow
// 40 is for the down arrow

function control(e) {
  if (e.keyCode === 39) {
    console.log('right pressed')
    direction = 1
  } else if (e.keyCode === 38) {
    console.log('up pressed')
    direction = -width
  } else if (e.keyCode === 37) {
    console.log('left pressed')
    direction = -1
  } else if (e.keyCode === 40) {
    console.log('down pressed')
    direction = +width
  }
}
document.addEventListener('keyup', control)
startButton.addEventListener('click', startGame)


var video = document.getElementById("myVideo");
var btn = document.getElementById("myBtn");

function myFunction() {
  if (video.paused) {
    video.play();
    btn.innerHTML = "Pause";
  } else {
    video.pause();
    btn.innerHTML = "Play";
  }
}
