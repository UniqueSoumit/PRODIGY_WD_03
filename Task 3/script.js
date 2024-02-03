document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const playerXScore = document.getElementById('player-X');
    const playerOScore = document.getElementById('player-O');
    const scoreBoard = document.getElementById('score-board');
    const resetButton = document.getElementById('reset-button');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    let round = 1;
    let scoreX = 0;
    let scoreO = 0;

    // Create the game board
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.index = i;
        cell.addEventListener('click', () => cellClick(cell));
        board.appendChild(cell);
    }

    // Handle cell click
    function cellClick(cell) {
        const index = cell.dataset.index;
        if (gameBoard[index] === '' && gameActive) {
            gameBoard[index] = currentPlayer;
            cell.textContent = currentPlayer;
            if (checkWin()) {
                updateScore();
                alert(`Player ${currentPlayer} wins Round ${round}!`);
                resetBoard();
                if (round === 3) {
                    endGame();
                    resetGame();
                } else {
                    round++;
                }
            } else if (gameBoard.every(cell => cell !== '')) {
                alert('It\'s a tie!');
                resetBoard();
                if (round === 3) {
                    endGame();
                    resetGame();
                } else {
                    round++;
                }
            } else {
                currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
            }
        }
    }

    // Check for a win
    function checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]              // Diagonals
        ];

        return winPatterns.some(pattern =>
            pattern.every(index => gameBoard[index] === currentPlayer)
        );
    }

    // Update and display scores
    function updateScore() {
        if (currentPlayer === 'X') {
            scoreX++;
            playerXScore.textContent = `Player X: ${scoreX}`;
        } else {
            scoreO++;
            playerOScore.textContent = `Player O: ${scoreO}`;
        }
    }

    // Reset the game board
    function resetBoard() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        board.querySelectorAll('.cell').forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('X', 'O');
        });
        currentPlayer = 'X';
        gameActive = true;
    }

    // End the game and display the winner
    function endGame() {
        if (scoreX > scoreO) {
            alert('Player X wins the game!');
        } else if (scoreO > scoreX) {
            alert('Player O wins the game!');
        } else {
            alert('It\'s a tie! No overall winner.');
        }
    }

    // Reset the entire game
    function resetGame() {
        round = 1;
        scoreX = 0;
        scoreO = 0;
        playerXScore.textContent = 'Player X: 0';
        playerOScore.textContent = 'Player O: 0';
    }

    // Add event listener for the reset button
    resetButton.addEventListener('click', () => {
        scoreX = 0;
        scoreO = 0;
        playerXScore.textContent = 'Player X: 0';
        playerOScore.textContent = 'Player O: 0';
        round = 1;
        resetBoard();
    });
});
