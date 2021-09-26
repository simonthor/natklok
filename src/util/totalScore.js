const { QUESTIONS } = require("./constants");

export const getStoredTotalAmount = () => {
  let questionScores = JSON.parse(localStorage.getItem("questionScores"));
  let amountCorrect = questionScores !== null ? questionScores.length : 0;
  return amountCorrect;
};

export const getAllQuestionAmount = () => {
  return Object.keys(QUESTIONS).length;
};

export const getCorrectlyAnsweredIds = () => {
  var correctlyAnsweredIds = JSON.parse(localStorage.getItem("questionScores"));
  if (correctlyAnsweredIds === null) {
    return [];
  }
  return correctlyAnsweredIds;
};

export const addCorrectAnswer = (questionId) => {
  let questionScores = localStorage.getItem("questionScores");
  let prevQuestionScores = JSON.parse(localStorage.getItem("questionScores"));

  if (questionScores === null) {
    localStorage.setItem("questionScores", JSON.stringify([questionId]));
  } else if (prevQuestionScores.includes(questionId) === false) {
    localStorage.setItem(
      "questionScores",
      JSON.stringify([...prevQuestionScores, questionId])
    );
  }
};
