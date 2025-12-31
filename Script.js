// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

// QUESTIONS
const quizQuestions = [
  {
    question: "Which data structure is used internally by JavaScript to manage function calls?",
    answers: [
      { text: "Queue", correct: false },
      { text: "Stack", correct: true },
      { text: "Heap", correct: false },
      { text: "Linked List", correct: false },
    ],
  },
  {
    question: "What does the 'this' keyword refer to in a regular JavaScript function?",
    answers: [
      { text: "The global object always", correct: false },
      { text: "The object that calls the function", correct: true },
      { text: "The function itself", correct: false },
      { text: "Undefined", correct: false },
    ],
  },
  {
    question: "Which sorting algorithm has the best average-case time complexity?",
    answers: [
      { text: "Bubble Sort", correct: false },
      { text: "Insertion Sort", correct: false },
      { text: "Merge Sort", correct: true },
      { text: "Selection Sort", correct: false },
    ],
  },
  {
    question: "What is the output of Boolean([]) in JavaScript?",
    answers: [
      { text: "false", correct: false },
      { text: "true", correct: true },
      { text: "undefined", correct: false },
      { text: "null", correct: false },
    ],
  },
  {
    question: "Which protocol is used to securely transfer web pages?",
    answers: [
      { text: "HTTP", correct: false },
      { text: "FTP", correct: false },
      { text: "HTTPS", correct: true },
      { text: "SMTP", correct: false },
    ],
  },
  {
    question: "What does SQL stand for?",
    answers: [
      { text: "Structured Query Language", correct: true },
      { text: "Sequential Query Language", correct: false },
      { text: "Standard Query Logic", correct: false },
      { text: "Structured Question Language", correct: false },
    ],
  },
  {
    question: "Which planet has the strongest gravity in our solar system?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Jupiter", correct: true },
      { text: "Saturn", correct: false },
      { text: "Neptune", correct: false },
    ],
  },
  {
    question: "Which keyword prevents a variable from being reassigned in JavaScript?",
    answers: [
      { text: "var", correct: false },
      { text: "let", correct: false },
      { text: "const", correct: true },
      { text: "static", correct: false },
    ],
  },
  {
    question: "What is the time complexity of binary search?",
    answers: [
      { text: "O(n)", correct: false },
      { text: "O(log n)", correct: true },
      { text: "O(n log n)", correct: false },
      { text: "O(1)", correct: false },
    ],
  },
  {
    question: "Which gas is most abundant in Earth’s atmosphere?",
    answers: [
      { text: "Oxygen", correct: false },
      { text: "Carbon Dioxide", correct: false },
      { text: "Nitrogen", correct: true },
      { text: "Hydrogen", correct: false },
    ],
  },
  {
    question: "What does DOM stand for?",
    answers: [
      { text: "Document Object Model", correct: true },
      { text: "Data Object Model", correct: false },
      { text: "Digital Ordinance Model", correct: false },
      { text: "Document Order Map", correct: false },
    ],
  },
  {
    question: "Which programming paradigm does JavaScript primarily support?",
    answers: [
      { text: "Procedural only", correct: false },
      { text: "Object-oriented and functional", correct: true },
      { text: "Assembly-based", correct: false },
      { text: "Logic-based", correct: false },
    ],
  },
  {
    question: "Which layer of the OSI model handles encryption?",
    answers: [
      { text: "Session Layer", correct: false },
      { text: "Presentation Layer", correct: true },
      { text: "Transport Layer", correct: false },
      { text: "Network Layer", correct: false },
    ],
  },
  {
    question: "What is the smallest unit of data in a computer?",
    answers: [
      { text: "Byte", correct: false },
      { text: "Bit", correct: true },
      { text: "Nibble", correct: false },
      { text: "Word", correct: false },
    ],
  },
  {
    question: "Which HTML tag is used to embed JavaScript?",
    answers: [
      { text: "<js>", correct: false },
      { text: "<javascript>", correct: false },
      { text: "<script>", correct: true },
      { text: "<code>", correct: false },
    ],
  },
  {
    question: "Which country developed the first programmable computer?",
    answers: [
      { text: "USA", correct: false },
      { text: "Germany", correct: true },
      { text: "UK", correct: false },
      { text: "Japan", correct: false },
    ],
  },
  {
    question: "What is the default HTTP request method used by forms?",
    answers: [
      { text: "POST", correct: false },
      { text: "PUT", correct: false },
      { text: "GET", correct: true },
      { text: "DELETE", correct: false },
    ],
  },
  {
    question: "Which algorithm is used for shortest path in graphs?",
    answers: [
      { text: "DFS", correct: false },
      { text: "BFS", correct: false },
      { text: "Dijkstra’s Algorithm", correct: true },
      { text: "Kruskal’s Algorithm", correct: false },
    ],
  },
  {
    question: "Which number system uses base 16?",
    answers: [
      { text: "Binary", correct: false },
      { text: "Octal", correct: false },
      { text: "Decimal", correct: false },
      { text: "Hexadecimal", correct: true },
    ],
  },
  {
    question: "Which company developed JavaScript?",
    answers: [
      { text: "Microsoft", correct: false },
      { text: "Sun Microsystems", correct: false },
      { text: "Netscape", correct: true },
      { text: "Oracle", correct: false },
    ],
  },
];


let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;


totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;


startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);


function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;
  progressBar.style.width =
    (currentQuestionIndex / quizQuestions.length) * 100 + "%";

  questionText.textContent = currentQuestion.question;
  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");
    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answersContainer.appendChild(button);
  });
}

function selectAnswer(e) {
  if (answersDisabled) return;
  answersDisabled = true;

  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  Array.from(answersContainer.children).forEach((btn) => {
    if (btn.dataset.correct === "true") btn.classList.add("correct");
    else if (btn === selectedButton) btn.classList.add("incorrect");
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) showQuestion();
    else showResults();
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percent = (score / quizQuestions.length) * 100;

  if (percent === 100) resultMessage.textContent = "Perfect! You're a genius!";
  else if (percent >= 80) resultMessage.textContent = "Great job!";
  else if (percent >= 60) resultMessage.textContent = "Good effort!";
  else if (percent >= 40) resultMessage.textContent = "Not bad!";
  else resultMessage.textContent = "Keep practicing!";
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  startQuiz();
}
