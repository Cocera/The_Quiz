const homeNav = document.getElementById('home-nav');
const resultsNav = document.getElementById('results-nav');
const btnClearNav = document.getElementById('clear-nav');

const homeBody = document.getElementById('home-body');
const categoriesBody = document.getElementById('categories-body');
const questionBody = document.getElementById('question-body');
const resultsBody = document.getElementById('results-body');

const btnStartGame = document.getElementById('start-game');
const answerBtns = document.getElementById('answer-buttons');

const valueUserName = document.getElementById('input-user-name');




// ---------- Global scope variables

let currentQuestionIndex;
let arrUsersResults = []; 
let questionsAll = [];

let userName = '';
let correctAnswersCounter = 0;




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


// function printRanking() {
//     const tableResults = document.getElementById('tableResults');
//     const downloadUsers = JSON.parse(localStorage.getItem('usersResults')) || [];

//     downloadUsers.forEach((user, index), () => {
//         tableResults.innerHTML += `
//         <tr>
//             <td>${user.user}</td>
//             <td>${user.score} /10</td>
//         </tr>`
//     })

//     showResultsBody()
// };

function printRanking() {
    const tableResults = document.getElementById('tableResults');
    const downloadUsers = JSON.parse(localStorage.getItem('usersResults')) || [];

    tableResults.innerHTML = ''; // Limpiamos la tabla antes de agregar nuevos datos

    downloadUsers.forEach(user => {
        tableResults.innerHTML += `
        <tr>
            <td>${user.user}</td>
            <td>${user.score} pt.</td>
        </tr>`;
    });
}






// ---------- Start game

function showQuestion(question) {
    valueUserName.value="";

    const questionTxt = document.getElementById('question');
    const txtPosition = document.getElementById('currentPosition');
    
    txtPosition.innerText = `Question ${currentQuestionIndex+1}/10`;

    questionTxt.innerHTML = question.question;

    const allAnswers = [...question.incorrect_answers, question.correct_answer];
    allAnswers.sort(() => Math.random() - 0.5);

    allAnswers.forEach((answer) => {
        const button = document.createElement('button');
        button.innerHTML = answer;
        button.classList.add('btn-answer');
        button.addEventListener('click', () => {

            if (button.innerText == question.correct_answer) {
                correctAnswersCounter+= 5 // Mostrar el color si es true o false tu respuesta
            } else if (button.innerText != question.correct_answer) {
                correctAnswersCounter -= 0.5;
            };

            currentQuestionIndex++;

            setTimeout(() => {
                setNextQuestion();;
              }, 500);
        });

        answerBtns.appendChild(button);
    });
    saveUsersScores(userName, correctAnswersCounter);
};



function setNextQuestion() {
    answerBtns.innerHTML="";
    if (currentQuestionIndex == 10) {
        showResultsBody();
    } else if (currentQuestionIndex < 10) {
        showQuestionBody();
        showQuestion(questionsAll[currentQuestionIndex]);
    }
};


function startGame() {

    currentQuestionIndex = 0;
    correctAnswersCounter = 0;

    if (valueUserName.value == "") {
        console.error('User name needed')
    } else if (valueUserName.value != "") {
        userName = valueUserName.value;
        showCategoriesBody();
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

function saveUsersScores(name, score) {
    const userResult = { user: name, score: score};
    if (currentQuestionIndex==9) {
        arrUsersResults.push(userResult);
        localStorage.setItem('usersResults', JSON.stringify(arrUsersResults));
    };
    printRanking()
};


btnStartGame.addEventListener('click', startGame);
btnClearNav.addEventListener('click', function() {
    localStorage.removeItem('usersResults');
    alertNotification.classList.remove('hide')
    alertNotification.innerText = 'Ooooh! Users deleted :('
    setTimeout(() => {
        alertNotification.classList.add('hide');
    }, 1000);
});

