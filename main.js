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

const hideAll = () => {
    homeBody.classList.add('hide');
    questionBody.classList.add('hide');
    resultsBody.classList.add('hide');
};

const showHomeBody = () => {
    hideAll();
    homeBody.classList.remove('hide');
};

const showQuestionBody = () => {
    hideAll();
    questionBody.classList.remove('hide');
};

const showResultsBody = () => {
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

const startGame = () => {
    showQuestionBody();
    currentQuestionIndex = 0;
    setNextQuestion();
};

function showQuestion(question) {
    const txtPosition = document.getElementById('currentPosition');
    txtPosition.innerText = `Question ${currentQuestionIndex+1}/10`; // NO IMPRIME


    questionTxt.innerText = question.question;

    const allAnswers = [...question.incorrect_answers, question.correct_answer];
    allAnswers.sort(() => Math.random() - 0.5); // Baraja las respuestas

    allAnswers.forEach((answer) => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.classList.add('btn-answer'); // CLASE PARA ESTILIZAR EN CSS
        button.addEventListener('click', () => {
            // Lógica para manejar la respuesta del usuario
            if (answer === question.correct_answer) {
                // Respuesta correcta
                // Realiza la lógica de puntaje u otros
            } else {
                // Respuesta incorrecta
                // Realiza la lógica de puntaje u otros
            }
        });
        answerBtns.appendChild(button);
    });
};

function resetState() {
    answerBtns.innerHTML=""
};

function setNextQuestion() {
    resetState();
    showQuestion(questionsAll[currentQuestionIndex]);
    currentQuestionIndex++
};

btnStartGame.addEventListener('click', startGame);
btnNextQuestion.addEventListener('click', setNextQuestion);

