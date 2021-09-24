import { GENERAL_PROFILE, QUESTIONS } from "./constants";

export const generateQuestions = (profileState) => {
  var newQuestions = [];
  QUESTIONS.forEach((question) => {
    if (
      profileState[question.forProfile] === true ||
      question.forProfile === GENERAL_PROFILE
    ) {
      newQuestions.push(question);
    }
  });
  var randomized = newQuestions.sort((a, b) => 0.5 - Math.random());
  var limitedAmount = randomized.slice(0, 10);
  return limitedAmount;
};
