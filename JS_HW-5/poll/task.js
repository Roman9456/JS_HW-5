fetch('https://students.netoservices.ru/nestjs-backend/poll')
  .then(response => response.json())
  .then(data => {
    const pollTitle = document.getElementById('poll__title');
    const pollAnswers = document.getElementById('poll__answers');

    pollTitle.textContent = data.data.title;


    data.data.answers.forEach((answer, index) => {
      const answerButton = document.createElement('button');
      answerButton.classList.add('poll__answer');
      answerButton.textContent = answer;

      answerButton.addEventListener('click', () => {
        alert('Спасибо, ваш голос засчитан!');

        const voteData = `vote=${data.id}&answer=${index}`;
        fetch('https://students.netoservices.ru/nestjs-backend/poll', {
          method: 'POST',
          headers: {
            'Content-type': 'application/x-www-form-urlencoded'
          },
          body: voteData
        })
          .then(response => response.json())
          .then(resultData => {

            const resultsContainer = document.createElement('div');
            resultsContainer.classList.add('results-container');

            resultData.stat.forEach(result => {
              const resultItem = document.createElement('div');
              resultItem.textContent = `${result.answer}: ${result.votes}`;
              resultsContainer.appendChild(resultItem);
            });

            pollAnswers.innerHTML = '';
            pollAnswers.appendChild(resultsContainer);
          })
          .catch(error => console.error(error));
      });

      pollAnswers.appendChild(answerButton);
    });
  })
  .catch(error => console.error(error));