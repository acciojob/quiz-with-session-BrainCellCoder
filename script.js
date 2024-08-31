// Quiz Questions
const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: 2
  },
  {
    question: "Which language is used for web development?",
    options: ["Python", "JavaScript", "C++", "Java"],
    answer: 1
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: 1
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: 2
  },
  {
    question: "Which ocean is the largest?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    answer: 3
  }
];

// Load quiz progress
function loadQuizProgress() {
  const savedProgress = sessionStorage.getItem('progress');
  return savedProgress ? JSON.parse(savedProgress) : {};
}

// Save quiz progress
function saveQuizProgress(progress) {
  sessionStorage.setItem('progress', JSON.stringify(progress));
}

// Load quiz
function loadQuiz() {
  const quizContainer = document.getElementById('questions');
  const progress = loadQuizProgress();
  
  questions.forEach((q, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');

    const questionText = document.createElement('p');
    questionText.innerText = `${index + 1}. ${q.question}`;
    questionDiv.appendChild(questionText);

    q.options.forEach((option, i) => {
      const optionLabel = document.createElement('label');
      const optionInput = document.createElement('input');
      optionInput.type = 'radio';
      optionInput.name = `question${index}`;
      optionInput.value = i;

      // Restore saved progress
      if (progress[`question${index}`] === i) {
        optionInput.checked = true;
      }

      optionInput.addEventListener('change', () => {
        progress[`question${index}`] = i;
        saveQuizProgress(progress);
      });

      optionLabel.appendChild(optionInput);
      optionLabel.appendChild(document.createTextNode(option));
      questionDiv.appendChild(optionLabel);
      questionDiv.appendChild(document.createElement('br'));
    });

    quizContainer.appendChild(questionDiv);
  });
}

// Calculate score
function calculateScore() {
  const progress = loadQuizProgress();
  let score = 0;

  questions.forEach((q, index) => {
    if (progress[`question${index}`] === q.answer) {
      score++;
    }
  });

  return score;
}

// Display score
function displayScore() {
  const score = calculateScore();
  const scoreDiv = document.getElementById('score');
  scoreDiv.innerText = `Your score is ${score} out of 5.`;
  localStorage.setItem('score', score);
}

// Submit quiz
document.getElementById('submit').addEventListener('click', () => {
  displayScore();
});

// Initialize the quiz
loadQuiz();
