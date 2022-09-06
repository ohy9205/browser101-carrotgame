const playContainer = document.querySelector('.play-container');
const playBtn = document.querySelector('.play-btn');
const timer = document.querySelector('.timer');
const carrcotCounter = document.querySelector('.carrot-counter');
const mainContainer = document.querySelector('.main-container');
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

  // 타이머
  startTimer();

  // 당근, 벌레 생성

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
  timer.innerHTML = time;
  interval = setInterval(()=> {
    time--;
    timer.innerHTML = time;
    if(time < 1) {
      clearInterval(interval);
      stopGame('YOU LOSE');
    }
  }, 1000);
}


function popUp(result) {
  const popupContainer = document.createElement('div');
  popupContainer.setAttribute('class','popup-container');
  popupContainer.innerHTML = `
    <div class='popup'>
      <button type='button' class='replay-btn play-btn' data-type='replay'>⭮</button>
      <p class='popup-text'>${result}</p>
    </div>
  `;
  mainContainer.appendChild(popupContainer);

  const replayBtn = document.querySelector('.replay-btn');
  replayBtn.addEventListener('click', ()=> {
    startGame();
    mainContainer.removeChild(popupContainer);
  });
}

function carrotCounting() {
  carrcotCounter.innerHTML = carrotCount;
}

function createCarrotAndBug() {
}

mainContainer.addEventListener('click', ()=> {
// 화면 클릭 시, 당근과 같은 data-set이면 carrotCount--
// 버그와 같은 data-set이면 stopGame('YOU LOSE');
});