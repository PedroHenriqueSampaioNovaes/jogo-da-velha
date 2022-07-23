class JogoDaVelha {
  constructor(
    board,
    cells,
    winningMessage,
    winningMessageTextElement,
    restartButton,
    wrapperNamePlayer,
    labelNickname,
    inputName,
    btnReady,
  ) {
    this.board = document.querySelector(board);
    this.cellElements = document.querySelectorAll(cells);
    this.winningMessage = document.querySelector(winningMessage);
    this.winningMessageTextElement = document.querySelector(
      winningMessageTextElement,
    );
    this.restartButton = document.querySelector(restartButton);
    this.wrapperNamePlayer = document.querySelector(wrapperNamePlayer);
    this.labelNickname = document.querySelector(labelNickname);
    this.inputName = document.querySelector(inputName);
    this.btnReady = document.querySelector(btnReady);
    this.currentPlayer = 0;
    this.winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    this.classGameOver = 'game-over';

    // Bind callback functions
    this.verifyCellClicked = this.verifyCellClicked.bind(this);
    this.startGame = this.startGame.bind(this);
    this.getNames = this.getNames.bind(this);
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
      this.winningMessageTextElement.innerText = `${
        this.players[this.numJogada].name
      } Venceu!`;
    } else {
      this.winningMessage.classList.add(this.classGameOver);
      this.winningMessageTextElement.innerText = 'Empate!';
    }
  }

  createPlayers() {
    this.players = [
      { name: '', icon: 'x' },
      { name: '', icon: 'circle' },
    ];
  }

  getNames() {
    if (this.inputName.value) {
      for (const player of this.players) {
        if (player.name === '') {
          player.name = this.inputName.value;
          break;
        }
      }
      if (this.players[0].name && !this.players[1].name) {
        this.labelNickname.innerText = 'Insira o nome do Player 2';
        this.inputName.value = '';
      } else {
        this.wrapperNamePlayer.remove();
      }
      this.inputName.nextElementSibling.classList.remove('active');
    } else {
      this.inputName.nextElementSibling.classList.add('active');
    }
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
        return this.cellElements[index].classList.contains(
          this.players[this.numJogada].icon,
        );
      });
    });
  }

  checkForDraw() {
    return [...this.cellElements].every((cell) => {
      return cell.classList.contains('x') || cell.classList.contains('circle');
    });
  }

  swapTurn() {
    this.numJogada = (this.numJogada + 1) % 2;
  }

  verifyCellClicked({ currentTarget }) {
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

  addClickEvent() {
    this.restartButton.addEventListener('click', this.startGame);
    this.btnReady.addEventListener('click', this.getNames);
  }

  init() {
    this.startGame();
    this.createPlayers();
    this.addClickEvent();
    return this;
  }
}
const jogoDaVelha = new JogoDaVelha(
  '[data-board]',
  '[data-cell]',
  '[data-winning-message]',
  '[data-winning-message-text]',
  '[data-restart-button]',
  '[data-wrapper-name-player]',
  '[data-nickname]',
  '[data-input-name]',
  '[data-btn-ready]',
);
jogoDaVelha.init();
