// Query selector variables
var startScreen = document.querySelector('.start');
var startDiv = document.querySelector('#start-screen')
var catScreen = document.querySelector('#categories');
var quizScreen = document.querySelector('#quiz');
var timeEl = document.querySelector('.time');
var initialsScreen = document.querySelector('#aquire-initials');
var initials = document.querySelector('#initials');
var scoresScreen = document.querySelector('#high-scores');
var funIdea = document.querySelector('#scores-idea');

// Local variables
var currentIndex = 0;
let score = 0;

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
    // Going to need to add trivia fetch request to get category possibilities?
}

// Quiz functions 

// Setting timer/interval
var timerInterval;
var secondsLeft;

function setTimer() {
    secondsLeft = 120;

    timerInterval = setInterval(function() {
        if (secondsLeft >= 0) {
            timeEl.textContent = 'Time: ' + secondsLeft;
            secondsLeft--;
        } else {
            clearInterval(timerInterval);
            aquireInitials();
        }
    }, 1000)
}

function startQuiz() {
    score = 0;
    currentIndex = 0;
    setTimer();
    startScreen.classList.add('hide');
    quizScreen.classList.remove('hide');
    displayQuestion();
}

function displayQuestion() {
    // reset page to nothing so we refresh with new information each time
    // run fetch request function with quiz functionality in second promise statement
    triviaFetch();
}

// Open Trivia DB fetch request function
function triviaFetch() {
    var requestURL = ``; // needs url

    fetch(requestURL) 
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        // All the things to do with the trivia data - most of our quiz functionality I would think
    })
}


// Aquire initials functions
function aquireInitials() {
    clearInterval(timerInterval);
    quizScreen.classList.add('hide');
    initialsScreen.classList.remove('hide');
}

function submitBtn(event) {
    event.preventDefault();
    var userScore = {
        user: initials.value.trim(),
        score: score
    }
    localStorage.setItem('userInfo', JSON.stringify(userScore));
}

// Display high score functions
function displayScores() {

    boredFetch();
 }



// Event listeners
$('#category-btn').on('click', getCategories);
$('#submit-initials').on('click', submitBtn);