'use strict';

const CARROT_SIZE = 80;
const CARROT_COUNT = 10;
const BUG_COUNT = 7;
const GAME_DURATION_SEC = 5;

const gameField = document.querySelector('.game-field');
// 이미지 랜덤 배치를 위해 filed의  전체적인 사이즈와 위치 알아내기
const fieldRect = gameField.getBoundingClientRect();
const gameBtn = document.querySelector('.game-button');
const gameTimer = document.querySelector('.game-timer');
const gameScore = document.querySelector('.game-score');
const gamePopUp = document.querySelector('.pop-up');
const gamePopUpMessage = document.querySelector('.pop-up-message');
const gamePopUpRefresh = document.querySelector('.pop-up-refresh');

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
  started = !started; // 게임 상태 변경
});

/**게임 시작 함수 */
function startGame() {
  initGame(); // 벌레,당근 생성, 당근 갯수 초기화
  showStopBtn(); // 정지 버튼으로 변경
  startGameTimer(); // 타이머 시작
}

/**게임 정지 함수 */
function stopGame() {
  stopGameTimer(); // 타이머 정지
  hideStartBtn();// 상단 버튼 사라짐
  showPopUpWithText('REPLAY?');// 팝업 등장
}

/**버튼을 중지버튼으로 변경 */
function showStopBtn() {
  const icon = gameBtn.querySelector('.fa-play');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
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

/**팝업 창 등장, 초기화 기능 */
function showPopUpWithText(text) {
  gamePopUpMessage.innerText = text;
  gamePopUp.classList.remove('pop-up-hide');
}