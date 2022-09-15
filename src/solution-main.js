'use strict';

import PopUp from './popup.js';
import {GameBuilder, Reason} from './game.js';
import * as sound from './sound.js';

// PopUp클래스의 인스턴스 생성
const gameFinishPopup = new PopUp();

// Game클래스의 인스턴스 생성
const game = new GameBuilder()
.gameDuration(5)
.carrotCount(3)
.bugCount(3)
.build();

game.setGameStopListener((reason) => {
  let message;
  switch(reason) {
    case Reason.cancle:
      message = 'REPLAY❓'
      sound.playsoundAlert();
      break;
    case Reason.win:
      message = '🎉YOU WON🎉'
      sound.playsoundWin();
      break;
    case Reason.lose:
      message = 'YOU LOST💥'
      sound.playsoundBug();
      break;
    default:
    throw new Error('not valid reason');
  }
  gameFinishPopup.showWithText(message);
});

/**팝업의 replay버튼을 누르면 게임 재시작 */
gameFinishPopup.setClickListener(() => {
  game.start();
});
