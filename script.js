const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Lisbon", correct: false }
        ]
    },
    {
        question: "Who is the CEO of Tesla?",
        answers: [
            { text: "Jeff Bezos", correct: false },
            { text: "Elon Musk", correct: true },
            { text: "Bill Gates", correct: false },
            { text: "Tony Stark", correct: false }
        ]
    },
    {
        question: "What is the largest planet in our solar system?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Jupiter", correct: true },
            { text: "Saturn", correct: false },
            { text: "Mars", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question');
const answerButtons = Array.from(document.getElementsByClassName('quiz-option'));
const nextButton = document.getElementById('next-btn');

function startQuiz() {
    const username = document.getElementById('username').value;
    if (username.trim() === '') {
        alert('Please enter a valid username.');
        return;
    }

    document.getElementById('username-container').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    document.getElementById('user-name-display').textContent = username;

    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add('hide');
    nextButton.innerText = 'Next';
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    answerButtons.forEach((button, index) => {
        button.innerText = question.answers[index].text;
        button.classList.remove('correct', 'wrong', 'selected');
        button.disabled = false;
    });
}

function selectAnswer(index) {
    const selectedAnswer = questions[currentQuestionIndex].answers[index];
    answerButtons.forEach((button, idx) => {
        button.disabled = true;
        if (selectedAnswer.correct) {
            if (idx === index) {
                button.classList.add('correct');
            }
        } else {
            if (idx === index) {
                button.classList.add('wrong');
            }
        }
    });
    nextButton.classList.remove('hide');
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
        nextButton.classList.add('hide');
    } else {
        showResults();
    }
}

function showResults() {
    questionElement.innerText = `You scored ${score} out of ${questions.length}!`;
    answerButtons.forEach(button => button.classList.add('hide'));
    nextButton.innerText = 'Restart';
    nextButton.classList.remove('hide');
    nextButton.onclick = startQuiz;
}

startQuiz();
