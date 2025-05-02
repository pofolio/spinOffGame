document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
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
        // 모든 탭 컨텐츠 숨김
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        
        // 선택된 탭 컨텐츠 표시
        const selectedContent = document.getElementById(`${tabName}-content`);
        if (selectedContent) {
            selectedContent.classList.add('active');
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