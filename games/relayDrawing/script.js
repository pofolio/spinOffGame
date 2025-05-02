class RelayDrawingGame {
    constructor() {
        this.modifiers = ['부끄러운', '화난', '행복한', '슬픈', '놀란', '졸린', '배고픈', '피곤한', '신난', '무서운'];
        this.words = [
            '사자', '코끼리', '기린', '호랑이', '코알라', '팬더', '캥거루', '하마', '코뿔소', '악어',
            '사과', '바나나', '오렌지', '포도', '수박', '딸기', '복숭아', '키위', '파인애플', '망고',
            '피자', '햄버거', '초밥', '파스타', '치킨', '라면', '김밥', '떡볶이', '순대', '만두',
            '의자', '테이블', '침대', '소파', '옷장', '책상', '서랍장', '식탁', '책장',
            '피아노', '기타', '바이올린', '드럼', '색소폰', '하프',
            '자동차', '비행기', '기차', '배', '자전거', '오토바이', '버스', '지하철', '택시', '트럭'
        ];
        
        this.currentWord = null;
        this.currentPlayer = 1;
        this.totalPlayers = 3;
        this.timeLeft = 7;
        this.timerId = null;
        this.isRunning = false;
        this.wordInterval = null;
        this.speed = 20;
        this.deceleration = 0.85;
        this.buzzerSound = new Audio('buzzer.mp3');
        
        this.setupEventListeners();
        this.updateTimerDisplay();
    }
    
    setupEventListeners() {
        document.getElementById('start-game').addEventListener('click', () => this.startGame());
        document.getElementById('next-player').addEventListener('click', () => this.nextPlayer());
        document.getElementById('start-timer').addEventListener('click', () => this.startCountdown());
        document.getElementById('decrease-time').addEventListener('click', () => this.adjustTime(-1));
        document.getElementById('increase-time').addEventListener('click', () => this.adjustTime(1));
        document.getElementById('restart-game').addEventListener('click', () => this.restartGame());
    }
    
    adjustTime(change) {
        this.timeLeft = Math.max(1, this.timeLeft + change);
        this.updateTimerDisplay();
    }
    
    updateTimerDisplay() {
        document.querySelector('.timer-display').textContent = `${this.timeLeft}초`;
        document.querySelector('.countdown-timer').textContent = this.timeLeft;
    }
    
    startGame() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        const startButton = document.getElementById('start-game');
        startButton.disabled = true;
        
        // 타이머 설정 컴포넌트 숨기기
        document.getElementById('timer-settings').style.display = 'none';
        
        const wordDisplay = document.getElementById('current-word');
        
        this.wordInterval = setInterval(() => {
            const randomModifier = this.modifiers[Math.floor(Math.random() * this.modifiers.length)];
            const randomWord = this.words[Math.floor(Math.random() * this.words.length)];
            wordDisplay.textContent = `${randomModifier} ${randomWord}`;
            
            this.speed *= this.deceleration;
            
            if (this.speed < 1) {
                clearInterval(this.wordInterval);
                this.currentWord = wordDisplay.textContent;
                
                setTimeout(() => {
                    document.querySelector('.word-indicator').style.display = 'none';
                    document.querySelector('.word-display').style.display = 'block';
                    document.getElementById('word').textContent = this.currentWord;
                    
                    startButton.disabled = false;
                    this.isRunning = false;
                    this.speed = 50;
                }, 1000);
            }
        }, 100);
    }
    
    startCountdown() {
        if (this.timerId) return;
        
        const countdownTimer = document.querySelector('.countdown-timer');
        const startButton = document.getElementById('start-timer');
        startButton.disabled = true;
        
        let currentTime = this.timeLeft * 10;
        countdownTimer.textContent = (currentTime / 10).toFixed(1);
        
        this.timerId = setInterval(() => {
            currentTime--;
            countdownTimer.textContent = (currentTime / 10).toFixed(1);
            
            if (currentTime === 5) {
                this.buzzerSound.play();
            }
            
            if (currentTime === 0) {
                clearInterval(this.timerId);
                this.timerId = null;
                startButton.disabled = false;
            }
        }, 100);
    }
    
    nextPlayer() {
        this.currentPlayer++;
        if (this.currentPlayer > this.totalPlayers) {
            this.currentPlayer = 1;
        }
        
        document.getElementById('current-player').textContent = this.currentPlayer;
        
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
        document.getElementById('start-timer').disabled = false;
    }
    
    restartGame() {
        this.currentPlayer = 1;
        document.getElementById('current-player').textContent = this.currentPlayer;
        
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
        
        document.querySelector('.word-indicator').style.display = 'block';
        document.querySelector('.word-display').style.display = 'none';
        document.getElementById('timer-settings').style.display = 'block';
        document.getElementById('start-timer').disabled = false;
    }
}

// 게임 시작
window.onload = () => {
    new RelayDrawingGame();
}; 