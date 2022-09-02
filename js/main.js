const playContainer = document.querySelector('.play-container');
const playBtn = document.querySelector('.play-btn');
const timer = document.querySelector('.timer');
const carrcotCounter = document.querySelector('.carrot-counter');
const mainContainer = document.querySelector('.main-container');

let carrotCount = 10;
let time = 10;

playBtn.addEventListener('click', ()=>{

  // 버튼변경 
  replaceBtn();

  // 타이머

  // 당근, 벌레 생성

  // 당근 수
  
  // 음악

});

function replaceBtn() {
  const stopBtn = document.createElement('button');
  stopBtn.setAttribute('class','.stop-btn play-btn');
  stopBtn.setAttribute('type', 'button');
  stopBtn.innerHTML = '■';
  stopBtn.addEventListener('click', ()=>{
    popUp('replay?');
  });
  
  playContainer.replaceChildren(stopBtn);
}

function popUp(result) {
  const popup = document.createElement('div');
  popup.setAttribute('class','popup-container');
  popup.innerHTML = `
    <div class='popup'>
      <button type='button' class='replay-btn play-btn'>⭮</button>
      <p class='popup-text'>${result}</p>
    </div>
  `;
  mainContainer.appendChild(popup);
  playContainer.style.visibility = 'hidden';
}