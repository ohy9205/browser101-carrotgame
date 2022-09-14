'use strict';

import * as sound from './sound.js';

const CARROT_SIZE = 80;

export default class Field {
  constructor(carrotCount, bugCount) {
    this.gameField = document.querySelector('.game-field');
    this.fieldRect = this.gameField.getBoundingClientRect(); // 이미지 랜덤 배치를 위해 filed의  전체적인 사이즈와 위치 알아내기
    
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;

    this.gameField.addEventListener('click', this.onclick);
  }

  /**외부로부터 전달받은 onItemClick함수를 해당 인스턴스의 onItemClick에 할당 */
  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  /**필드에 당근, 벌레 생성하는 함수 호출 */
  init() {
    this.gameField.innerHTML = '';
    this._addItem('carrot', this.carrotCount, '../img/carrot.png');
    this._addItem('bug', this.bugCount, '../img/bug.png');
  }

  /**당근과 벌레를 실제로 생성.언더 바(_)는 private의미 */
  _addItem(className, count, imgPath) {
    /*랜덤할 숫자를 만들 범위 설정
      이미지가 튀어나가지 않게 전체 범위에서 이미지 사이즈를 빼준다*/
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width-CARROT_SIZE;
    const y2 = this.fieldRect.height-CARROT_SIZE;

    for(let i=0; i<count; i++) {
      const item = document.createElement('img');
      item.setAttribute('class', className);
      item.setAttribute('src', imgPath);
      item.style.position = 'absolute';
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.gameField.appendChild(item);
    }
  }

  /**필드를 클릭하면 발생하는 동작 */
  onclick(event) {
    const target = event.target;
    if(target.matches('.carrot')) {
      sound.playsoundCarrot();
      target.remove();
      this.onItemClick && this.onItemClick('carrot');
    } else if(target.matches('.bug')) {
      this.onItemClick && this.onItemClick('bug');
      sound.playsoundBug();
    }
  }
}

/**당근, 벌레의 좌표값을 랜덤하게 뽑음 */
function randomNumber(min, max) {
  return Math.random()*(max-min)+min;
}