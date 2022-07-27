const questionArea = document.querySelector(".questionForm");
const bodyArea = document.querySelector("body");
const timerNumber = document.querySelector(".timer");

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
  question: "Question 2",
  answer1: "answer 1 for question 2()",
  answer2: "answer 2 for q 3()",
  answer3: "None of the above",
  userAnswer: "",
  correctAnswer: "answer1",
};

const question3 = {
  question: "Question 3",
  answer1: "toUpperCase()",
  answer2: "toUpper()",
  answer3: "None answer 3 for q 3 the above",
  userAnswer: "",
  correctAnswer: "answer1",
};

const question4 = {
  question: "question 4",
  answer1: "toUpperCase()",
  answer2: "toUpper()",
  answer3: "None number 4 the above",
  userAnswer: "",
  correctAnswer: "answer1",
};

const questionAr = [question1, question2, question3, question4];

function displayBlock(questions) {
  // take object to display and add to HTML
  let el = document.createElement("section");
  //   add question
  el.textContent = questions.question;
  // console.log("QEUSTION SELECTOR", questions.question);
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
      questionArea.appendChild(answerEl);
    }
  });
}

function clearQuestion() {
  questionArea.innerHTML = " ";
}

function nextQuestion(question) {
  displayBlock(question[questionCount]);
  // find buttons and assign the event listeners for being clicked
  let buttons = document.querySelectorAll("button");
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
      } else {
        console.log("wrong answer");
        // display wrong answer
        // add to wrong answer total
        wrongAnswers++;
        console.log(wrongAnswers);
      }
      // reset and iterate through questions
      questionCount++;
      clearQuestion();
      if (questionCount < questionAr.length) {
        nextQuestion(questionAr);
      } else if (wrongAnswers >= 3) {
        // end game and record scores
        endGame();

        playAgain();
      } else {
        endGame();
        seeHighScores();
        playAgain();
      }
    });
  });
}

let wrongAnswers = 0;
let rightAnswers = 0;
let questionCount = 0;
localStorage.setItem("wins", "0");
localStorage.setItem("loses", "0");
let highScoresAr = [];
let timer = 60;
startButton = document.querySelector(".startBtn");

function playAgain() {
  wrongAnswers = 0;
  rightAnswers = 0;
  questionCount = 0;
  if (confirm("do you want to play again?")) {
    startGame();
    countDown();
  } else {
    startButton.hidden = false;
    console.log("not played again");
  }
}

function countDown() {
  timeLeft = 10;
  timer = setInterval(function () {
    if (timeLeft !== -1) {
      timerNumber.textContent = timeLeft;
      timeLeft--;
    } else {
      clearInterval(timer);
      // end game
      endGame();
      playAgain();
    }
  }, 1000);
}

function recordHighScore() {
  initials = prompt("Please enter your initials");
  highScoresAr.push(initials, rightAnswers);
  localStorage.setItem("highScores", JSON.stringify(highScoresAr));
}

function seeHighScores() {
  highScoresAr = JSON.parse(localStorage.getItem("highScores"));
  console.log(highScoresAr);
  // highScoresAr.forEach();
}
function endGame() {
  // clear questions, record name for high score, play again?
  clearQuestion();
  recordHighScore();
}

function startGame() {
  // start timer
  countDown();
  // start game
  nextQuestion(questionAr);
  // hide button
  startButton.setAttribute("hidden", "true");
}

startButton.addEventListener("click", startGame);
