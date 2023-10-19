const homeNav = document.getElementById('home-nav');
const resultsNav = document.getElementById('results-nav');

const homeBody = document.getElementById('home-body');
const categoriesBody = document.getElementById('categories-body');
const questionBody = document.getElementById('question-body');
const resultsBody = document.getElementById('results-body');

const btnStartGame = document.getElementById('start-game');
const answerBtns = document.getElementById('answer-buttons');



// ---------- Global scope variables

let currentQuestionIndex;
let arrUserAnswers = [];
let correctAnswersCounter = 0;
let questionsAll = [];




// ---------- Set SPA

function hideAll() {
    homeBody.classList.add('hide');
    questionBody.classList.add('hide');
    resultsBody.classList.add('hide');
    categoriesBody.classList.add('hide');
};

function showHomeBody() {
    hideAll();
    changeBackgroundImg("");
    homeBody.classList.remove('hide');
};

function showCategoriesBody() {
    hideAll();
    changeBackgroundImg("");
    categoriesBody.classList.remove('hide');
}

function showQuestionBody() {
    hideAll();
    questionBody.classList.remove('hide');
};

function showResultsBody() {
    hideAll();
    changeBackgroundImg("");
    resultsBody.classList.remove('hide');
};

homeNav.addEventListener('click', showHomeBody);

resultsNav.addEventListener('click', showResultsBody);






// ---------- Specific function actions

function changeBackgroundImg(srcImg) {
    const img = document.getElementById('backgroundImg');
    img.setAttribute('src', srcImg)
};

async function getQuestions(linkAPI) {
    try {
        const response = await axios.get(linkAPI);
        questionsAll = response.data.results;
    } catch (err) {console.error(err,'Ups! Something went wrong :(')};      
};
    
    
async function setCategory(linkApi, linkImg) {
    try {
        await getQuestions(linkApi);
        changeBackgroundImg(linkImg);  
        setNextQuestion();  
    } catch (err) {console.error(err,'Ups! Something went wrong :(')}
};




function printRanking() {
    const tableResults = document.getElementById('tableResults');

    getResults.forEach(user, () => {
        tableResults.innerHTML += `
        <tr>
            <td>${user.user}</td>
            <td>${user.score} /10</td>
        </tr>`
    })

    showResultsBody()
}






// ---------- Start game

function showQuestion(question) {

    const questionTxt = document.getElementById('question');
    const txtPosition = document.getElementById('currentPosition');
    
    txtPosition.innerText = `Question ${currentQuestionIndex+1}/10`;

    questionTxt.innerHTML = question.question;

    const allAnswers = [...question.incorrect_answers, question.correct_answer];
    allAnswers.sort(() => Math.random() - 0.5);

    allAnswers.forEach((answer) => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.classList.add('btn-answer');
        button.addEventListener('click', () => {

            if (button.innerText == question.correct_answer) {
                correctAnswersCounter++; // Mostrar el color si es true o false tu respuesta
            }

            currentQuestionIndex++;

            setTimeout(() => {
                setNextQuestion();;
              }, "500");
        });

        answerBtns.appendChild(button);
    });
};



function setNextQuestion() {
    answerBtns.innerHTML="";
    if (currentQuestionIndex==10) {
        console.log('IF setNextQuestion')
        currentQuestionIndex = 0;
        printRanking()
    } else {
        console.log('ELSE setNextQuestion')
        showQuestionBody();
        showQuestion(questionsAll[currentQuestionIndex]);
    }
};


function startGame() {
    const valueUserName = document.getElementById('input-user-name');

    currentQuestionIndex = 0;
    correctAnswersCounter = 0;

    if (valueUserName.value == "") {
        {console.error(err,'Ups! Something went wrong :(')}
    } else if (valueUserName.value != "") {
        showCategoriesBody();
        valueUserName.value="";
    }

    const btnCategoryMythology = document.getElementById('category-mythology');
    const btnCategoryArt = document.getElementById('category-art');
    const btnCategoryMusic = document.getElementById('category-music');

    btnCategoryMythology.addEventListener('click', async function() {
        try {
            await setCategory(
                'https://opentdb.com/api.php?amount=10&category=20&difficulty=medium',
                'https://images.pexels.com/photos/3264735/pexels-photo-3264735.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
            );
        } catch (err) {console.error(err,'Ups! Something went wrong :(')}
    });

    btnCategoryArt.addEventListener('click', async function() {
        try {
            await setCategory(
                'https://opentdb.com/api.php?amount=10&category=25&difficulty=medium',
                'https://images.pexels.com/photos/2372982/pexels-photo-2372982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
            );
        } catch (err) {console.error(err,'Ups! Something went wrong :(')} 
    });

    btnCategoryMusic.addEventListener('click', async function() {
        try {
            await setCategory(
                'https://opentdb.com/api.php?amount=10&category=12&difficulty=medium',
                'https://images.pexels.com/photos/4709822/pexels-photo-4709822.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
            );
        } catch (err) {console.error(err,'Ups! Something went wrong :(')}
    });
};


btnStartGame.addEventListener('click', startGame);

