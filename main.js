const homeNav = document.getElementById('home-nav');
const resultsNav = document.getElementById('results-nav');

const homeBody = document.getElementById('home-body');
const categoriesBody = document.getElementById('categories-body');
const questionBody = document.getElementById('question-body');
const resultsBody = document.getElementById('results-body');

const questionTxt = document.getElementById('question');
const btnStartGame = document.getElementById('start-game');
const answerBtns = document.getElementById('answer-buttons');



// ---------- Set SPA

function hideAll() {
    homeBody.classList.add('hide');
    questionBody.classList.add('hide');
    resultsBody.classList.add('hide');
    categoriesBody.classList.add('hide');
};

function showHomeBody() {
    hideAll();
    homeBody.classList.remove('hide');
};

function showCategoriesBody() {
    hideAll();
    categoriesBody.classList.remove('hide');
}

function showQuestionBody() {
    hideAll();
    questionBody.classList.remove('hide');
};

function showResultsBody() {
    hideAll();
    resultsBody.classList.remove('hide');
};

homeNav.addEventListener('click', showHomeBody);
resultsNav.addEventListener('click', showResultsBody);



// ---------- Get API questions

let questionsAll = [];

function getQuestions(linkAPI) {
    axios.get(linkAPI)
    .then(question => {
        questionsAll = question.data.results
    })
    .catch(err => console.error(err,'ERROR'));
}



// ---------- Start game

let currentQuestionIndex;
arrUserAnswers = [];

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
            arrUserAnswers.push(button.innerText);
            currentQuestionIndex++;
            setNextQuestion();
        });
        answerBtns.appendChild(button);
        userAnswersUpload();
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







function startGame() {
    const inputUserName = document.getElementById('input-user-name').value;
    if (inputUserName == "") {
        console.error('Has de indicar un nombre') // sustituir por alerta
    } else if (inputUserName != "") {
        arrUserAnswers.push({user:inputUserName, answers:[]})
        showCategoriesBody();
    }
    const btnCategoryMythology = document.getElementById('category-mythology');
    const btnCategoryArt = document.getElementById('category-art');
    const btnCategoryMusic = document.getElementById('category-music');

    btnCategoryMythology.addEventListener('click', function() {
        getQuestions('https://opentdb.com/api.php?amount=10&category=20&difficulty=medium');
        currentQuestionIndex = 0;
        setNextQuestion();
    })
    btnCategoryArt.addEventListener('click', function() {
        getQuestions('https://opentdb.com/api.php?amount=10&category=25&difficulty=medium');
        currentQuestionIndex = 0;
        setNextQuestion();
    })
    btnCategoryMusic.addEventListener('click', function() {
        getQuestions('https://opentdb.com/api.php?amount=10&category=12&difficulty=medium');
        currentQuestionIndex = 0;
        setNextQuestion();
    })
};






function userAnswersUpload() {
    localStorage.setItem("userAnswers", JSON.stringify(arrUserAnswers));
}

btnStartGame.addEventListener('click', startGame);

