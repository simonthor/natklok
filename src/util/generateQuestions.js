import { GENERAL_PROFILE, MAX_AMOUNT_QUESTIONS, QUESTIONS } from "./constants";
import { getCorrectlyAnsweredIds, getAllQuestionAmount } from "./totalScore";

export const generateQuestions = (profileState, showAllUnanswered) => {
  var randomizedQuestions = QUESTIONS.sort((a, b) => 0.5 - Math.random());
  var profileFiltered = filterAfterProfile(
    randomizedQuestions,
    profileState,
    showAllUnanswered
  );
  var newQuestions = generateQuestionsToShow(
    profileFiltered,
    showAllUnanswered
  );

  return newQuestions;
};

const filterAfterProfile = (questions, profileState, showAllUnanswered) => {
  let correctlyAnsweredQuestions = getCorrectlyAnsweredIds();
  let profileFiltered = [];

  questions.forEach((question) => {
    if (showAllUnanswered) {
      if (correctlyAnsweredQuestions.includes(question.id) === false) {
        console.log(question.id, " isn't correctly answered");
        profileFiltered.push(question);
      }
    } else if (
      profileState[question.forProfile] === true ||
      question.forProfile === GENERAL_PROFILE
    ) {
      profileFiltered.push(question);
    }
  });
  return profileFiltered;
};

const generateQuestionsToShow = (profileFiltered, showAllUnanswered) => {
  let newQuestions = [];
  let usedCategories = [];
  var maxScore = getAllQuestionAmount();
  let correctlyAnsweredQuestions = getCorrectlyAnsweredIds();

  profileFiltered.forEach((question) => {
    let showQuestion = false;

    if (showAllUnanswered === true) {
      showQuestion = true;
    } else {
      const alreadyCorrect = correctlyAnsweredQuestions.includes(question.id);
      const alreadyAddedCategory = usedCategories.includes(question.category);
      // Even though we've answered a question we might have to use it since their are so few unanswered ones left
      const reuseCorrect =
        maxScore - correctlyAnsweredQuestions.length < profileFiltered.length;

      if (
        (alreadyCorrect === false || reuseCorrect === true) &&
        alreadyAddedCategory === false
      ) {
        showQuestion = true;
      }
    }

    if (showQuestion === true) {
      usedCategories.push(question.category);
      newQuestions.push(question);
    }
  });

  var questionsToShow = newQuestions;
  if (showAllUnanswered === false) {
    newQuestions.slice(0, MAX_AMOUNT_QUESTIONS);
  }
  return questionsToShow;
};
