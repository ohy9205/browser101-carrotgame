'use strict';

import PopUp from './popup.js';
import Field from './field.js';

const CARROT_SIZE = 80;
const CARROT_COUNT = 10;
const BUG_COUNT = 7;
const GAME_DURATION_SEC = 10;

// const gameField = document.querySelector('.game-field');
// const fieldRect = gameField.getBoundingClientRect(); // 이미지 랜덤 배치를 위해 filed의  전체적인 사이즈와 위치 알아내기
const gameBtn = document.querySelector('.game-button');
const gameTimer = document.querySelector('.game-timer');
const gameScore = document.querySelector('.game-score');

const carrotSound = new Audio('../sound/carrot_pull.mp3');
const bugSound = new Audio('../sound/bug_pull.mp3');
const bgSound = new Audio('../sound/bg.mp3');
const alertSound = new Audio('../sound/alert.wav');
const winSound = new Audio('../sound/game_win.mp3');

// 게임의 상태를 기억하는 변수들
let started = false;
let score = 0;
let timer = undefined;

// PopUp클래스의 인스턴스 생성
const gameFinishPopup = new PopUp();
gameFinishPopup.setClickListener(startGame);

// Field클래스의 인스턴스 생성
const gameField = new Field(CARROT_COUNT, BUG_COUNT);
gameField.setClickListener(onItemClick);

/**필드 클릭 시 동작 구현*/
function onItemClick(item) {
  if(!started) { // 게임이 시작되지 않았으면 함수 리턴
    return;
  }
  if(item === 'carrot') {
    score++;
    updateScore();
    if(score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if(item === 'bug') {
    finishGame(false);
  }
}


gameBtn.addEventListener('click', ()=>{
  if(started) {
    stopGame();
  } else {
    startGame();
  }
});

/**게임 시작 함수 */
function startGame() {
  playSound(bgSound);
  initGame(); // 벌레,당근 생성, 당근 갯수 초기화
  showStopBtn(); // 정지 버튼으로 변경
  startGameTimer(); // 타이머 시작
  started = true; // 게임 상태 변경
}

/**게임 정지 함수 */
function stopGame() {
  stopSound(bgSound);
  playSound(alertSound);
  stopGameTimer(); // 타이머 정지
  hideStartBtn();// 상단 버튼 사라짐
  gameFinishPopup.showWithText('REPLAY?'); // 팝업 등장
  started = false; // 게임 상태 변경
}

/**게임 종료 함수 */
function finishGame(win) {
  started = false;
  stopGameTimer(); 
  hideStartBtn();
  if(win) {
    playSound(winSound);
    gameFinishPopup.showWithText('YOU WIN🎉'); // 팝업 등장
  } else {
    playSound(bugSound);
    gameFinishPopup.showWithText('YOU LOST💥'); // 팝업 등장
  }
  stopSound(bgSound);
}

/**당근, 버튼 클릭 이벤트 처리 */
// gameField.addEventListener('click', onFieldClick); // (e) => onFieldClick(e) 생략된것


/**당근 카운트 업데이트 */
function updateScore() {
  gameScore.innerText = CARROT_COUNT - score;
}

/**버튼을 중지버튼으로 변경 */
function showStopBtn() {
  const icon = gameBtn.querySelector('.fa-solid');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
  gameBtn.style.visibility = 'visible';
}

/**게임 정지 시 버튼을 숨김 */
function hideStartBtn() {
  gameBtn.style.visibility = 'hidden';
}

/**타이머 시작 */
function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC; // 남은 시간동안 setInerval이 실행되게 만든다
  updateTimerText(remainingTimeSec);
  timer = setInterval(()=>{
    if(remainingTimeSec <= 0) {
      clearInterval(timer);
      finishGame(CARROT_COUNT === score);
      return;
    }
    updateTimerText(--remainingTimeSec);
  },1000);
}

/**타이머 정지 */
function stopGameTimer() {
  clearInterval(timer);
}

/**타이머를 분:초 단위로 업데이트한다 */
function updateTimerText(remainingTimeSec) {
  const minutes = Math.floor(remainingTimeSec / 60);
  const seconds = Math.floor(remainingTimeSec % 60);
  gameTimer.innerText = `${minutes}:${seconds}`;
}

/**벌레, 당근 생성, 당근갯수 카운트 초기화 */
function initGame() {
  // gameField.innerHTML = '';
  // addItem('carrot', CARROT_COUNT, '../img/carrot.png');
  // addItem('bug', BUG_COUNT, '../img/bug.png');
  gameScore.innerHTML = CARROT_COUNT;
  score = 0;
  gameField.init();
}

/**게임 필드에 아이템을 추가 */
// function addItem(className, count, imgPath) {
//   /*랜덤할 숫자를 만들 범위 설정
//     이미지가 튀어나가지 않게 전체 범위에서 이미지 사이즈를 빼준다*/
//   const x1 = 0;
//   const y1 = 0;
//   const x2 = fieldRect.width-CARROT_SIZE;
//   const y2 = fieldRect.height-CARROT_SIZE;

//   for(let i=0; i<count; i++) {
//     const item = document.createElement('img');
//     item.setAttribute('class', className);
//     item.setAttribute('src', imgPath);
//     item.style.position = 'absolute';
//     const x = randomNumber(x1, x2);
//     const y = randomNumber(y1, y2);
//     item.style.left = `${x}px`;
//     item.style.top = `${y}px`;
//     gameField.appendChild(item);
//   }
// }

/**랜덤한 숫자(아이템 위치)를 뽑아냄 */
// function randomNumber(min, max) {
//   return Math.random()*(max-min)+min;
// }

/**사운드 재생 */
function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

/**사운드 정지 */
function stopSound(sound) {
  sound.pause();
}