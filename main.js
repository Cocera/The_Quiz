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
    console.log('Llega a getQuestions') // Probar si se acciona
    axios.get(linkAPI)
    .then(question => {
        questionsAll = question.data.results;
        console.log(questionsAll);  // Probar si se acciona
    })
    .catch(err => console.error(err,'ERROR'));
}



// ---------- Start game

let currentQuestionIndex;
let arrUserAnswers = [];
let correctAnswers = 0;


function showQuestion(question) {
    console.log('Llega a showQuestion')
    const txtPosition = document.getElementById('currentPosition');
    txtPosition.innerText = `Question ${currentQuestionIndex+1}/10`;

    questionTxt.innerHTML = question.question; // con .innerText saca simbolos raros

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
    console.log('Llega a setNextQuestion')
    answerBtns.innerHTML="";
    if (currentQuestionIndex==10) {
        currentQuestionIndex = 0;
        showResultsBody();
    } else {
        showQuestionBody();
        showQuestion(questionsAll[currentQuestionIndex]);
    }
};







function startGame() {
    const inputUserName = document.getElementById('input-user-name').value;

    if (inputUserName == "") {
        console.error('Has de indicar un nombre') // sustituir por alerta
    } else if (inputUserName != "") {
        // arrUserAnswers.push({user:inputUserName, answers:[]}) // Se puede crear un constructor para guardar la info?
        showCategoriesBody();
    }

    const btnCategoryMythology = document.getElementById('category-mythology');
    const btnCategoryArt = document.getElementById('category-art');
    const btnCategoryMusic = document.getElementById('category-music');

    btnCategoryMythology.addEventListener('click', function() {
        console.log('Has elegido Mitologia'); 
        getQuestions('https://opentdb.com/api.php?amount=10&category=20&difficulty=medium');
        currentQuestionIndex = 0;
        setNextQuestion();
    })

    btnCategoryArt.addEventListener('click', function() {
        console.log('Has elegido Arte') // Probar si se acciona
        getQuestions('https://opentdb.com/api.php?amount=10&category=25&difficulty=medium');
        currentQuestionIndex = 0;
        setNextQuestion();
    })

    btnCategoryMusic.addEventListener('click', function() {
        console.log('Has elegido Musica') // Probar si se acciona
        getQuestions('https://opentdb.com/api.php?amount=10&category=12&difficulty=medium');
        currentQuestionIndex = 0;
        setNextQuestion();
    })
};






function userAnswersUpload() {
    localStorage.setItem("userAnswers", JSON.stringify(arrUserAnswers));
}

btnStartGame.addEventListener('click', startGame);

