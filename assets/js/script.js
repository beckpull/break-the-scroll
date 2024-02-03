var startScreen = document.querySelector('.start');
var startDiv = document.querySelector('#start-screen')
var catScreen = document.querySelector('#categories');
var quizScreen = document.querySelector('#quiz');
var initialsScreen = document.querySelector('#aquire-initials');
var scoresScreen = document.querySelector('#high-scores');
var funIdea = document.querySelector('#scores-idea');


// Bored API Fetch request

function boredFetch() {

    var requestURL = `http://www.boredapi.com/api/activity/`;

    fetch(requestURL) 
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        if (document.querySelector('.start-api') == undefined) {
            var indexBored = document.createElement('div');
            indexBored.setAttribute('class', 'start-api');
            var fetchHtml = `<p class="bored-api">${data.activity}</p>`;
            indexBored.innerHTML = fetchHtml;
            startDiv.appendChild(indexBored);
        }
    })
}

boredFetch();

// Go to category page
function getCategories() {
    startScreen.classList.add('hide');
    catScreen.classList.remove('hide');
}

// Quiz functions
function startQuiz() {
    startScreen.classList.add('hide');
    quizScreen.classList.remove('hide');
}
// Open Trivia DB fetch request

// Aquire initials functions

// Display high score functions
 function displayScores() {

    boredFetch();
 }

// More things

// Event listeners
$('#category-btn').on('click', getCategories);