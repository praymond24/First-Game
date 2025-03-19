document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.getElementById('game-area');
    const target = document.getElementById('target');
    const scoreElement = document.getElementById('score');
    const startButton = document.getElementById('start-button');
    
    let score = 0;
    let gameRunning = false;
    let gameSpeed = 1000;
    let timeoutId;
    
    // Initial setup
    target.style.display = 'none';
    
    // Start game function
    function startGame() {
        if (gameRunning) return;
        
        gameRunning = true;
        score = 0;
        scoreElement.textContent = score;
        gameSpeed = 1000;
        startButton.textContent = 'Reset Game';
        
        // Show target
        target.style.display = 'block';
        moveTarget();
    }
    
    // Reset game function
    function resetGame() {
        gameRunning = false;
        target.style.display = 'none';
        startButton.textContent = 'Start Game';
        clearTimeout(timeoutId);
    }
    
    // Move target to random position
    function moveTarget() {
        if (!gameRunning) return;
        
        const maxX = gameArea.clientWidth - target.clientWidth;
        const maxY = gameArea.clientHeight - target.clientHeight;
        
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        
        target.style.left = `${randomX}px`;
        target.style.top = `${randomY}px`;
        
        // Reduce size slightly on each move to increase difficulty
        const currentSize = Math.max(15, parseInt(getComputedStyle(target).width) - 0.5);
        target.style.width = `${currentSize}px`;
        target.style.height = `${currentSize}px`;
        
        // Game gets faster as you score higher
        gameSpeed = Math.max(300, 1000 - (score * 20));
        
        // Auto move after delay
        timeoutId = setTimeout(moveTarget, gameSpeed);
    }
    
    // Click event for target
    target.addEventListener('click', () => {
        if (!gameRunning) return;
        
        // Increase score
        score++;
        scoreElement.textContent = score;
        
        // Clear previous timeout and move immediately
        clearTimeout(timeoutId);
        moveTarget();
        
        // Visual feedback
        target.style.backgroundColor = getRandomColor();
    });
    
    // Generate random color for target
    function getRandomColor() {
        const colors = ['#ff5252', '#7b1fa2', '#303f9f', '#00897b', '#ffa000', '#c2185b'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Toggle between start and reset
    startButton.addEventListener('click', () => {
        if (gameRunning) {
            resetGame();
        } else {
            startGame();
        }
    });
});