const questionArea = document.querySelector(".question");

const question1 = {
  question: "This is the first question?",
  answer1: "This is the first answer",
  answer2: "This is the second answer",
  answer3: "This is the third answer",
};

function displayBlock() {
  // take object to display and add to HTML
  let el = document.createElement("section");
  //   add question
  el.textContent = question1.question;
  questionArea.appendChild(el);
  //   find answers
  const keys = Object.keys(question1);
  console.log(keys);
  keys.forEach((key) => {
    if (key === "question") return;
    console.log("not question", key);
    answerEl = document.createElement("section");
    answerEl.textContent = question1[key];
    questionArea.appendChild(answerEl);
  });
}

displayBlock();
