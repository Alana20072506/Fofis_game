const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultContainerElement = document.getElementById('result-container');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const totalTimeElement = document.getElementById('total-time');

let shuffledQuestions, currentQuestionIndex;
let score = 0;
let startTime, timerInterval;

const questions = [
    {
        question: 'Qual é a capital da França?',
        answers: [
            { text: 'Paris', correct: true },
            { text: 'Londres', correct: false },
            { text: 'Roma', correct: false },
            { text: 'Berlim', correct: false }
        ]
    },
    {
        question: 'Qual é o maior planeta do sistema solar?',
        answers: [
            { text: 'Júpiter', correct: true },
            { text: 'Saturno', correct: false },
            { text: 'Terra', correct: false },
            { text: 'Marte', correct: false }
        ]
    },
    {
        question: 'Qual é o elemento químico representado pelo símbolo O?',
        answers: [
            { text: 'Oxigênio', correct: true },
            { text: 'Ouro', correct: false },
            { text: 'Ósmio', correct: false },
            { text: 'Oxalato', correct: false }
        ]
    }
];

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    resultContainerElement.classList.add('hide');
    score = 0;
    startTime = new Date();
    startTimer();
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (correct) {
        score++;
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        endGame();
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function endGame() {
    questionContainerElement.classList.add('hide');
    resultContainerElement.classList.remove('hide');
    scoreElement.innerText = score;
    stopTimer();
}

function startTimer() {
    timerInterval = setInterval(() => {
        const now = new Date();
        const elapsedTime = new Date(now - startTime);
        const minutes = elapsedTime.getUTCMinutes().toString().padStart(2, '0');
        const seconds = elapsedTime.getUTCSeconds().toString().padStart(2, '0');
        timeElement.innerText = `${minutes}:${seconds}`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    const now = new Date();
    const elapsedTime = new Date(now - startTime);
    const minutes = elapsedTime.getUTCMinutes().toString().padStart(2, '0');
    const seconds = elapsedTime.getUTCSeconds().toString().padStart(2, '0');
    totalTimeElement.innerText = `${minutes}:${seconds}`;
}

