import React, { useState } from "react";
import { withTranslation } from "react-i18next";

// Custom
import {
  BANK_PROFILE,
  GAMING_PROFILE,
  STREAMING_PROFILE,
  SOCIAL_MEDIA_PROFILE,
} from "util/constants";

import { generateQuestions } from "util/generateQuestions";
import { getMaxScore } from "util/getMaxScore";
import ResultSlide from "components/slides/ResultSlide";
import ProfileSelectionSlide from "components/slides/ProfileSelectionSlide";
import QuestionsSlide from "components/slides/QuestionsSlide";
import { getQuestionFromId } from "util/getQuestionFromId";
import QuestionNotFound from "components/slides/QuestionNotFound";
import { useLocation } from "react-router-dom";

const TestSlides = ({
  t,
  setCurrentQuestionIndex,
  setTotalQuestions,
  setIsFinished,
  setconfettiRun,
  setconfettiRecycle,
  increaseStarAmount,
  starAmount,
}) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [foundQuerySearchQuestion, setFoundQuerySearchQuestion] = useState(
    false
  );
  const [checkedQuery, setCheckedQuery] = useState(false);
  const [maxStarAmount, setMaxStarAmount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [testFinished, setTestFinished] = useState(false);
  const [profileState, setState] = useState({
    [BANK_PROFILE]: false,
    [GAMING_PROFILE]: false,
    [STREAMING_PROFILE]: false,
    [SOCIAL_MEDIA_PROFILE]: false,
  });
  const location = useLocation();

  if (checkedQuery === false) {
    setCheckedQuery(true);

    let questionId = new URLSearchParams(location.search).get("id");
    if (questionId !== null) {
      var questionData = getQuestionFromId(questionId);
      if (questionData !== null) {
        setFoundQuerySearchQuestion(true);
        setQuestions([questionData]);
        setSlideIndex(1);
      } else {
        return <QuestionNotFound />;
      }
    }
  }

  const handleProfileCheckboxChecked = (event) => {
    setState({ ...profileState, [event.target.name]: event.target.checked });
  };

  const nextSlide = () => {
    if (slideIndex === 0) {
      // Do this if we should run the test as normal
      if (foundQuerySearchQuestion === false) {
        let generatedQuestions = generateQuestions(profileState);
        let maxScore = getMaxScore(generatedQuestions);
        setQuestions(generatedQuestions);
        setMaxStarAmount(maxScore);
        setTotalQuestions(generatedQuestions.length);
        setCurrentQuestionIndex(1);
      }

      document.getElementById("formContainer").style.background = "none";
    } else if (slideIndex === 1) {
      setTestFinished(true);
      setIsFinished(true);
    }
    setSlideIndex(slideIndex + 1);
  };

  return (
    <div id="formContainer">
      <div
        index={slideIndex}
        style={{
          maxWidth: "100vw",
          height: "100%",
        }}
      >
        {/* Only show profile selection if we have generated the quiz */}
        {foundQuerySearchQuestion !== true && slideIndex === 0 ? (
          <ProfileSelectionSlide
            t={t}
            nextSlide={nextSlide}
            handleProfileCheckboxChecked={handleProfileCheckboxChecked}
            profileState={profileState}
          />
        ) : null}

        {slideIndex === 1 && (
          <QuestionsSlide
            t={t}
            nextSlide={nextSlide}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            questions={questions}
            profileStates={profileState}
            increaseStarAmount={increaseStarAmount}
            setconfettiRun={setconfettiRun}
            setconfettiRecycle={setconfettiRecycle}
            linkToEntireQuiz={foundQuerySearchQuestion}
            setStreak={setStreak}
            streak={streak}
          />
        )}

        {slideIndex === 2 && (
          <ResultSlide
            starAmount={starAmount}
            maxStarAmount={maxStarAmount}
            testFinished={testFinished}
          />
        )}
      </div>
    </div>
  );
};

export default withTranslation("common")(TestSlides);
