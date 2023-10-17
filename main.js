const homeNav = document.getElementById('home-nav');
const questionNav = document.getElementById('question-nav');
const resultsNav = document.getElementById('results-nav');

const homeBody = document.getElementById('home-body');
const questionBody = document.getElementById('question-body');
const resultsBody = document.getElementById('results-body');

const questionTxt = document.getElementById('question');
const btnStartGame = document.getElementById('start-game');
const btnNextQuestion = document.getElementById('next-question');
const answerBtns = document.getElementById('answer-buttons');

// ---------- Set SPA

function hideAll() {
    homeBody.classList.add('hide');
    questionBody.classList.add('hide');
    resultsBody.classList.add('hide');
};

function showHomeBody() {
    hideAll();
    homeBody.classList.remove('hide');
};

function showQuestionBody() {
    hideAll();
    questionBody.classList.remove('hide');
};

function showResultsBody() {
    hideAll();
    resultsBody.classList.remove('hide');
};

homeNav.addEventListener('click', showHomeBody);
questionNav.addEventListener('click', showQuestionBody);
resultsNav.addEventListener('click', showResultsBody);

// ---------- Get API questions

let questionsAll = [];

axios.get('https://opentdb.com/api.php?amount=10&category=20')
    .then(question => questionsAll = question.data.results)
    .catch(err => console.error(err,'ERROR'));

// ---------- Start game

let currentQuestionIndex;

function startGame() {
    showQuestionBody();
    currentQuestionIndex = 0;
    setNextQuestion();
};

function showQuestion(question) {
    const txtPosition = document.getElementById('currentPosition');
    txtPosition.innerText = `Question ${currentQuestionIndex+1}/10`;

    questionTxt.innerText = question.question;

    const allAnswers = [...question.incorrect_answers, question.correct_answer];
    allAnswers.sort(() => Math.random() - 0.5);

    allAnswers.forEach((answer) => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.classList.add('btn-answer');
        button.addEventListener('click', () => {
            currentQuestionIndex++
            if (answer === question.correct_answer) {
                button.classList.add("correct");
                setTimeout(() => {
                    setNextQuestion();
                }, 1000)
            } else {
                button.classList.add("wrong");
                setTimeout(() => {
                    setNextQuestion();
                }, 1000)
            }
        });
        answerBtns.appendChild(button);
    });
};

function setNextQuestion() {
    answerBtns.innerHTML="";
    if (currentQuestionIndex==10) {
        currentQuestionIndex = 0;
        showResultsBody();
    };
    showQuestion(questionsAll[currentQuestionIndex]);
};

btnStartGame.addEventListener('click', startGame);

