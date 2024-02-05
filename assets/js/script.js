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
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
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


// Get categories element that will contain the categories
var categoriesEl = document.getElementById('categories');

function getCategories(pageNumber) {
    startScreen.classList.add('hide');
    catScreen.classList.remove('hide');
    var apiUrl = `https://opentdb.com/api_category.php`;
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            // Determine the total number of pages based on the number of categories
            var startIdx = (pageNumber - 1) * 6;
            var endIdx = startIdx + 6;
            var displayedCategories = data.trivia_categories.slice(startIdx, endIdx);

            // Clear the categories container before adding new categories
            categoriesEl.innerHTML = "";

            // Show the categories container
            var catMessageEl = document.createElement('h2');
            catMessageEl.classList.add('subtitle');
            catMessageEl.textContent = 'Choose a category to start the quiz';
            categoriesEl.appendChild(catMessageEl);
            for (let i = 0; i < displayedCategories.length; i++) {
                var category = displayedCategories[i];
                console.log(category);

                var iconUrl = getIconCategory(category.id);

                categories[category.id] = {
                    name: category.name,
                    iconUrl: iconUrl
                };

                var categoryEl = document.createElement('div');
                categoryEl.classList.add('category');
                categoryEl.innerHTML = `
                    <button class="btn-cat"><img src="${categories[category.id].iconUrl}" alt="${category.name} Icono"></button>
                    <br><span>${category.name}</span>
                `;

                categoriesEl.appendChild(categoryEl);

                var btnCat = categoryEl.querySelector('.btn-cat');
                btnCat.addEventListener('click', function () {
                    categoriesEl.innerHTML = `
                        <h2 class="subtitle">Select the difficulty level</h2>
                        <div class="button-container">
                            <button class="btn-dif">Easy</button>
                            <button class="btn-dif">Medium</button>
                            <button class="btn-dif">Hard</button>
                        </div>
                        
                    `;
                    // Add the logic to get the questions from the category the user chooses
                });

            }

            // Create and add the pagination section
            var pagination = document.createElement('nav');
            pagination.classList.add('pagination');
            pagination.innerHTML = `
                <ul class="pagination-list">
                    <li>
                        <a class="pagination-link ${pageNumber === 1 ? 'is-current' : ''}" 
                           aria-label="Page 1" 
                           aria-current="${pageNumber === 1 ? 'page' : ''}"
                           onclick="getCategories(1)">1</a>
                    </li>
                    <li>
                        <a class="pagination-link ${pageNumber === 2 ? 'is-current' : ''}" 
                           aria-label="Goto page 2" 
                           onclick="getCategories(2)">2</a>
                    </li>
                    <li>
                        <a class="pagination-link ${pageNumber === 3 ? 'is-current' : ''}" 
                           aria-label="Goto page 3" 
                           onclick="getCategories(3)">3</a>
                    </li>
                    <li>
                        <a class="pagination-link ${pageNumber === 4 ? 'is-current' : ''}" 
                           aria-label="Goto page 4" 
                           onclick="getCategories(4)">4</a>
                    </li>
                </ul>
            `;

            categoriesEl.appendChild(pagination);

        })
        .catch(function (error) {
            console.log('Error:', error);
        });


}
// Function to get the URL of the icon for a category
function getIconCategory(categoryId) {
    // Ruta base de la carpeta que contiene las imágenes
    var base = './assets/img/categories/';

    // Extensión de las imágenes (asegúrate de que coincida con la extensión real)
    var extension = '.png';

    // Construir la URL completa utilizando la ruta base, el índice de la categoría y la extensión
    var iconoUrl = `${base}icono${categoryId}${extension}`;

    return iconoUrl;
}




// First call to get categories
getCategories(1);





// Quiz functions 
// ---------------------------------------START JORDAN'S WORK IN PROGRESS ---------------------------------------------------------//
//---------------- Variables ----------------//
// Variable for quick production testing //
// var nextQuestion = $("#nextQuestion");

// Variables to keep//
var questionSet = $(".quiz-screen");
var question = $("<p>").attr("class", "question")
var ulQuiz = $("<ul>")
var answerBtns = $(".option")
var answerBtn = $("<button>")
var generateToken = $("#generateToken");
var resetToekn = $("#resetToken");
var token;
var questionGroup = [];

//---------------- Fetch Requests ----------------//
var quizEl = document.getElementById('quiz');
function tokenFetch() {
    var requestURL = "https://opentdb.com/api_token.php?command=request"
    fetch(requestURL, {
        // Need for future parameters? DELETE if not needed. 
    })
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            token = (data.token);
            console.log(token);
            // Create title for quiz 
            var quizMessageEl = document.createElement('h2');
            quizMessageEl.classList.add('subtitle');
            quizMessageEl.textContent = 'Answer as many questions as you can!';
            quizEl.appendChild(quizMessageEl);
            triviaFetch()
        })

};

function triviaFetch() {
    var requestURL = "https://opentdb.com/api.php?amount=1&category=9&difficulty=easy&token=" + token;
    console.log(requestURL);
    fetch(requestURL)
        .then(function (response) {
            if (!response.ok) {
                return triviaFetch();
            }
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            questionGroup = (data.results[0].incorrect_answers);
            questionGroup.unshift((data.results[0].question), (data.results[0].correct_answer));

            // Create Question <P> element with question//
            questionSet.append(question.html(questionGroup[0]).append(ulQuiz))

            for (var i = 0; i < questionGroup.length - 1; i++) {
                // Create Answers <Button> elements//
                question.append($("<button>").attr({ "class": "option", "id": "option-" + i }))
            }

            $("#option-0").html(questionGroup[1]);
            $("#option-1").html(questionGroup[2]);
            $("#option-2").html(questionGroup[3]);
            $("#option-3").html(questionGroup[4]);
            console.log(questionGroup);
        });
};

//---------------- Event Listeners ----------------//
// Search form event listener //

generateToken.on("click", function (event) {
    tokenFetch();
});

questionSet.on("click", ".option", function () {
    questionGroup = [];
    triviaFetch();
});

//-- Console.log eventlistening prod testing --//
// questionSet.on("click", ".option", function () {
//     console.log($(this).attr("id") === "option-0");
//     console.log(this)
// });

$(".categories").on("click", ".btn-dif", startQuiz);

// ---------------------------------------END JORDAN'S WORK IN PROGRESS ---------------------------------------------------------//

// Setting timer/interval
var timerInterval;
var secondsLeft;

function setTimer() {
    secondsLeft = 120;

    timerInterval = setInterval(function () {
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
    // score = 0;
    // currentIndex = 0;
    // setTimer();
    catScreen.classList.add('hide');
    quizScreen.classList.remove('hide');
    tokenFetch();
    // displayQuestion();
}
// -----------------------------DO WE NEED THIS STILL?---------------------------------//
function displayQuestion() {
    // reset page to nothing so we refresh with new information each time
    // run fetch request function for each question and populate quiz question/answer elements
    // need quiz functionality in second promise statement 
    // need to generate a random question within the category chosen
    triviaFetch();
}

// Open Trivia DB fetch request function
// function triviaFetch() {
//     var requestURL = ``; // needs url

//     fetch(requestURL)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             console.log(data);
//             // All the things to do with the trivia data - 
//             // most of our quiz functionality/populating things I would think
//         })
// }
// -----------------------------DO WE NEED THIS STILL?---------------------------------//

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
$('#quiz-btn').on('click', function () {

})


$('#back-btn-2').on('click', function () {

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

