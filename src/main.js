const playContainer = document.querySelector('.play-container');
const playBtn = document.querySelector('.play-btn');
const timer = document.querySelector('.timer');
const carrcotCounter = document.querySelector('.carrot-counter');
const mainContainer = document.querySelector('.main-container');
const main = document.querySelector('.main');
const body = document.querySelector('body');

const audio = document.createElement('audio');
const audio2 = document.createElement('audio');

let interval;

body.addEventListener('click', (e) => {
  let dataType = e.target.dataset.type;
  if(dataType === 'playBtn') {
    startGame();
  } else if(dataType === 'stopBtn') {
    stopGame('pause');
  } else if (dataType === 'replayBtn') {
    replayGame();
  } else if (dataType === 'carrot') {
    removeCarrot(e);
  } else if (dataType === 'bug') {
    clickBug();
  }
});

/**게임 시작 */
function startGame() {
  changeBtn();
  createCarrotAndBug();
  interval = startTimer();
  carrotCounting();
  playSound('play');
}

/**게임 정지 */
function stopGame(result) {
  playBtn.style.visibility = 'hidden';
  clearInterval(interval);

  if (result === 'pause') {
    playSound('alert');
    popUp('replay?');
  } else if(result === 'lost') {
    playSound('alert');
    popUp('YOU LOST');
  } else if (result === 'win') {
    playSound('win');
    popUp('!YOU WIN!');
  } else if (result === 'bug') {
    playSound('bug');
    popUp('YOU LOST');
  } 
}

/**게임 재시작 */
function replayGame() {
  main.innerHTML = "";
  let popup = document.querySelector('.popup-container');
  body.removeChild(popup);
  startGame();
}

/**소리 재생 */
function playSound(type) {
  if(type === 'play') {
    audio.setAttribute('src', './sound/bg.mp3');
    audio.play();
  } else if (type === 'alert') {
    audio.setAttribute('src', './sound/alert.wav');
    audio.play();
  } else if (type === 'bug') {
    audio.setAttribute('src', './sound/bug_pull.mp3');
    audio.play();
  } else if (type === 'carrot') {
    audio2.setAttribute('src', './sound/carrot_pull.mp3');
    audio2.play();
  } else if (type === 'win') {
    audio.setAttribute('src', './sound/game_win.mp3');
    audio.play();
  }
}

/**버튼 변경 */
function changeBtn() {
  playBtn.style.visibility = 'visible';
  playBtn.setAttribute('class', 'stop-btn play-btn');
  playBtn.setAttribute('data-type', 'stopBtn');
  playBtn.innerHTML = '■';
}

/**타이머 시작 */
function startTimer() {  
  let time = 10;
  timer.innerHTML = `00:${time}`;
  return setInterval(()=> {
    time--;
    timer.innerHTML = `00:${time}`;
    if(time < 1) {
      stopGame('lost');
    }
  }, 1000);
}

/**팝업창 생성 */
function popUp(result) {
  const popup = document.createElement('div');
  popup.setAttribute('class','popup-container');
  popup.innerHTML = `
    <div class='popup'>
      <button type='button' class='replay-btn play-btn' data-type='replayBtn'>⭮</button>
      <p class='popup-text'>${result}</p>
    </div>
      `;
  body.appendChild(popup);
}

/**이미지 랜덤 배치 */
function createCarrotAndBug() {
  let mainWidth = main.clientWidth;
  let mainHeight = main.clientHeight;
  let x = mainWidth - 80;
  let y = mainHeight - 80;
  
  for(let i=0; i<10; i++) {
    const carrot = document.createElement('img');
    carrot.setAttribute('src', '../img/carrot.png');
    carrot.setAttribute('data-type', 'carrot');
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
    bug.setAttribute('data-type', 'bug');
    bug.style.display = 'absolute';
    let randomX = Math.floor((Math.random()*x)+1)-0;
    let randomY =  Math.floor((Math.random()*y)+1)-0;
    bug.style.left = `${randomX}px`;
    bug.style.top = `${randomY}px`;
    main.appendChild(bug);
  }
}

/**당근 제거 */
function removeCarrot(e) {
  playSound('carrot');
  main.removeChild(e.target);
  carrotCounting();
}

/**당근 갯수 카운트 */
function carrotCounting() {
  let carrotCount = document.querySelectorAll("[data-type='carrot'").length;
  carrcotCounter.innerHTML = carrotCount;
  if(carrotCount === 0) {
    stopGame('win');
  }
}

/**벌레 클릭 */
function clickBug() {
  stopGame('bug');
}