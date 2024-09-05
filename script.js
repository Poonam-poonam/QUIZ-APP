// Select DOM elements
const difficultyScreen = document.getElementById('difficulty-screen');
const quizScreen = document.getElementById('quiz-screen');
const questionText = document.getElementById('question-text');
const answerButtons = document.querySelectorAll('.answer-btn');
const resultScreen = document.getElementById('result-screen');
const scoreText = document.getElementById('score');
const restartBtn = document.getElementById('restart-btn');
const timerDisplay = document.getElementById('timer');
const progressBar = document.getElementById('progress');
const difficultyButtons = document.querySelectorAll('.difficulty-btn');

// Quiz data (questions, answers, correct answer categorized by difficulty)
const questions = {
    easy: [
        {
            question: "What is 2 + 2?",
            answers: ["3", "4", "5", "6"],
            correct: 1
        },
        {
            question: "Which planet is known as the Red Planet?",
            answers: ["Earth", "Mars", "Jupiter", "Saturn"],
            correct: 1
        },
        {
            question: "When did India get its Independence?",
            answers: ["1945", "1947", "1950","1948"],
            correct: 1
        }
    ],
    medium: [
        {
            question: "Which language runs in a web browser?",
            answers: ["Java", "C", "Python", "JavaScript"],
            correct: 3
        },
        {
            question: "Who developed the theory of relativity?",
            answers: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Marie Curie"],
            correct: 1
        },
        { 
            question: "Where does the President of the United States live while in office?",
            answers: ["The White House", "The Parliament", "House of Commons", "Washington DC"],
            correct: 0 
        },
    ],
    hard: [
        {
            question: "What is the smallest prime number?",
            answers: ["0", "1", "2", "3"],
            correct: 2
        },
        {
            question: "In what year was the first computer virus created?",
            answers: ["1986", "1975", "1992", "2001"],
            correct: 0
        },
        { 
            question: "Which bird lays the largest egg?",
            answers: ["Owl", "Ostrich", "Kingfisher", "Woodpecker"],
            correct: 1
        }
    ]
};

// Variables to track state
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;
let selectedDifficulty = 'easy';
let filteredQuestions = [];

// Function to select difficulty
difficultyButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        selectedDifficulty = e.target.getAttribute('data-difficulty');
        startQuiz();
    });
});

// Function to start the quiz
function startQuiz() {
    difficultyScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    filteredQuestions = questions[selectedDifficulty];
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 30;
    startTimer();
    showQuestion();
}

// Function to show a question
function showQuestion() {
    resetState();
    const currentQuestion = filteredQuestions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    answerButtons.forEach((button, index) => {
        button.textContent = currentQuestion.answers[index];
        button.onclick = () => selectAnswer(index);
    });
    updateProgressBar();
}

// Function to reset buttons and timer
function resetState() {
    answerButtons.forEach(button => {
        button.classList.remove('correct', 'incorrect');
    });
}

// Function to handle answer selection
function selectAnswer(selectedIndex) {
    const correctIndex = filteredQuestions[currentQuestionIndex].correct;
    if (selectedIndex === correctIndex) {
        answerButtons[selectedIndex].classList.add('correct');
        score++;
    } else {
        answerButtons[selectedIndex].classList.add('incorrect');
        answerButtons[correctIndex].classList.add('correct');
    }
    disableButtons();
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < filteredQuestions.length) {
            showQuestion();
        } else {
            endQuiz();
        }
    }, 1000);
}

// Disable buttons after answering
function disableButtons() {
    answerButtons.forEach(button => {
        button.onclick = null;
    });
}

// Timer functionality
function startTimer() {
    timerDisplay.textContent = `Time: ${timeLeft}`;
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time: ${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}

// Function to update progress bar
function updateProgressBar() {
    const progressWidth = ((currentQuestionIndex + 1) / filteredQuestions.length) * 100;
    progressBar.style.width = `${progressWidth}%`;
}

// Function to end the quiz
function endQuiz() {
    clearInterval(timer);
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    scoreText.textContent = score;
}

// Function to restart the quiz
restartBtn.addEventListener('click', () => {
    resultScreen.classList.add('hidden');
    difficultyScreen.classList.remove('hidden');
});
