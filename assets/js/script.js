// Query selector variables

var startScreen = document.querySelector('.start');
var startDiv = document.querySelector('.bored-api');
var catScreen = document.querySelector('#categories');
var quizScreen = document.querySelector('#quiz');
var timeEl = document.querySelector('.time');
var nameScreen = document.querySelector('#aquire-name');
var userName = document.querySelector('#name');
var scoresScreen = document.querySelector('.scores-page');
var funIdea = document.querySelector('#scores-idea');
var numFetch = document.querySelector('#num-fetch');
var scoreTable = document.querySelector('#show-score');

// Local variables
var currentIndex = 0;
let score = 0;
// First Bored API Fetch request
function boredFetch() {
    var requestURL = `http://www.boredapi.com/api/activity/`;

    fetch(requestURL) 
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        // console.log(data);
        if (document.querySelector('.start-api') != undefined) {
            var indexBored1 = document.querySelector('.start-api');
            startDiv.removeChild(indexBored1);
        }
        var indexBored = document.createElement('div');
        indexBored.setAttribute('class', 'start-api');
        var fetchHtml = `<h4 class="has-text-grey subtitle is-4">${data.activity}?</h4>`;
        indexBored.innerHTML = fetchHtml;
        startDiv.appendChild(indexBored);
    })
}

function getStart() {
    boredFetch();
    startScreen.classList.remove('hide');
    catScreen.classList.add('hide');
}

// Calling function to get started
getStart();

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
            aquirename();
        }
    }, 1000)
}

// Get categories element that will contain the categories
var categoriesEl = document.getElementById('categories');

function getCategories(pageNumber) {
    startScreen.classList.add('hide');
    catScreen.classList.remove('hide');
    var apiUrl = `https://opentdb.com/api_category.php`;
    fetch(apiUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
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
                btnCat.addEventListener('click', function() {
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
        .catch(function(error) {
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



// My code:


// Aquire name functions
function aquireName() {
    clearInterval(timerInterval);
    startScreen.classList.add('hide');
    quizScreen.classList.add('hide');
    nameScreen.classList.remove('hide');
}

function submitBtn(event) {  
    event.preventDefault();
    var userScore = {
        user: userName.value.trim(),
        score: score
    }
    console.log(userScore);
    saveScores(userScore);
    displayScores();
}

// Display high score functions
function saveScores(userScore) {
    var savedScores = localStorage.getItem('savedScores');
    var scoresArray = [];
    if (savedScores) {
        scoresArray = JSON.parse(savedScores);
    }
    scoresArray.push(userScore);
    localStorage.setItem('savedScores', JSON.stringify(scoresArray));
}

String.prototype.toSentenceCase= function() {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase()
}

function getScores() {
        scoreTable.innerHTML = `
                    <tr>
                        <td class="is-size-4"><strong>Users</strong></td>
                        <td class="is-size-4"><strong>Scores</strong></td>
                    </tr>
        `;
        var savedScores = localStorage.getItem('savedScores');
        if (savedScores) {
            var scoresArray = JSON.parse(savedScores).sort((a, b) => b.score - a.score);
            for (var i = 0; i < 11; i++) {
                var tableRow = document.createElement('tr');
                tableRow.classList.add('score-row');
                if (scoresArray[i]) {
                    var userName = scoresArray[i].user ? scoresArray[i].user.toSentenceCase() : 'N/A';
                    var userScore = scoresArray[i].score !== undefined ? scoresArray[i].score : 'N/A';
                    tableRow.innerHTML = `
                        <td>${userName}</td><td>${userScore}</td>
                    `;
                    scoreTable.appendChild(tableRow);
            }
        }
    };
}

$('#reset-btn').on('click', function() {
    localStorage.removeItem('savedScores');
    $('.score-row').remove();
});

function displayScores() {
    boredFetch2();
    nameScreen.classList.add('hide');
    scoresScreen.classList.remove('hide');
    getScores();
 }

 // Second bored fetch request
function boredFetch2() {
    var requestURL = `http://www.boredapi.com/api/activity/`;

    fetch(requestURL) 
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        // console.log(data);
        if (document.querySelector('.score-bored') != undefined) {
            var scoreBored1 = document.querySelector('.score-bored');
            funIdea.removeChild(scoreBored1);
        }
        var scoreBored = document.createElement('div');
        scoreBored.setAttribute('class', 'score-bored');
        var fetchHtml = `<p class="second-bored has-text-grey my-4 subtitle is-4"><i>${data.activity}!</i></p>`;
        scoreBored.innerHTML = fetchHtml;
        funIdea.appendChild(scoreBored);
    })
}


 function playAgain() {
    scoresScreen.classList.add('hide');
    startScreen.classList.remove('hide');
    boredFetch();
 }

// Event listeners
$('#category-btn').on('click', () => { getCategories(1) });
$('#submit-name').on('click', submitBtn);
$('#back-btn').on('click', getStart);
$('#suggest-btn').on('click', boredFetch);
$('#name-btn').on('click', aquireName);
$('#play-again-btn').on('click', playAgain);







// Stash of bulma elements to add:

// Progress bar for quiz:
// `
// <progress class="progress is-success" value="60" max="100">60%</progress>
// `



