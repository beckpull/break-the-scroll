// Query selector variables
var startPage = './index.html';
var startScreen = document.querySelector('.start');
var startDiv = document.querySelector('#start-screen')
var catScreen = document.querySelector('#categories');
var quizPage = './quiz.html';
var quizScreen = document.querySelector('#quiz');
var qrCode = './index.html';
var timeEl = document.querySelector('.time');
var initialsScreen = document.querySelector('#aquire-initials');
var initials = document.querySelector('#initials');
var scorePage = './scores.html';
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
        if (document.querySelector('.start-api') != undefined) {
            var indexBored1 = document.querySelector('.start-api');
            startDiv.removeChild(indexBored1);
        }
        var indexBored = document.createElement('div');
        indexBored.setAttribute('class', 'start-api');
        var fetchHtml = `<h4 class="bored-api subtitle is-4">${data.activity}</h4>`;
        indexBored.innerHTML = fetchHtml;
        startDiv.appendChild(indexBored);
    })
}

function getStart() {
    boredFetch();
    startScreen.classList.remove('hide');
    catScreen.classList.add('hide');
}

getStart();
// Go to category page
function getCategories() {
    startScreen.classList.add('hide');
    catScreen.classList.remove('hide');
    // Going to need to add trivia fetch request to get category possibilities?
    // was thinking of maybe saving categories each user likes in local storage too as a way to spunk it up?
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
    // run fetch request function for each question and populate quiz question/answer elements
    // need quiz functionality in second promise statement 
    // need to generate a random question within the category chosen
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
        // All the things to do with the trivia data - 
        // most of our quiz functionality/populating things I would think
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
$('#back-btn').on('click', getStart);
$('#suggest-btn').on('click', boredFetch)
$('#quiz-btn').on('click', function() {
    
})


$('#back-btn-2').on('click', function() {
    
})





























// Stash of bulma elements to add:

// Progress bar for quiz:
// `
// <progress class="progress is-success" value="60" max="100">60%</progress>
// `

// Modal card

// numbers api for fun fact w/ date for extra cred?
// dayjs to get date, format it for numbers api fetch and 
// populate fun fact with the date in modal just as a weird feature?
// http://numbersapi.com/number/type

{/* <div class="modal">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Modal title</p>
      <button class="delete" aria-label="close"></button>
    </header>
    <section class="modal-card-body">
      <!-- Content ... -->
    </section>
    <footer class="modal-card-foot">
      <button class="button is-link">Save changes</button>
      <button class="button is-link is-outlined">Cancel</button>
    </footer>
  </div>
</div> */}

