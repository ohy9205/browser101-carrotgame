'use strict';

import PopUp from './popup.js';
import Field from './field.js';
import * as sound from './sound.js';

export default class Game {
  constructor(gameDuration, carrotCount, bugCount) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.gameBtn = document.querySelector('.game-button');
    this.gameTimer = document.querySelector('.game-timer');
    this.gameScore = document.querySelector('.game-score');
    
    this.gameBtn.addEventListener('click', ()=>{
      if(this.started) {
        this.stop();
      } else {
        this.start();
      }
    });


    // Field클래스의 인스턴스 생성
    this.gameField = new Field(carrotCount, bugCount);
    this.gameField.setClickListener(this.onItemClick);

    // 게임의 상태를 기억하는 변수들
    this.started = false;
    this.score = 0;
    this.timer = undefined;
  }

  /**게임이 멈췄을때 알려주는 함수 */
  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }
  
  /**필드 클릭 시 동작 구현*/
  onItemClick = (item) => {
    if(!this.started) { // 게임이 시작되지 않았으면 함수 리턴
      return;
    }
    if(item === 'carrot') {
      this.score++;
      this.updateScore();
      if(this.score === this.carrotCount) {
        this.finish(true);
      }
    } else if(item === 'bug') {
      this.finish(false);
    }
  }

    
  /**게임 시작 함수 */
  start = () => {
    sound.playsoundBg();
    this.initGame(); // 벌레,당근 생성, 당근 갯수 초기화
    this.showStopBtn(); // 정지 버튼으로 변경
    this.startGameTimer(); // 타이머 시작
    this.started = true; // 게임 상태 변경
  }

  /**게임 정지 함수 */
  stop = () => {
    sound.stopsoundBg();
    sound.playsoundAlert();
    this.stopGameTimer(); // 타이머 정지
    this.hideStartBtn();// 상단 버튼 사라짐
    this.started = false; // 게임 상태 변경
    this.onGameStop && this.onGameStop('cancel');
  }

  /**게임 종료 함수 */
  finish(win) {
    this.started = false;
    this.stopGameTimer(); 
    this.hideStartBtn();
    sound.stopsoundBg();
    if(win) {
      sound.playsoundWin();
      this.onGameStop && this.onGameStop('win');
    } else {
      sound.playsoundBug();
      this.onGameStop && this.onGameStop('lose');
    }
  }




  /**버튼을 중지버튼으로 변경 */
  showStopBtn() {
    const icon = this.gameBtn.querySelector('.fa-solid');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    this.gameBtn.style.visibility = 'visible';
  }

  /**게임 정지 시 버튼을 숨김 */
  hideStartBtn() {
    this.gameBtn.style.visibility = 'hidden';
  }

  /**타이머 시작 */
  startGameTimer() {
    let remainingTimeSec = this.gameDuration; // 남은 시간동안 setInerval이 실행되게 만든다
    this.updateTimerText(remainingTimeSec);
    this.timer = setInterval(()=>{
      if(remainingTimeSec <= 0) {
        clearInterval(this.timer);
        this.finish(this.carrotCount === this.score);
        return;
      }
      this.updateTimerText(--remainingTimeSec);
    },1000);
  }

  /**타이머 정지 */
  stopGameTimer() {
    clearInterval(this.timer);
  }

  /**타이머를 분:초 단위로 업데이트한다 */
  updateTimerText(remainingTimeSec) {
    const minutes = Math.floor(remainingTimeSec / 60);
    const seconds = Math.floor(remainingTimeSec % 60);
    this.gameTimer.innerText = `${minutes}:${seconds}`;
  }

  /**벌레, 당근 생성, 당근갯수 카운트 초기화 */
  initGame() {
    this.gameScore.innerHTML = this.carrotCount;
    this.score = 0;
    this.gameField.init();
  }

  
  /**당근 카운트 업데이트 */
  updateScore() {
    this.gameScore.innerText = this.carrotCount - this.score;
  }


} 