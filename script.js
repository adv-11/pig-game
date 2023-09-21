'use strict';

const score0 = document.getElementById('score--0');

const score1 = document.getElementById('score--1');

const player0 = document.querySelector('.player--0');

const player1 = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');

const btnRoll = document.querySelector('.btn--roll');

const btnHold = document.querySelector('.btn--hold');

const current0 = document.getElementById('current--0');

const current1 = document.getElementById('current--1');

score0.textContent = 0;
score1.textContent = 0;
let playing = true;
let currentScore = 0;
let activePlayer = 0;

const totalScore = [0, 0];

btnRoll.addEventListener('click', function () {
  if (playing) {
    let dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `dice-${dice}.png`;

    if (dice == 1) {
      //switch to next player
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      currentScore = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;

      player0.classList.toggle('player--active');
      player1.classList.toggle('player--active');
    }

    //if number is not 1
    else {
      //add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    totalScore[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      totalScore[activePlayer];

    //finish game (score >=100)
    if (totalScore[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      playing = false;

      document.getElementById(`name--${activePlayer}`).textContent = `Player ${
        activePlayer + 1
      } Wins`;
    } else {
      //switch to next player
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      currentScore = 0;
      activePlayer = activePlayer === 0 ? 1 : 0;

      player0.classList.toggle('player--active');
      player1.classList.toggle('player--active');
    }
  }
});

btnNew.addEventListener('click', function () {
  score0.textContent = 0;
  score1.textContent = 0;
  playing = true;
  currentScore = 0;

  totalScore[0] = 0;
  totalScore[1] = 0;

  document.getElementById(`name--${activePlayer}`).textContent = `Player ${
    activePlayer + 1
  } `;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');

  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
});

const modal = document.querySelector('.modal');

const overlay = document.querySelector('.overlay');

const btnCloseModal = document.querySelector('.close-modal');

const btnsOpenModal = document.querySelectorAll('.btn--rule');

for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener('click', function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
  });
}

btnCloseModal.addEventListener('click', function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
});

document.addEventListener('keydown', function (e) {
  if (e.key == 'Escape' && !modal.classList.contains('hidden')) {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
  }
});
