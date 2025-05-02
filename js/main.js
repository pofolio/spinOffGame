document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const gameContainer = document.querySelector('.game-container');
    
    // 탭 전환 기능
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 활성화된 탭 버튼 제거
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // 클릭된 탭 버튼 활성화
            button.classList.add('active');
            
            const tabName = button.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
    
    function switchTab(tabName) {
        const gameList = document.querySelector('.game-list');
        
        switch(tabName) {
            case 'home':
                gameList.style.display = 'grid';
                break;
            case 'games':
                gameList.style.display = 'grid';
                break;
            case 'about':
                gameList.style.display = 'none';
                gameContainer.innerHTML = `
                    <div class="about-content">
                        <h2>레트로 게임 월드</h2>
                        <p>여러가지 재미있는 게임들을 즐겨보세요!</p>
                        <p>곧 새로운 게임들이 추가될 예정입니다.</p>
                    </div>
                `;
                break;
        }
    }
    
    // 게임 카드 클릭 이벤트
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
        card.addEventListener('click', () => {
            const gameName = card.querySelector('h2').textContent;
            alert(`${gameName}은(는) 곧 출시될 예정입니다!`);
        });
    });
}); 