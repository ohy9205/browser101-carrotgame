'use strict';

import PopUp from './popup.js';
import GameBuild from './game.js';
import GameBuilder from './game.js';

// PopUp클래스의 인스턴스 생성
const gameFinishPopup = new PopUp();
gameFinishPopup.setClickListener(() => {
  game.start();
});

// Game클래스의 인스턴스 생성
const game = new GameBuilder()
.gameDuration(5)
.carrotCount(3)
.bugCount(3)
.build();

game.setGameStopListener((reason) => {
  let message;
  switch(reason) {
    case 'cancel':
      message = 'REPLAY❓'
      break;
    case 'win':
      message = '🎉YOU WON🎉'
      break;
    case 'lose':
      message = 'YOU LOST💥'
      break;
    default:
    throw new Error('not valid reason');
  }
  gameFinishPopup.showWithText(message);
});
