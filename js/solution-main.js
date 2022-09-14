'use strict';

const CARROT_SIZE = 80;
const gameField = document.querySelector('.game-field');
// 이미지 랜덤 배치를 위해 filed의  전체적인 사이즈와 위치 알아내기
const fieldRect = gameField.getBoundingClientRect();

/**벌레, 당근 생성 */
function initGame() {
  console.log(fieldRect);
  addItem('carrot', 10, '../img/carrot.png');
  addItem('bug', 7, '../img/bug.png');
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

initGame();