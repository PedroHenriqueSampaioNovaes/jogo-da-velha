class JogoDaVelha {
  constructor(board, cells, wrapperWinMessage, winMessageText, restartButton) {
    this.board = document.querySelector(board);
    this.cellElements = document.querySelectorAll(cells);
    this.wrapperWinMessage = document.querySelector(wrapperWinMessage);
    this.winMessageText = document.querySelector(winMessageText);
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
    ];
    this.classGameOver = 'game-over';
  }

  startGame() {
    this.wrapperWinMessage.classList.remove(this.classGameOver);
    for (const cell of this.cellElements) {
      cell.classList.remove('circle');
      cell.classList.remove('x');
      cell.addEventListener('click', this.verifyCellClicked, { once: true });
    }
    this.board.classList.remove('circle');
    this.board.classList.add('x');
    this.numJogada = 0;
  }

  createPlayers() {
    this.players = [
      { name: '', icon: 'x' },
      { name: '', icon: 'circle' },
    ];
  }

  endGame() {
    if (this.win) {
      this.wrapperWinMessage.classList.add(this.classGameOver);
      this.winMessageText.innerText = `${
        this.players[this.numJogada].name
      } Venceu!`;
    } else {
      this.wrapperWinMessage.classList.add(this.classGameOver);
      this.winMessageText.innerText = 'Empate!';
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

  bindEvents() {
    this.verifyCellClicked = this.verifyCellClicked.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  addClickEvent() {
    this.restartButton.addEventListener('click', this.startGame);
  }

  init() {
    this.bindEvents();
    this.addClickEvent();
    this.startGame();
    this.createPlayers();
    return this;
  }
}

class Login extends JogoDaVelha {
  constructor(
    wrapperName,
    form,
    inputName,
    inputSubmit,
    labelNickname,
    board,
    cells,
    wrapperWinMessage,
    winMessageText,
    restartButton,
  ) {
    super(board, cells, wrapperWinMessage, winMessageText, restartButton);

    this.wrapperName = document.querySelector(wrapperName);
    this.forms = document.querySelector(form);
    this.inputName = document.querySelector(inputName);
    this.inputSubmit = document.querySelector(inputSubmit);
    this.labelNickname = document.querySelector(labelNickname);

    this.bindLoginEvents();
    this.addLoginEvents();
  }

  validateInput() {
    if (this.inputName.value.length > 1) {
      this.inputSubmit.removeAttribute('disabled');
      this.inputSubmit.classList.add('active');
    } else {
      this.inputSubmit.setAttribute('disabled', '');
      this.inputSubmit.classList.remove('active');
    }
  }

  getNames() {
    if (this.players[0].name === '') {
      this.players[0].name = this.inputName.value;
      this.labelNickname.innerText = 'Insira o nome do Player 2';
      this.inputName.value = '';
    } else {
      this.players[1].name = this.inputName.value;
      this.wrapperName.remove();
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    this.getNames();
    this.validateInput();
  }

  addLoginEvents() {
    this.inputName.addEventListener('input', this.validateInput);
    this.forms.addEventListener('submit', this.handleSubmit);
  }

  bindLoginEvents() {
    this.validateInput = this.validateInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
}

const jogoDaVelha = new Login(
  '[data-wrapper-name]',
  '[data-form-nickname]',
  '[data-input-name]',
  '[data-input-ready]',
  '[data-label-nickname]',
  '[data-board]',
  '[data-cell]',
  '[data-wrapper-winning-message]',
  '[data-winning-message-text]',
  '[data-restart-button]',
);
jogoDaVelha.init();
