class Fireworks {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.fireworks = [];
        this.hue = 120;
        this.timerTotal = 180;
        this.timerTick = 0;
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    launch(x, y) {
        const firework = {
            x: x,
            y: y,
            targetX: Math.random() * this.canvas.width,
            targetY: Math.random() * this.canvas.height / 2,
            speed: 2,
            angle: Math.atan2(this.canvas.height - y, x - this.canvas.width / 2),
            velocity: {
                x: Math.cos(Math.atan2(this.canvas.height - y, x - this.canvas.width / 2)) * this.speed,
                y: Math.sin(Math.atan2(this.canvas.height - y, x - this.canvas.width / 2)) * this.speed
            },
            brightness: Math.random() * 50 + 50,
            targetRadius: 1
        };
        this.fireworks.push(firework);
    }

    createParticles(x, y) {
        const particleCount = 100;
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: x,
                y: y,
                radius: Math.random() * 2 + 1,
                color: `hsl(${this.hue}, 100%, 50%)`,
                speed: Math.random() * 5 + 2,
                angle: Math.random() * Math.PI * 2,
                friction: 0.95,
                gravity: 0.2,
                brightness: Math.random() * 50 + 50,
                alpha: 1,
                decay: Math.random() * 0.015 + 0.003
            });
        }
    }

    update() {
        this.ctx.globalCompositeOperation = 'destination-out';
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.globalCompositeOperation = 'lighter';

        this.timerTick++;
        if (this.timerTick >= this.timerTotal) {
            this.timerTick = 0;
            this.launch(Math.random() * this.canvas.width, this.canvas.height);
        }

        for (let i = this.fireworks.length - 1; i >= 0; i--) {
            const firework = this.fireworks[i];
            firework.x += firework.velocity.x;
            firework.y += firework.velocity.y;
            firework.velocity.y += 0.1;

            if (firework.y <= firework.targetY) {
                this.createParticles(firework.x, firework.y);
                this.fireworks.splice(i, 1);
            }
        }

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.velocity = {
                x: Math.cos(p.angle) * p.speed,
                y: Math.sin(p.angle) * p.speed + p.gravity
            };
            p.speed *= p.friction;
            p.x += p.velocity.x;
            p.y += p.velocity.y;
            p.alpha -= p.decay;

            if (p.alpha <= p.decay) {
                this.particles.splice(i, 1);
                continue;
            }

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
            this.ctx.fillStyle = p.color;
            this.ctx.fill();
        }

        if (this.fireworks.length > 0 || this.particles.length > 0) {
            requestAnimationFrame(() => this.update());
        }
    }

    start() {
        this.update();
    }
}

class TeamAssignmentGame {
    constructor() {
        this.names = [];
        this.leaders = [];
        this.teams = {};
        this.selectedName = null;
        this.indicatorMessages = [
            '성신이 몰래 마라탕을 숨기는 중...',
            '주현이의 개구리를 슬쩍하는 중...',
            '형우의 오리를 조용히 납치하는 중...',
            '수민이의 기아가 또 지는 걸 지켜보는 중...',
            '지원이의 빵떡이 엉덩이를 탐내는 중...',
            '윤성이의 한화가 결국 18연패 달성하는 중...',
            '우진이의 수면안대를 은밀하게 가져오는 중...',
            '현주의 어깨가 리듬에 맞춰 들썩이는 중...',
        ];
        
        this.initializeGame();
        this.setupEventListeners();
        this.fireworks = new Fireworks(document.getElementById('fireworks-canvas'));
    }

    initializeGame() {
        this.updateNameList();
        this.updateLeaderList();
    }

