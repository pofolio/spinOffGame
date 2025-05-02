class DdakjiGame {
    constructor() {
        this.teamAScore = 0;
        this.teamBScore = 0;
        this.currentRound = 1;
        this.maxRounds = 5;
        this.isGameStarted = false;
        
        this.initializeElements();
        this.setupEventListeners();
    }

    initializeElements() {
        this.startButton = document.getElementById('start-game');
        this.nextRoundButton = document.getElementById('next-round');
        this.currentRoundDisplay = document.getElementById('current-round');
        this.teamAScoreDisplay = document.querySelector('.team-score:nth-child(1) .score');
        this.teamBScoreDisplay = document.querySelector('.team-score:nth-child(2) .score');
    }

    setupEventListeners() {
        this.startButton.addEventListener('click', () => this.startGame());
        this.nextRoundButton.addEventListener('click', () => this.nextRound());
    }

    startGame() {
        this.isGameStarted = true;
        this.startButton.disabled = true;
        this.nextRoundButton.disabled = false;
        this.updateUI();
    }

    nextRound() {
        if (this.currentRound < this.maxRounds) {
            this.currentRound++;
            this.updateUI();
        }
    }

    updateUI() {
        this.currentRoundDisplay.textContent = this.currentRound;
        this.teamAScoreDisplay.textContent = this.teamAScore;
        this.teamBScoreDisplay.textContent = this.teamBScore;
    }

    resetGame() {
        this.teamAScore = 0;
        this.teamBScore = 0;
        this.currentRound = 1;
        this.isGameStarted = false;
        this.startButton.disabled = false;
        this.nextRoundButton.disabled = true;
        this.updateUI();
    }
}

// 게임 인스턴스 생성
const game = new DdakjiGame(); 