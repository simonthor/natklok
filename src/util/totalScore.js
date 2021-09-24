const { QUESTIONS } = require("./constants");

export const getStoredTotalAmount = () => {
  let questionScores = JSON.parse(localStorage.getItem("questionScores"));
  let amountCorrect = questionScores !== null ? questionScores.length : 0;
  return amountCorrect;
};

export const getMaxScore = () => {
  return Object.keys(QUESTIONS).length;
};

export const addCorrectAnswer = (questionId) => {
  let questionScores = localStorage.getItem("questionScores");
  if (questionScores === null) {
    localStorage.setItem("questionScores", JSON.stringify([questionId]));
  } else if (questionScores.includes(questionId) === false) {
    let prevQuestionScores = JSON.parse(localStorage.getItem("questionScores"));
    localStorage.setItem(
      "questionScores",
      JSON.stringify([...prevQuestionScores, questionId])
    );
  }
};
