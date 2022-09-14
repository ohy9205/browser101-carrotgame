'use strict';

export default class PopUp {
  constructor() {
    this.gamePopUp = document.querySelector('.pop-up');
    this.gamePopUpMessage = document.querySelector('.pop-up-message');
    this.gamePopUpRefresh = document.querySelector('.pop-up-refresh');
    
    /**refresh버튼을 클릭하면 발생하는 동작 */
    this.gamePopUpRefresh.addEventListener('click', ()=>{
      // 해당 인스턴스의 onclick함수에 값이 있으면 함수를 실행한다.
      this.onclick && this.onclick();
      // 해당 팝업을 숨긴다
      this.hide();
    });
  }

  /**외부로부터 전달받은 onclick함수를 해당 인스턴스의 onclick함수에 할당 */
  setClickListener(onclick) {
    this.onclick = onclick;
  }

  /**팝업창 사라짐 */
  hide() {
    this.gamePopUp.classList.add('pop-up-hide');
  }

  /**팝업창을 보여줌 */
  showWithText(text) {
    this.gamePopUpMessage.innerText = text;
    this.gamePopUp.classList.remove('pop-up-hide');
  }
}