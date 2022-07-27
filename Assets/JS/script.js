// Question object
const question1 = {
  question:
    "Which built-in method returns the calling string value converted to upper case?",
  answer1: "toUpperCase()",
  answer2: "toUpper()",
  answer3: "None of the above",
  userAnswer: "",
  correctAnswer: "answer1",
};

const question2 = {
  question: "Which built-in method returns the length of the string?",
  answer1: "index()",
  answer2: "size()",
  answer3: "length()",
  answer4: "None of the above",
  userAnswer: "",
  correctAnswer: "answer3",
};

const question3 = {
  question:
    "Are all user-defined objects and built-in objects are descendants of an object called Object?",
  answer1: "True",
  answer2: "False",
  userAnswer: "",
  correctAnswer: "answer1",
};

const question4 = {
  question:
    "Which of the following function of Boolean object returns a string containing the source of the Boolean object?",
  answer1: "toString()",
  answer2: "valueOf()",
  answer3: "toSource()",
  answer4: "None of the above",
  userAnswer: "",
  correctAnswer: "answer1",
};

// Question array
const questionAr = [question1, question2, question3, question4];

// Main functions
function displayBlock(questions) {
  // take object to display and add to HTML
  let el = document.createElement("section");
  //   add question
  el.textContent = questions.question;
  questionArea.appendChild(el);
  //   find answers
  const keys = Object.keys(questions);
  keys.forEach((key) => {
    if (key.startsWith("answer")) {
      // add answers to HTML
      answerEl = document.createElement("button");
      answerEl.textContent = questions[key];
      answerEl.setAttribute("type", "submit");
      answerEl.setAttribute("answerId", key);
      answerEl.setAttribute("class", "answerButton");
      questionArea.appendChild(answerEl);
    }
  });
}

function clearQuestion() {
  // clears question area in the HTML
  questionArea.innerHTML = " ";
}

function nextQuestion(question) {
  displayBlock(question[questionCount]);
  // find buttons and assign the event listeners for being clicked
  let buttons = document.querySelectorAll(".answerButton");
  buttons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      // check if answer is right or wrong
      answerId = button.getAttribute("answerId");
      question[questionCount]["userAnswer"] = answerId;
      if (
        question[questionCount]["userAnswer"] ===
        question[questionCount]["correctAnswer"]
      ) {
        console.log("right answer");
        rightAnswers++;
        // display right answer
        rightWrong((x = true));
      } else {
        console.log("wrong answer");
        // add to wrong answer total
        wrongAnswers++;
        // minus time off timer and display wrong
        timeLeft = timeLeft - 5;
        rightWrong((x = false));
        console.log(wrongAnswers);
      }
      // reset and iterate through questions
      questionCount++;
      clearQuestion();
      if (questionCount < questionAr.length) {
        nextQuestion(questionAr);
      } else if (wrongAnswers >= 3 || timeLeft < -1) {
        // end game and record scores
        endGame();
        playAgain();
      } else {
        endGame();
        playAgain();
      }
    });
  });
}

function playAgain() {
  // reset variables
  wrongAnswers = 0;
  rightAnswers = 0;
  questionCount = 0;
  // reset buttons
  clearInterval(timer);
  timerNumber.textContent = "";
  startButton.hidden = false;
}

var timer = null;
var timeLeft = 0;
function countDown() {
  clearInterval(timer);
  timeLeft = 60;
  timer = setInterval(() => {
    if (timeLeft > -1) {
      timerNumber.textContent = timeLeft;
      timeLeft--;
    } else {
      clearInterval(timer);
      timerNumber.textContent = "";
      // end game
      endGame();
      playAgain();
    }
  }, 1000);
}

function recordHighScore() {
  initials = prompt("Game over!, please enter your initials");
  highScoresAr.push([initials, rightAnswers]);
  localStorage.setItem("highScores", JSON.stringify(highScoresAr));
  appendScore();
}

function seeHighScores() {
  if (highScoreArea.innerHTML != "") {
    highScoreArea.innerHTML = "";
    highScoreArea.style.backgroundColor = "#172444";
    highScoreButton.textContent = "See High Scores";
  } else {
    appendScore();
  }
}

function appendScore() {
  highScoreArea.innerHTML = "";
  if (localStorage.getItem("highScores") === null)
    highScoresAr = JSON.parse(localStorage.getItem("highScores"));
  if (highScoresAr.length != 0) {
    highScoresAr.forEach((index) => {
      console.log(index);
      let name = index[0];
      let score = index[1];
      newScore = document.createElement("li");
      newScore.textContent = name + "      " + score;
      highScoreArea.appendChild(newScore);
    });
    highScoreArea.style.backgroundColor = "#faa71b";
    highScoreButton.textContent = "Hide High Scores";
  }
}

function rightWrong(x) {
  rightWrongArea.textContent = " ";
  if (x) {
    rightWrongArea.textContent = "Correct!";
  } else {
    rightWrongArea.textContent = "Wrong! -5 seconds";
  }
}

function endGame() {
  // clear questions, record name for high score
  clearQuestion();
  recordHighScore();
  rightWrongArea.textContent = "";
  highScoreButton.hidden = false;
}

function startGame() {
  highScoreButton.hidden = true;
  // start timer
  countDown();
  // start game
  nextQuestion(questionAr);
  // hide button
  startButton.setAttribute("hidden", "true");
}

// Initialise global variables and local storage
const questionArea = document.querySelector(".questionForm");
const bodyArea = document.querySelector("body");
const timerNumber = document.querySelector(".timer");
const highScoreArea = document.querySelector(".highScores");
const rightWrongArea = document.querySelector(".rightWrong");
let wrongAnswers = 0;
let rightAnswers = 0;
let questionCount = 0;
let highScoresAr = [["Player:    ", "Score: "]];
startButton = document.querySelector(".startBtn");
highScoreButton = document.querySelector(".highScoreBtn");

// intialise empty local storage if it doesn't already exist
if (localStorage.getItem("highScores") === null) {
  console.log("create local storage");
  localStorage.setItem("highScores", "");
}

// main button event listeners
startButton.addEventListener("click", startGame);
highScoreButton.addEventListener("click", seeHighScores);
