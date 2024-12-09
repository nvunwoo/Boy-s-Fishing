// 초기 플레이어 데이터를 설정하고, localStorage에 저장된 값이 없을 경우 기본값을 저장하는 함수
function initializePlayerData() {
    // 초기 코인 설정 (처음 시작 시 1000코인)
    if (!localStorage.getItem('coins')) {
        localStorage.setItem('coins', 100000);
    }
    // 플레이어가 처음 보유하는 배 설정 (기본값: boat1)
    if (!localStorage.getItem('ownedBoats')) {
        localStorage.setItem('ownedBoats', JSON.stringify(['boat1']));
    }
    // 플레이어가 처음 보유하는 낚시대 설정 (기본값: stick1)
    if (!localStorage.getItem('ownedRods')) {
        localStorage.setItem('ownedRods', JSON.stringify(['stick1']));
    }
    // 처음 착용 중인 배 설정 (기본값: boat1)
    if (!localStorage.getItem('equippedBoat')) {
        localStorage.setItem('equippedBoat', 'boat1');
    }
    // 처음 착용 중인 낚시대 설정 (기본값: stick1)
    if (!localStorage.getItem('equippedRod')) {
        localStorage.setItem('equippedRod', 'stick1');
    }
}

// 저장된 플레이어 데이터를 불러와 화면에 표시하는 함수
function loadPlayerData() {
    initializePlayerData(); // 초기 데이터가 설정되지 않았다면 기본값으로 초기화

    // localStorage에서 데이터 가져오기
    const coins = localStorage.getItem('coins') || 77777; // 보유 코인
    const ownedBoats = JSON.parse(localStorage.getItem('ownedBoats')) || []; // 보유 배 목록
    const ownedRods = JSON.parse(localStorage.getItem('ownedRods')) || []; // 보유 낚시대 목록
    const equippedBoat = localStorage.getItem('equippedBoat') || '없음'; // 착용 중인 배
    const equippedRod = localStorage.getItem('equippedRod') || '없음'; // 착용 중인 낚시대

    // 화면에 데이터 표시
    document.getElementById('coins').innerText = `보유 코인: ${coins}`;
    document.getElementById('ownedBoats').innerText = `구매한 배: ${ownedBoats.join(', ') || '없음'}`;
    document.getElementById('ownedRods').innerText = `구매한 낚시대: ${ownedRods.join(', ') || '없음'}`;
    document.getElementById('equippedBoat').innerText = `착용 중인 배: ${equippedBoat}`;
    document.getElementById('equippedRod').innerText = `착용 중인 낚시대: ${equippedRod}`;
    
}




