const homeNav = document.getElementById('home-nav');
const questionNav = document.getElementById('question-nav');
const resultsNav = document.getElementById('results-nav');

const homeBody = document.getElementById('home-body');
const questionBody = document.getElementById('question-body');
const resultsBody = document.getElementById('results-body');

axios.get('https://opentdb.com/api.php?amount=10&category=20')
    .then(question => console.log(question.results))
    .catch(err => console.error(err,'ERROR'));
