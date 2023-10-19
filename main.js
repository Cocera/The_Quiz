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
        questionsAll = question.data.results;
    })
    .catch(err => console.error(err,'ERROR'));
}



// ---------- Start game

let currentQuestionIndex;
let arrUserAnswers = [];
let correctAnswersCounter = 0;


function showQuestion(question) {
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

            if (button.innerText == question.correct_answer) {
                correctAnswersCounter++;
            }

            arrUserAnswers.push(button.innerText);


            currentQuestionIndex++;

            setTimeout(() => {
                setNextQuestion();;
              }, "500");
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
    } else {
        showQuestionBody();
        showQuestion(questionsAll[currentQuestionIndex]);
    }
};





function changeBackgroundImg(srcImg) {
    const img = document.getElementById('backgroundImg');
    img.setAttribute('src', srcImg)
}







function startGame() {
    const valueUserName = document.getElementById('input-user-name').value;

    currentQuestionIndex = 0;
    correctAnswersCounter = 0;

    if (valueUserName == "") {
        console.error('Has de indicar un nombre') // sustituir por alerta
    } else if (valueUserName != "") {
        // arrUserAnswers.push({user:valueUserName, answers:[]}) // Se puede crear un constructor para guardar la info?
        showCategoriesBody();
    }

    const btnCategoryMythology = document.getElementById('category-mythology');
    const btnCategoryArt = document.getElementById('category-art');
    const btnCategoryMusic = document.getElementById('category-music');

    btnCategoryMythology.addEventListener('click', function() {
        getQuestions('https://opentdb.com/api.php?amount=10&category=20&difficulty=medium');
        changeBackgroundImg('https://images.pexels.com/photos/3264735/pexels-photo-3264735.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
        setNextQuestion();
    })

    btnCategoryArt.addEventListener('click', function() {
        getQuestions('https://opentdb.com/api.php?amount=10&category=25&difficulty=medium');
        changeBackgroundImg('https://images.pexels.com/photos/2372982/pexels-photo-2372982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
        setNextQuestion();
    })

    btnCategoryMusic.addEventListener('click', function() {
        getQuestions('https://opentdb.com/api.php?amount=10&category=12&difficulty=medium');
        changeBackgroundImg('https://images.pexels.com/photos/4709822/pexels-photo-4709822.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
        setNextQuestion();
    })
};











function userAnswersUpload() {
    localStorage.setItem("userAnswers", JSON.stringify(arrUserAnswers));
}

btnStartGame.addEventListener('click', startGame);

