const playContainer = document.querySelector('.play-container');
const playBtn = document.querySelector('.play-btn');
const timer = document.querySelector('.timer');
const carrcotCounter = document.querySelector('.carrot-counter');
const mainContainer = document.querySelector('.main-container');
const main = document.querySelector('.main');
const body = document.querySelector('body');

let stopBtn;

let carrotCount = 10;
let time;
let interval;

playBtn.addEventListener('click', ()=>{

  startGame();

});

function startGame() {

  // 버튼변경 
  createStopBtn();

  // 당근, 벌레 생성
  createCarrotAndBug();

  // 타이머
  startTimer();

  // 당근 수
  carrotCounting();
  
  // 음악
}

function stopGame(popupText) {
  //  버튼 제거
  playContainer.removeChild(stopBtn);
  // 타이머 정지
  clearInterval(interval);
  // 팝업 생성
  popUp(popupText);
}


function createStopBtn() {
  stopBtn = document.createElement('button');
  stopBtn.setAttribute('class','stop-btn play-btn');
  stopBtn.setAttribute('type', 'button');
  stopBtn.innerHTML = '■';
  stopBtn.addEventListener('click', ()=>{
    stopGame('replay?');
  });
  
  playContainer.replaceChildren(stopBtn);
}


function startTimer() {  
  time = 5;
  timer.innerHTML = `00:${time}`;
  interval = setInterval(()=> {
    time--;
    timer.innerHTML = `00:${time}`;
    if(time < 1) {
      clearInterval(interval);
      stopGame('YOU LOSE');
    }
  }, 1000);
}


function popUp(result) {
  const popup = document.createElement('div');
  popup.setAttribute('class','popup-container');
  popup.innerHTML = `
    <div class='popup'>
      <button type='button' class='replay-btn play-btn' data-type='replay'>⭮</button>
      <p class='popup-text'>${result}</p>
    </div>
      `;
  body.appendChild(popup);

  const replayBtn = document.querySelector('.replay-btn');
  replayBtn.addEventListener('click', ()=> {
    let imgs = document.querySelectorAll('img');
    console.log(imgs);
    for(let i=0; i<imgs.length; i++) {
      main.removeChild(imgs[i]);
    }
    startGame();
    body.removeChild(popup);
    
  });
}


function carrotCounting() {
  carrcotCounter.innerHTML = carrotCount;
}

function createCarrotAndBug() {
  console.log('start');
  let mainWidth = main.clientWidth;
  let mainHeight = main.clientHeight;
  let x = mainWidth - 80;
  let y = mainHeight - 80;
  let widthMin = 0;
  let widthMax = x;
  let heightMin = 0;
  let heightMax = y;

  
  for(let i=0; i<10; i++) {
    const carrot = document.createElement('img');
    carrot.setAttribute('src', '../img/carrot.png');
    carrot.setAttribute('data-id', 'carrot');
    carrot.style.display = 'absolute';
    let randomX = Math.floor((Math.random()*x)+0);
    let randomY =  Math.floor((Math.random()*y)+0);
    carrot.style.left = `${randomX}px`;
    carrot.style.top = `${randomY}px`;
    main.appendChild(carrot);
  }
  
  for(let i=0; i<7; i++) {
    const bug = document.createElement('img');
    bug.setAttribute('src', '../img/bug.png');
    bug.setAttribute('data-id', 'bug');
    bug.style.display = 'absolute';
    let randomX = Math.floor((Math.random()*x)+1)-0;
    let randomY =  Math.floor((Math.random()*y)+1)-0;
    bug.style.left = `${randomX}px`;
    bug.style.top = `${randomY}px`;
    main.appendChild(bug);
  }
}

main.addEventListener('click', (e)=> {
  if(document.querySelector('.popup')) {
    e.preventDefault();
  }

  dataId = e.target.dataset.id;
  console.log(dataId);
// 화면 클릭 시, 당근과 같은 data-set이면 carrotCount--
  if(dataId === 'carrot') {
    main.removeChild(e.target);
    carrotCount--;
    if(carrotCount === 0) {
      stopGame('YOU WIN!');
    }
    carrcotCounter.innerHTML = carrotCount;
  }

// 버그와 같은 data-set이면 stopGame('YOU LOSE');
  if(dataId === 'bug') {
    stopGame('YOU LOSE');
  }
});