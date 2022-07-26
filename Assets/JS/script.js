const questionArea = document.querySelector(".questionForm");

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

var i = 0;
function nextQuestion(question) {
  console.log(i);
  displayBlock(question[i]);
  let buttons = document.querySelectorAll("button");
  console.log(buttons);
  buttons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      answerId = button.getAttribute("answerId");
      question[i]["userAnswer"] = answerId;
      console.log(answerId + " submit");
      if (question[i]["userAnswer"] === question[i]["correctAnswer"]) {
        console.log("right answer");
        clearQuestion();
        i++;
        nextQuestion(questionAr);
      } else {
        console.log("wrong answer");
        clearQuestion();
        i++;
        nextQuestion(questionAr);
      }
      console.log(i);
    });
  });
}

nextQuestion(questionAr);
