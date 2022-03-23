const introEl = document.querySelector("#intro");

const questionsEl = document.querySelector("#questions");
let questionEl = document.querySelector("#question");

let questionCount = 0;
const trueFlaseEl = document.querySelector("#yaynay");

const endQuizEl = document.querySelector("#final");
const hsEl = document.querySelector("#highscores");
let nameScore = document.querySelector("#initials");

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
    }
];
