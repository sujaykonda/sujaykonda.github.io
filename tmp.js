const initGame = () => {
      const questions = [
        {
          prompt: 'Why do “risk-free” or “no sweat” bets often lead to higher losses?',
          choices: [
            'They refund in cash, so players end up with more money.',
            'They use bonus credits that require more wagers, keeping people betting.',
            'They block deposits for 48 hours after you use them.',
            'They improve your odds, so the house loses money.'
          ],
          answer: 1,
          detail: 'Bonus credits lock you into more bets. After early wins, people start using real cash, which is where losses stack up.'
        },
        {
          prompt: 'What percent of Americans bet on sports in the past year?',
          choices: ['5%', '10%', '22%', '43%'],
          answer: 2,
          detail: '22% of Americans bet on sports last year—normalization makes the habit feel routine.'
        },
        {
          prompt: 'How many U.S. states (plus D.C.) currently allow legal sports betting?',
          choices: ['15 states', '27 states', '39 states + D.C.', 'All 50 states'],
          answer: 2,
          detail: 'It’s legal in 39 states plus D.C., so most students are only a few taps away from a betting app.'
        },
        {
          prompt: 'Which app design choice makes it hardest to quit?',
          choices: [
            'Slow payouts and long lines',
            'Instant deposits, nonstop notifications, and “nearly won” animations',
            'Daily time locks that force breaks',
            'Hidden bet history that shows only wins'
          ],
          answer: 1,
          detail: 'Instant deposits and flashing, “almost won” animations keep people chasing losses instead of pausing.'
        },
        {
          prompt: 'Who is already betting before college starts?',
          choices: [
            'Almost no one under 21',
            'Only professional athletes',
            'People over 40',
            'More than 13% of adolescents have already wagered on sports teams'
          ],
          answer: 3,
          detail: 'Over 13% of adolescents have already placed sports bets, so many students arrive on campus primed to gamble.'
        },
        {
          prompt: 'What share of U.S. adults surveyed see sports betting as bad for society?',
          choices: ['12%', '25%', '43%', '70%'],
          answer: 2,
          detail: '43% already view sports betting as harmful, showing public concern even as legalization expands.'
        },
        {
          prompt: 'Why is calling bets “investments” misleading?',
          choices: [
            'Because sportsbooks donate all profits to schools',
            'Because odds are stacked against players, so long-term profit is unlikely',
            'Because bets are insured by banks',
            'Because all winnings are guaranteed after three wagers'
          ],
          answer: 1,
          detail: 'Sportsbooks set odds so the house wins over time. Labeling bets as “investments” hides the built-in losses.'
        }
      ];

      const questionEl = document.getElementById('game-question');
      const choicesEl = document.getElementById('choices');
      const feedbackEl = document.getElementById('feedback');
      const nextBtn = document.getElementById('next');
      const restartBtn = document.getElementById('restart');
      const counterEl = document.getElementById('question-counter');
      const scoreEl = document.getElementById('score-display');
      const progressBar = document.getElementById('progress-bar');

      if (!questionEl || !choicesEl || !nextBtn || !restartBtn || !counterEl || !scoreEl || !progressBar) {
        return;
      }

      let currentIndex = 0;
      let score = 0;
      let answered = false;
      let finished = false;

      function renderQuestion() {
        const total = questions.length;
        const current = questions[currentIndex];
        answered = false;
        finished = false;

        counterEl.textContent = `Question ${currentIndex + 1}/${total}`;
        scoreEl.textContent = `Score: ${score}`;
        progressBar.style.width = `${Math.round((currentIndex) / total * 100)}%`;

        questionEl.textContent = current.prompt;
        feedbackEl.textContent = '';
        choicesEl.innerHTML = '';
        nextBtn.textContent = 'Next';
        nextBtn.disabled = true;

        current.choices.forEach((choice, idx) => {
          const btn = document.createElement('button');
          btn.className = 'choice';
          btn.type = 'button';
          btn.textContent = choice;
          btn.addEventListener('click', () => handleChoice(idx));
          choicesEl.appendChild(btn);
        });
      }

      function handleChoice(selectedIndex) {
        if (answered || finished) return;
        answered = true;

        const current = questions[currentIndex];
        const buttons = Array.from(choicesEl.querySelectorAll('.choice'));
        const correctIndex = current.answer;

        buttons.forEach((btn, idx) => {
          btn.disabled = true;
          if (idx === correctIndex) {
            btn.classList.add('choice--correct');
          }
          if (idx === selectedIndex && selectedIndex !== correctIndex) {
            btn.classList.add('choice--incorrect');
          }
        });

        if (selectedIndex === correctIndex) {
          score += 1;
          feedbackEl.textContent = 'Correct! ' + current.detail;
        } else {
          feedbackEl.textContent = 'Not quite. ' + current.detail;
        }

        scoreEl.textContent = `Score: ${score}`;
        nextBtn.textContent = currentIndex === questions.length - 1 ? 'See results' : 'Next question';
        nextBtn.disabled = false;
      }

      function showResults() {
        finished = true;
        answered = true;
        progressBar.style.width = '100%';
        questionEl.textContent = 'You finished the game!';

        const total = questions.length;
        const percent = Math.round((score / total) * 100);
        choicesEl.innerHTML = '';

        const summary = document.createElement('div');
        summary.className = 'result';
        summary.innerHTML = `<p>You scored <strong>${score}/${total}</strong> (${percent}%). Share this game with a friend and see if they can beat your score.</p>`;

        choicesEl.appendChild(summary);
        feedbackEl.textContent = 'Replay to reinforce the warning signs—or head to Solutions for concrete actions.';

        nextBtn.textContent = 'Play again';
        nextBtn.disabled = false;
      }

      function nextQuestion() {
        if (finished) {
          resetGame();
          return;
        }
        if (!answered) return;

        currentIndex += 1;
        if (currentIndex >= questions.length) {
          showResults();
          return;
        }
        renderQuestion();
      }

      function resetGame() {
        currentIndex = 0;
        score = 0;
        answered = false;
        finished = false;
        renderQuestion();
      }

      nextBtn.addEventListener('click', nextQuestion);
      restartBtn.addEventListener('click', resetGame);

      renderQuestion();
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initGame);
    } else {
      initGame();
    }