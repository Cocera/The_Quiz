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
    .then(question => {
        questionsAll = question.data.results;
        console.log(questionsAll); // BORRAR MAS TARDE
    })
    .catch(err => console.error(err,'ERROR'));

// ---------- Start game

let currentQuestionIndex;

const startGame = () => {
    showQuestionBody();
    currentQuestionIndex = 0;
    // setNextQuestion();
    showQuestion();
};

const showQuestion = (question) => {
    const allAnswersArr = [];

    questionsAll.forEach(question => {
        questionTxt.innerText = question.question;

        const button = document.createElement('button');
        button.innerText = question.incorrect_answer;
        let questionAnswers = question.incorrect_answers;
        questionAnswers.push(question.correct_answer);
        allAnswersArr.push(questionAnswers)
        console.log(allAnswersArr); // BORRAR MAS TARDE
    })
}

btnStartGame.addEventListener('click', startGame);

