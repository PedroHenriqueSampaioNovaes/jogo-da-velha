class JogoDaVelha {
  constructor(board, cells, winningMessage, winningMessageTextElement, restartButton, player1, player2) {
    this.namePlayer1 = player1;
    this.namePlayer2 = player2;
    this.board = document.querySelector(board);
    this.cellElements = document.querySelectorAll(cells);
    this.winningMessage = document.querySelector(winningMessage);
    this.winningMessageTextElement = document.querySelector(winningMessageTextElement);
    this.restartButton = document.querySelector(restartButton);
    this.winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    this.classGameOver = 'game-over';

    // Bind callback functions
    this.verifyCellClicked = this.verifyCellClicked.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  startGame() {
    this.winningMessage.classList.remove(this.classGameOver);
    for (const cell of this.cellElements) {
      cell.classList.remove('circle');
      cell.classList.remove('x');
      cell.addEventListener('click', this.verifyCellClicked, { once: true });
    }
    this.board.classList.remove('circle');
    this.board.classList.add('x');
    this.numJogada = 0;
  }

  endGame() {
    if (this.win) {
      this.winningMessage.classList.add(this.classGameOver);
      this.winningMessageTextElement.innerText = `${this.players[this.numJogada].name} Venceu!`;
    } else {
      this.winningMessage.classList.add(this.classGameOver);
      this.winningMessageTextElement.innerText = 'Empate!';
    }
  }

  createPlayers() {
    this.players = [
      {name: this.namePlayer1, icon: 'x'},
      {name: this.namePlayer2, icon: 'circle'},
    ]
  }

  addIconPlayer(cell) {
    cell.classList.add(this.players[this.numJogada].icon);
  }

  toggleIconBoard() {
    this.board.classList.remove(this.players[this.numJogada].icon);
    this.board.classList.add(this.players[(this.numJogada + 1) % 2].icon);
  }

  checkForVictory() {
    return this.winningCombinations.some((combination) => {
      return combination.every((index) => {
        return this.cellElements[index].classList.contains(this.players[this.numJogada].icon);
      }) 
    });
  }

  checkForDraw() {
    return [...this.cellElements].every((cell) => {
      return cell.classList.contains('x') || cell.classList.contains('circle');
    })
  }

  swapTurn() {
    this.numJogada = (this.numJogada + 1) % 2;
  }

  verifyCellClicked({currentTarget}) {
    this.addIconPlayer(currentTarget);
    this.toggleIconBoard();
    this.win = this.checkForVictory();
    this.draw = this.checkForDraw();
    if (this.win || this.draw) {
      this.endGame();
    } else {
      this.swapTurn();
    }
  }

  addButtonClickEvent() {
    // [...this.cellElements].forEach((cell) => cell.addEventListener('click', this.verifyCellClicked, { once: true }));
    this.restartButton.addEventListener('click', this.startGame);
  }

  init() {
    this.startGame();
    this.createPlayers();
    this.addButtonClickEvent();
    return this;
  }
}
const jogoDaVelha = new JogoDaVelha('[data-board]', '[data-cell]', '[data-winning-message]', '[data-winning-message-text]', '[data-restart-button]', 'Pedro', 'Joaquim');
jogoDaVelha.init();
