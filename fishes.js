const aquarium = document.querySelector('.aspect-ratio-box');

var gainedcoins = 0; // 획득 코인을 0으로 설정

const coinDisplay = document.getElementById("gold-display");

function updatecoins(amount) {
  gainedcoins = parseInt(gainedcoins) + amount; // 코인 증가
  coinDisplay.textContent = `획득 코인: ${gainedcoins}`;

  // gainedcoins 값을 window 객체에 저장
  window.gainedcoins = gainedcoins;
}

// 각 높이 구간에 속하는 물고기 이미지와 코인 양 설정
const fishImages = [
  [
      {src: 'fish1.png', value: 10},
      {src: 'fish2.png', value: 10},
      {src: 'fish3.png', value: 10}
  ], // 첫 번째 구간 (20%~40%)
  [
      {src: 'fish4.png', value: 20},
      {src: 'fish5.png', value: 20},
      {src: 'fish6.png', value: 20}
  ], // 두 번째 구간 (40%~60%)
  [
      {src: 'fish7.png', value: 30},
      {src: 'fish8.png', value: 30},
      {src: 'fish9.png', value: 30}
  ], // 세 번째 구간 (60%~80%)
  [
      {src: 'fish4_1.png', value: 40},
      {src: 'fish4_2.png', value: 40},
      {src: 'fish4_3.png', value: 40}
  ]  // 네 번째 구간 (예외처리)
];

function isCollision(element1, element2) { //충돌 감지 함수
  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();

  return (
    rect1.left < rect2.right &&
    rect1.right > rect2.left &&
    rect1.top < rect2.bottom &&
    rect1.bottom > rect2.top
  );
}

function checkCollision(fish, fish_hook) {
  if (isCollision(fish, fish_hook)) {
    fish.remove(); // 충돌 시 물고기 제거
    updatecoins(parseInt(fish.dataset.value)); // 코인 획득
  }
}

function firstfish() {
  const randomImage = fishImages[Math.floor(Math.random() * fishImages.length)];
  const startY = Math.random() * 20+20; // 시작 위치 (화면 높이의 20% ~ 40%)
}

// 물고기 생성 함수
function createFish() {
  const fish = document.createElement('div');
  fish.classList.add('fish');

  // 랜덤 이미지 선택
  //const randomImage = fishImages[Math.floor(Math.random() * fishImages.length)];

  // 물고기 스타일 설정
  const size = 100; // 물고기 크기 
  const direction = Math.random() > 0.5 ? 'right' : 'left'; // 이동 방향
  const startY = Math.random() * 60+20; // 시작 위치 (화면 높이의 20% ~ 80%)

  // 높이에 따라 다른 물고기 종류와 코인 양 설정
  let fishData;
  if (startY <= 40) {
      fishData = fishImages[0][Math.floor(Math.random() * 3)]; // 20% ~ 40%
  } else if (startY <= 60) {
      fishData = fishImages[1][Math.floor(Math.random() * 3)]; // 40% ~ 60%
  } else if (startY <= 80) {
      fishData = fishImages[2][Math.floor(Math.random() * 3)]; // 60% ~ 80%
  } else {
      fishData = fishImages[3][Math.floor(Math.random() * 3)]; // 만약 80%를 초과하는 값이 생긴다면 (예외처리)
  }
  
  // 랜덤 이미지 및 코인 양 선택
  const randomImage = fishData.src;
  fish.dataset.value = fishData.value; // 코인 양 설정

  // 동적으로 스타일 설정
  fish.style.position = 'absolute';
  fish.style.width = `${size}px`;
  fish.style.height = `${size / 2}px`;
  fish.style.backgroundImage = `url(${randomImage})`;
  fish.style.backgroundSize = 'contain';
  fish.style.backgroundRepeat = 'no-repeat';
  
  // 시작 위치와 애니메이션 방향 설정
  if (direction === 'right') {
    fish.style.left = '-60px'; // 왼쪽 화면 밖
    fish.style.transform = 'scaleX(1) translateX(0)'; // 좌우 반전
    fish.style.animation = `swimRight 7s linear`;
  } else {
    fish.style.left = '100vw'; // 오른쪽 화면 밖
    fish.style.transform = 'scaleX(1)'; // 좌우 반전 djqtdma
    fish.style.animation = `swimLeft 7s linear`;
  }
  fish.style.top = `${startY}vh`;
  
  // 물고기 추가
  aquarium.appendChild(fish);
  
  // 애니메이션 끝나면 물고기 삭제
  fish.addEventListener('animationend', () => {
    fish.remove();
  });
}

  
  
// CSS 애니메이션 생성
const style = document.createElement('style');
style.innerHTML = `
  @keyframes swimRight {
    from {
      transform: scaleX(-1) translateX(0);
    }
    to {
      transform: scaleX(-1) translateX(-110vw);
    }
  }
  @keyframes swimLeft {
    from {
      transform: translateX(0);
    }
    to {
      transform: scaleX(1) translateX(-110vw);
    }
  }
`;
document.head.appendChild(style);

function gameLoop() {
  const fishes = document.querySelectorAll('.fish');
  const fish_hook = document.querySelector('.fish_hook');

  fishes.forEach((fish) => {
    checkCollision(fish, fish_hook);
  });

  requestAnimationFrame(gameLoop);
}

// 일정 시간마다 물고기 생성
setInterval(createFish, 1000);
gameLoop();