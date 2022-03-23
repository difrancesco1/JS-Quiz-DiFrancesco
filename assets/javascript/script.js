const introEl = document.querySelector("#intro");

const questionsEl = document.querySelector("#questions");
let questionEl = document.querySelector("#question");

let questionCount = 0;
const trueFlaseEl = document.querySelector("#correctIncorrect");

const endQuizEl = document.querySelector("#final");
const hsEl = document.querySelector("#highscores");
let nameScore = document.querySelector("#username");

let hsList2 = document.querySelector("#score-list");
let hsList = [];

let timeQuiz = document.querySelector("p.time");
let timeRemaining = 120;
let youScore = document.querySelector("#score");

const startBtn = document.querySelector("#start"); //Start Quiz Button

const ansBtn = document.querySelectorAll("button.ansBtn") //Answer Button
const ans1Btn = document.querySelector("#answer1");
const ans2Btn = document.querySelector("#answer2");
const ans3Btn = document.querySelector("#answer3");
const ans4Btn = document.querySelector("#answer4");

const vscoresBtn = document.querySelector("#view-scores"); //View High Scores
const eraseBtn = document.querySelector("#clearscores"); //Clear Highscore List
const submitBtn = document.querySelector("#submit-score"); //Submit you new score to leaderboards
const backbtn = document.querySelector("#goback"); //Back to Home

const questions = [ //Question Arrays
    {
        question: "What is the correct way to write a JavaScript array?",
        answers: ['var colors = "red", "green"', 'var colors = (1:"red", 2:"green", 3:"blue")', 'var colors = ["red", "green", "blue"]', 'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")'],
        correctAnswer: "2"
    },
    {
        question: "How to insert a comment that has more than one line?",
        answers: ['<!--This comment has more than one line-->', '//This comment has more than one line//', '/*This comment has more than one line*/', '//*This comment has more than one line*//'],
        correctAnswer: "2"
    },
    {
        question: "How does a FOR loop start?",
        answers: ["for i = 1 to 5", "for (i = 0; i <= 5)", "for (i <= 5; i++)", "for (i = 0; i <= 5; i++)"],
        correctAnswer: "3"
    },
    {
        question: "How does a WHILE loop start?",
        answers: ["while i = 1 to 10", "while (i <= 10)", "while (i <= 10; i++)", "while i = (i <= 10)"],
        correctAnswer: "1"
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        answers: ['alert("Hello World");', 'alertBox("Hello World");', 'msgBox("Hello World");', 'msg("Hello World");'],
        correctAnswer: "0"
    },
    {
        question: "Which event occurs when the user clicks on an HTML element?",
        answers: ['onchange', 'onmouseclick', 'onclick ', 'onmouseover'],
        correctAnswer: "2"
    }
];

//All fucntions needed for quiz (Starting Quiz, Setting Questions, Timer, Answer Verification, and Highscore features)

function quizBegin() {
    introEl.style.display = "none";
    questionsEl.style.display = "block";
    questionCount = 0;

    setTime();
    questionOrg(questionCount);
}

function questionOrg(id) { //Organizes Questions 
    if (id < questions.length) { 
        questionEl.textContent = questions[id].question;
        ans1Btn.textContent = questions[id].answers[0];
        ans2Btn.textContent = questions[id].answers[1];
        ans3Btn.textContent = questions[id].answers[2];
        ans4Btn.textContent = questions[id].answers[3];
    }
}

function setTime() {
    let timerInterval = setInterval(function () {
        timeRemaining--;
        timeQuiz.textContent = `Time:${timeRemaining}s`;

        if (timeRemaining === 0 || questionCount === questions.length) {
            clearInterval(timerInterval);

            questionsEl.style.display = "none";
            endQuizEl.style.display = "block";
            youScore.textContent = timeRemaining;
        }
    }, 1000); //Need this else it think seconds = ms 
}



// function to check answer and then move to next question
function verifyAnswerFunction(event) {
    event.preventDefault();

    trueFlaseEl.style.display = "block";
    let response = document.createElement("p"); //need this to be a paragraph
    trueFlaseEl.appendChild(response);

    setTimeout(function () { //deletes the response after 2.5 seconds
        response.style.display = 'none';
    }, 2500);

    //Function that checks the response and determines whether its the correct answer or not
    if (questions[questionCount].correctAnswer === event.target.value) {
        response.textContent = "Correct Answer";
    } else if (questions[questionCount].correctAnswer !== event.target.value) {
        timeRemaining = timeRemaining - 15;
        response.textContent = "Incorrect Answer";
    }

    // increment so the questions index is increased
    if (questionCount < questions.length) {
        questionCount++;
    }
    // call questionOrg to bring in next question when any ansBtn is clicked
    questionOrg(questionCount);
}

function newScore(event) {
    event.preventDefault();

    endQuizEl.style.display = "none";
    hsEl.style.display = "block";

    let nameCap = nameScore.value.charAt(0).toUpperCase() + nameScore.value.slice(1); //Uppercase first letter!
    hsList.push({ username: nameCap, score: timeRemaining });

    hsList = hsList.sort((a, b) => { //Sorting scores based on their value
        if (a.score < b.score) {
          return 1;
        } else {
          return -1;
        }
      });
    
    hsList2.innerHTML="";
    for (let i = 0; i < hsList.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${hsList[i].username}: ${hsList[i].score}`;
        hsList2.append(li);
    }

    //Add Score inputs to our local storage/display them
    storehs();
    displayhs();
}

function storehs() {
    localStorage.setItem("hsList", JSON.stringify(hsList));
}

function displayhs() {
    //pull scores from storage
    let storedhslist = JSON.parse(localStorage.getItem("hsList"));

    //upon recieving any new scores from local storage, display them
    if (storedhslist !== null) {
        hsList = storedhslist;
    }
}

//clear score list
function clearhs() {
    localStorage.clear();
    hsList2.innerHTML="";
}

// EventListeners
startBtn.addEventListener("click", quizBegin); //Quiz Begin

ansBtn.forEach(item => {
    item.addEventListener('click', verifyAnswerFunction); //Answer Verification
});

backbtn.addEventListener("click", function () { //Return to main page and reset timer display
    hsEl.style.display = "none";
    introEl.style.display = "block";
    timeRemaining = 120;
    timeQuiz.textContent = `Time:${timeRemaining}s`;
});

submitBtn.addEventListener("click", newScore); //New Score


vscoresBtn.addEventListener("click", function () { //View HS
    if (hsEl.style.display === "none") {
        hsEl.style.display = "block";
    } else if (hsEl.style.display === "block") {
        hsEl.style.display = "none";
    } else {
        return alert("No scores recorded, take the quiz to see where you land!");
    }
});

eraseBtn.addEventListener("click", clearhs); //Clear HighScores
