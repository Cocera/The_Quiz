const homeNav = document.getElementById('home-nav');
const questionNav = document.getElementById('question-nav');
const resultsNav = document.getElementById('results-nav');

const homeBody = document.getElementById('home-body');
const questionBody = document.getElementById('question-body');
const resultsBody = document.getElementById('results-body');

const questionTxt = document.getElementById('question');
const bttnStartGame = document.getElementById('start-game')
const bttnNextQuestion = document.getElementById('next-question')

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
            console.log(questionsAll);
            // question.data.results.forEach(object => {
            //     questionsAll.push(object.question);
            //     answersAll.push(object.correct_answer, object.incorrect_answers)
            // })
    })
    .catch(err => console.error(err,'ERROR'));

// ---------- Start game

const startGame = () => {

};

const showQuestion = () => {
    questionTxt.innerHTML = questionsAll.question;
};

bttnStartGame.addEventListener('click', startGame);