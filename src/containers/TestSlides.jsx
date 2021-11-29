import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";

// Custom
import { PURPLE } from "util/constants";

import ResultSlide from "slides/ResultSlide";
import ProfileSelectionSlide from "slides/ProfileSelectionSlide";
import QuestionsSlide from "slides/QuestionsSlide";

const TestSlides = ({
  t,
  setCurrentQuestionIndex,
  currentQuestionIndex,
  profileState,
  setProfileState,
  setIsFinished,
  setconfettiRun,
  setconfettiRecycle,
  increaseStarAmount,
  starAmount,
  redoTest,
  slideIndex,
  setSlideIndex,
  startQuiz,
  foundQuerySearchQuestion,
  questions,
  maxStarAmount,
}) => {
  const [streak, setStreak] = useState(0);
  const [testFinished, setTestFinished] = useState(false);

  // If cinematic button made the screen dark, revert here
  useEffect(() => {
    document.body.style.background = PURPLE;
  });

  const handleProfileCheckboxChecked = (event) => {
    setProfileState({
      ...profileState,
      [event.target.name]: event.target.checked,
    });
  };

  const nextSlide = () => {
    if (slideIndex === 0) {
      startQuiz(false); // Does setSlideIndex
      document.getElementById("formContainer").style.background = "none";
    } else if (slideIndex === 1) {
      setTestFinished(true);
      setIsFinished(true);
      setSlideIndex(slideIndex + 1);
    }
  };

  return (
    <div id="formContainer">
      <div
        index={slideIndex}
        style={{
          maxWidth: "100vw",
        }}
      >
        {/* Only show profile selection if we have generated the quiz */}
        {slideIndex === 0 ? (
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
            questions={questions}
            profileStates={profileState}
            increaseStarAmount={increaseStarAmount}
            setconfettiRun={setconfettiRun}
            setconfettiRecycle={setconfettiRecycle}
            linkToEntireQuiz={foundQuerySearchQuestion}
            setStreak={setStreak}
            streak={streak}
            redoTest={redoTest}
            questionIndex={currentQuestionIndex}
            setQuestionIndex={setCurrentQuestionIndex}
          />
        )}

        {slideIndex === 2 && (
          <ResultSlide
            starAmount={starAmount}
            maxStarAmount={maxStarAmount}
            testFinished={testFinished}
            redoTest={redoTest}
          />
        )}
      </div>
    </div>
  );
};

export default withTranslation("common")(TestSlides);
