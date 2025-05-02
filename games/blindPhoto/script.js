class Timer {
    constructor() {
        this.timeLeft = 300; // 5분 = 300초
        this.timerId = null;
        this.isRunning = false;
        this.isAlarmPlaying = false;
        
        this.timerDisplay = document.querySelector('.timer-display');
        this.startButton = document.getElementById('start-timer');
        this.pauseButton = document.getElementById('pause-timer');
        this.resetButton = document.getElementById('reset-timer');
        this.alarm = document.getElementById('timer-alarm');
        
        this.setupEventListeners();
        this.updateDisplay();
    }
    
    setupEventListeners() {
        this.startButton.addEventListener('click', () => this.start());
        this.pauseButton.addEventListener('click', () => this.pause());
        this.resetButton.addEventListener('click', () => {
            if (this.isAlarmPlaying) {
                this.stopAlarm();
            } else {
                this.reset();
            }
        });
    }
    
    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.timerId = setInterval(() => {
                this.timeLeft--;
                this.updateDisplay();
                
                if (this.timeLeft <= 0) {
                    this.stop();
                    this.playAlarm();
                }
            }, 1000);
        }
    }
    
    pause() {
        if (this.isRunning) {
            this.isRunning = false;
            clearInterval(this.timerId);
        }
    }
    
    reset() {
        this.pause();
        this.timeLeft = 300;
        this.updateDisplay();
    }
    
    stop() {
        this.isRunning = false;
        clearInterval(this.timerId);
    }
    
    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    playAlarm() {
        this.isAlarmPlaying = true;
        this.alarm.loop = true;
        this.alarm.play();
        this.resetButton.textContent = '알람 종료';
    }

    stopAlarm() {
        this.isAlarmPlaying = false;
        this.alarm.loop = false;
        this.alarm.pause();
        this.alarm.currentTime = 0;
        this.resetButton.textContent = '리셋';
    }
}

// 타이머 초기화
document.addEventListener('DOMContentLoaded', () => {
    new Timer();
}); 