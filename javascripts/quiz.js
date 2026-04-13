document$.subscribe(function() {
  document.querySelectorAll('.quiz-question').forEach(function(question) {
    var options = question.querySelectorAll('.quiz-option');
    var feedback = question.querySelector('.quiz-feedback');

    options.forEach(function(option) {
      option.addEventListener('click', function() {
        options.forEach(function(o) { o.classList.remove('selected'); });
        option.classList.add('selected');

        if (option.dataset.correct === 'true') {
          feedback.textContent = 'Correct!';
          feedback.className = 'quiz-feedback correct';
        } else {
          feedback.textContent = 'Try again!';
          feedback.className = 'quiz-feedback incorrect';
        }
        feedback.style.display = 'block';
      });
    });
  });
});
