'use strict';

const CARROT_SIZE = 80;
const CARROT_COUNT = 10;
const BUG_COUNT = 7;
const GAME_DURATION_SEC = 5;

const gameField = document.querySelector('.game-field');
const fieldRect = gameField.getBoundingClientRect(); // 이미지 랜덤 배치를 위해 filed의  전체적인 사이즈와 위치 알아내기
const gameBtn = document.querySelector('.game-button');
const gameTimer = document.querySelector('.game-timer');
const gameScore = document.querySelector('.game-score');
const gamePopUp = document.querySelector('.pop-up');
const gamePopUpMessage = document.querySelector('.pop-up-message');
const gamePopUpRefresh = document.querySelector('.pop-up-refresh');

const carrotSound = new Audio('../sound/carrot_pull.mp3');
const bugSound = new Audio('../sound/bug_pull.mp3');
const bgSound = new Audio('../sound/bg.mp3');
const alertSound = new Audio('../sound/alert.wav');
const winSound = new Audio('../sound/game_win.mp3');

// 게임의 상태를 기억하는 변수들
let started = false;
let score = 0;
let timer = undefined;

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
  showPopUpWithText('REPLAY?');// 팝업 등장
  started = false; // 게임 상태 변경
}

/**게임 종료 함수 */
function finishGame(win) {
  started = false;
  stopGameTimer(); 
  hideStartBtn();
  if(win) {
    playSound(winSound);
    showPopUpWithText('YOU WIN🎉');
  } else {
    playSound(bugSound);
    showPopUpWithText('YOU LOST💥')
  }
  stopSound(bgSound);
}

/**당근, 버튼 클릭 이벤트 처리 */
gameField.addEventListener('click', onFieldClick); // (e) => onFieldClick(e) 생략된것

/**게임 리플레이 클릭 이벤트 처리 */
gamePopUpRefresh.addEventListener('click', ()=>{
  startGame();
  showStartBtn();
  hidePopUp();
});

/**필드 클릭 시 동작 구현*/
function onFieldClick(e) {
  if(!started) { // 게임이 시작되지 않았으면 함수 리턴
    return;
  }
  const target = e.target;
  if(target.matches('.carrot')) {
    playSound(carrotSound);
    target.remove();
    score++;
    updateScore();
    if(score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if(target.matches('.bug')) {
    playSound(bugSound);
    finishGame(false);
  }
}

/**당근 카운트 업데이트 */
function updateScore() {
  gameScore.innerText = CARROT_COUNT - score;
}

/**버튼을 중지버튼으로 변경 */
function showStopBtn() {
  const icon = gameBtn.querySelector('.fa-solid');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
}

/**게임 정지 시 버튼을 숨김 */
function hideStartBtn() {
  gameBtn.style.visibility = 'hidden';
}

/**게임 replay 시 버튼을 보임 */
function showStartBtn() {
  gameBtn.style.visibility = 'visible';
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
  gameField.innerHTML = '';
  addItem('carrot', CARROT_COUNT, '../img/carrot.png');
  addItem('bug', BUG_COUNT, '../img/bug.png');
  gameScore.innerHTML = CARROT_COUNT;
  score = 0;
}

/**게임 필드에 아이템을 추가 */
function addItem(className, count, imgPath) {
  /*랜덤할 숫자를 만들 범위 설정
    이미지가 튀어나가지 않게 전체 범위에서 이미지 사이즈를 빼준다*/
  const x1 = 0;
  const y1 = 0;
  const x2 = fieldRect.width-CARROT_SIZE;
  const y2 = fieldRect.height-CARROT_SIZE;

  for(let i=0; i<count; i++) {
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    item.style.position = 'absolute';
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;
    gameField.appendChild(item);
  }
}

/**랜덤한 숫자(아이템 위치)를 뽑아냄 */
function randomNumber(min, max) {
  return Math.random()*(max-min)+min;
}

/**팝업 창 등장 */
function showPopUpWithText(text) {
  gamePopUpMessage.innerText = text;
  gamePopUp.classList.remove('pop-up-hide');
}

/**팝업 창 숨기기 */
function hidePopUp() {
  gamePopUp.classList.add('pop-up-hide');
}

/**사운드 재생 */
function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

/**사운드 정지 */
function stopSound(sound) {
  sound.pause();
}