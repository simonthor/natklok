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

  removeIncorrectAnswer(questionId);
  if (questionScores === null) {
    localStorage.setItem("questionScores", JSON.stringify([questionId]));
  } else if (prevQuestionScores.includes(questionId) === false) {
    localStorage.setItem(
      "questionScores",
      JSON.stringify([...prevQuestionScores, questionId])
    );
  }
};

export const getIncorrectlyAnsweredIds = () => {
  var incorrectlyAnsweredIds = JSON.parse(
    localStorage.getItem("incorrectQuestionScores")
  );
  if (incorrectlyAnsweredIds === null) {
    return [];
  }
  return incorrectlyAnsweredIds;
};

export const addIncorrectAnswer = (questionId) => {
  let incorrectCuestionScores = localStorage.getItem("incorrectQuestionScores");
  let prevIncorrectQuestionScores = JSON.parse(
    localStorage.getItem("incorrectQuestionScores")
  );

  if (incorrectCuestionScores === null) {
    localStorage.setItem(
      "incorrectQuestionScores",
      JSON.stringify([questionId])
    );
  } else if (prevIncorrectQuestionScores.includes(questionId) === false) {
    localStorage.setItem(
      "incorrectQuestionScores",
      JSON.stringify([...prevIncorrectQuestionScores, questionId])
    );
  }
};

const removeIncorrectAnswer = (questionId) => {
  let incorrectQuestionScores = localStorage.getItem("incorrectQuestionScores");

  if (incorrectQuestionScores !== null) {
    let questions = JSON.parse(incorrectQuestionScores);
    questions.forEach((incorrectId, index) => {
      if (incorrectId === questionId) {
        questions.splice(index, 1);
      }
    });
    localStorage.setItem("incorrectQuestionScores", JSON.stringify(questions));
  }
};
