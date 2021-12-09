const { QUESTIONS } = require("./constants");

export const getStoredTotalAmount = () => {
  let questionScores = JSON.parse(localStorage.getItem("questionScores"));
  let amountCorrect = questionScores !== null ? questionScores.length : 0;
  return amountCorrect;
};

export const getAllQuestionAmount = (group = "") => {
  if (group === "") {
    return Object.keys(QUESTIONS).length;
  } else {
    let total = 0;
    QUESTIONS.forEach((questionData) => {
      if (questionData.group === group) {
        total += 1;
      }
    });
    return total;
  }
};

export const getCorrectlyAnsweredIds = () => {
  var correctlyAnsweredIds = JSON.parse(localStorage.getItem("questionScores"));
  if (correctlyAnsweredIds === null) {
    return [];
  }

  return correctlyAnsweredIds;
};

export const getCorrectlyAnsweredQuestionData = (group = "") => {
  let correctlyAnsweredIds = getCorrectlyAnsweredIds();
  let correctQuestionData = [];

  QUESTIONS.forEach((questionData) => {
    if (group !== "") {
      if (
        questionData.group === group &&
        correctlyAnsweredIds.includes(questionData["id"])
      ) {
        correctQuestionData.push(questionData);
      }
    } else {
      correctQuestionData.push(questionData);
    }
  });

  return correctQuestionData;
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

export const getIncorrectlyAnsweredQuestionData = (group = "") => {
  let incorrectlyAnsweredIds = getIncorrectlyAnsweredIds();
  let incorrectQuestionData = [];

  QUESTIONS.forEach((questionData) => {
    if (group !== "") {
      if (
        questionData.group === group &&
        incorrectlyAnsweredIds.includes(questionData["id"])
      ) {
        incorrectQuestionData.push(questionData);
      }
    } else {
      incorrectQuestionData.push(questionData);
    }
  });

  return incorrectQuestionData;
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
