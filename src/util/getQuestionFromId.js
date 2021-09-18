import { QUESTIONS } from "./constants";

export const getQuestionFromId = (requestedId) => {
  var question = null;
  QUESTIONS.forEach((questionData) => {
    if (String(questionData.id) === requestedId) {
      question = questionData
    }
  });
  return question;
};