    setupEventListeners() {
        const nameInput = document.getElementById('name-input');
        const addNameBtn = document.getElementById('add-name');
        const assignTeamsBtn = document.getElementById('assign-teams');
        const resetBtn = document.getElementById('reset-btn');
        const nameList = document.getElementById('name-list');
        const leaderList = document.getElementById('leader-list');
        const popup = document.getElementById('name-options-popup');
        const selectedNameDisplay = document.getElementById('selected-name');
        const selectLeaderBtn = document.getElementById('select-leader');
        const removeNameBtn = document.getElementById('remove-name');
        const cancelOptionsBtn = document.getElementById('cancel-options');

        if (!nameInput || !addNameBtn || !assignTeamsBtn || !resetBtn || !nameList || !leaderList || !popup) {
            console.error('필수 DOM 요소를 찾을 수 없습니다.');
            return;
        }

        // 이름 입력 이벤트
        nameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addName(nameInput.value);
                nameInput.value = '';
            }
        });

        addNameBtn.addEventListener('click', () => {
            this.addName(nameInput.value);
            nameInput.value = '';
        });

        // 이름 클릭 이벤트
        nameList.addEventListener('click', (e) => {
            if (e.target.classList.contains('name-tag')) {
                this.selectedName = e.target.dataset.name;
                selectedNameDisplay.textContent = this.selectedName;
                popup.style.display = 'flex';
            }
        });

        // 팝업 버튼 이벤트
        selectLeaderBtn.addEventListener('click', () => {
            if (this.selectedName && !this.leaders.includes(this.selectedName)) {
                this.leaders.push(this.selectedName);
                this.updateLeaderList();
            }
            popup.style.display = 'none';
        });

        removeNameBtn.addEventListener('click', () => {
            if (this.selectedName) {
                this.removeName(this.selectedName);
            }
            popup.style.display = 'none';
        });

        cancelOptionsBtn.addEventListener('click', () => {
            popup.style.display = 'none';
        });

        // 팝업 외부 클릭 시 닫기
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.style.display = 'none';
            }
        });

        // 팀 배정 버튼 이벤트
        assignTeamsBtn.addEventListener('click', () => {
            if (this.names.length < 2) {
                alert('팀을 만들려면 최소 2명 이상의 참가자가 필요합니다!');
                return;
            }
            
            const indicator = document.getElementById('team-assign-indicator');
            const indicatorText = document.getElementById('indicator-text');
            indicator.style.display = 'flex';

            const messages = [
                '형우의 오리를 조용히 납치하는 중...',
                '성신이 몰래 마라탕을 숨기는 중...',
                '주현이의 개구리를 슬쩍하는 중...',
                '수민이의 기아가 또 지는 걸 지켜보는 중...',
                '지원이의 빵떡이 엉덩이를 탐내는 중...',
                '윤성이의 한화가 결국 18연패 달성하는 중...',
                '우진이의 수면안대를 은밀하게 가져오는 중...',
                '현주의 어깨가 리듬에 맞춰 들썩이는 중...',
            ];

            // 첫 번째 문구를 바로 표시
            indicatorText.textContent = messages[0];
            let currentMessage = 1;
            
            const interval = setInterval(() => {
                indicatorText.textContent = messages[currentMessage];
                currentMessage = (currentMessage + 1) % messages.length;
            }, 500);

            setTimeout(() => {
                clearInterval(interval);
                indicator.style.display = 'none';
                this.assignTeams();
            }, 4000);
        });

        // 리셋 버튼 이벤트
        resetBtn.addEventListener('click', () => {
            this.resetGame();
        });
    }

    addName(name) {
        name = name.trim();
        if (name && !this.names.includes(name)) {
            this.names.push(name);
            this.updateNameList();
        }
    }

    removeName(name) {
        this.names = this.names.filter(n => n !== name);
        this.leaders = this.leaders.filter(l => l !== name);
        this.updateNameList();
        this.updateLeaderList();
    }

    updateNameList() {
        const nameList = document.getElementById('name-list');
        if (!nameList) return;
        
        nameList.innerHTML = '';
        
        this.names.forEach(name => {
            const nameTag = document.createElement('div');
            nameTag.className = 'name-tag';
            nameTag.textContent = name;
            nameTag.dataset.name = name;
            
            nameList.appendChild(nameTag);
        });
    }

    updateLeaderList() {
        const leaderList = document.getElementById('leader-list');
        if (!leaderList) return;
        
        leaderList.innerHTML = '';
        
        this.leaders.forEach(name => {
            const nameTag = document.createElement('div');
            nameTag.className = 'name-tag leader';
            nameTag.textContent = name;
            nameTag.dataset.name = name;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = '×';
            deleteBtn.onclick = () => {
                this.leaders = this.leaders.filter(l => l !== name);
                this.updateLeaderList();
            };
            
            nameTag.appendChild(deleteBtn);
            leaderList.appendChild(nameTag);
        });
    }

    assignTeams() {
        // 팀장이 선택되지 않은 경우 A, B팀으로 나누기
        if (this.leaders.length === 0) {
            const shuffledNames = [...this.names].sort(() => Math.random() - 0.5);
            const half = Math.ceil(shuffledNames.length / 2);
            
            this.teams = {
                'A팀': shuffledNames.slice(0, half),
                'B팀': shuffledNames.slice(half)
            };
        } else {
            // 기존 로직: 팀장 중심으로 팀 배정
            const nonLeaders = this.names.filter(name => !this.leaders.includes(name));
            const shuffledNonLeaders = [...nonLeaders].sort(() => Math.random() - 0.5);
            
            this.teams = {};
            this.leaders.forEach((leader, index) => {
                this.teams[`${index + 1}팀`] = [leader];
            });
            
            let teamIndex = 0;
            shuffledNonLeaders.forEach(name => {
                const teamKey = `${teamIndex + 1}팀`;
                this.teams[teamKey].push(name);
                teamIndex = (teamIndex + 1) % this.leaders.length;
            });
        }
        
        this.displayResults();
        
        // 폭죽 효과 시작
        this.fireworks.start();
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.fireworks.launch(
                    Math.random() * window.innerWidth,
                    window.innerHeight
                );
            }, i * 200);
        }
    }

    displayResults() {
        const resultSection = document.getElementById('result-section');
        const teamList = document.getElementById('team-list');
        
        if (!resultSection || !teamList) return;
        
        teamList.innerHTML = '';
        
        Object.entries(this.teams).forEach(([leader, members]) => {
            const teamDiv = document.createElement('div');
            teamDiv.className = 'team';
            
            const leaderDiv = document.createElement('div');
            leaderDiv.className = 'team-leader';
            leaderDiv.textContent = `파티장: ${leader}`;
            
            const membersDiv = document.createElement('div');
            membersDiv.className = 'team-members';
            membersDiv.textContent = `팀원: ${members.join(', ')}`;
            
            teamDiv.appendChild(leaderDiv);
            teamDiv.appendChild(membersDiv);
            teamList.appendChild(teamDiv);
        });
        
        resultSection.style.display = 'block';
    }

    resetGame() {
        this.names = [];
        this.leaders = [];
        this.teams = {};
        this.updateNameList();
        this.updateLeaderList();
        
        const resultSection = document.getElementById('result-section');
        if (resultSection) {
            resultSection.style.display = 'none';
        }
        
        const popup = document.getElementById('name-options-popup');
        if (popup) {
            popup.style.display = 'none';
        }
    }
}

// 게임 시작
document.addEventListener('DOMContentLoaded', () => {
    new TeamAssignmentGame();
}); 