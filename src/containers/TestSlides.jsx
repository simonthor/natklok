import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import SwipeableViews from "react-swipeable-views";

// Custom
import {
  BANK_PROFILE,
  GAMING_PROFILE,
  STREAMING_PROFILE,
  SOCIAL_MEDIA_PROFILE,
  HEIGHT,
  PURPLE,
} from "../util/constants";

import { generateQuestions } from "../util/generateQuestions";
import { getMaxScore } from "../util/getMaxScore";
import getPretendScore from "../util/getPretendScore";
import ResultSlide from "../components/slides/ResultSlide";
import ProfileSelectionSlide from "../components/slides/ProfileSelectionSlide";
import QuestionsSlide from "../components/slides/QuestionsSlide";

const TestSlides = ({ 
  t, 
  setCurrentQuestionIndex, 
  setTotalQuestions, 
  setIsFinished, 
  setconfettiRun, 
  setconfettiRecycle 
}) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [testFinished, setTestFinished] = useState(false);
  const [profileState, setState] = useState({
    [BANK_PROFILE]: false,
    [GAMING_PROFILE]: false,
    [STREAMING_PROFILE]: false,
    [SOCIAL_MEDIA_PROFILE]: false,
  });

  const handleProfileCheckboxChecked = (event) => {
    setState({ ...profileState, [event.target.name]: event.target.checked });
  };

  const increaseScore = (inc) => {
    setScore(Number(score) + getPretendScore(inc));
  };

  const nextSlide = () => {
    console.log(slideIndex);
    if (slideIndex === 0) {
      let generated_questions = generateQuestions(profileState);
      let maxScore = getMaxScore(generated_questions);
      setQuestions(generated_questions);
      setMaxScore(maxScore);
      setTotalQuestions(generated_questions.length);
      setCurrentQuestionIndex(1);
      document.getElementById("formContainer").style.background = "none";
    } else if (slideIndex === 1) {
      setTestFinished(true);
      setIsFinished(true);
    }
    setSlideIndex(slideIndex + 1);
  };

  return (
    <div style={{ 
      height: (HEIGHT === 0) ? "100%" : HEIGHT,
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      overflow: "hidden"
    }}
    id="formContainer">
      <SwipeableViews index={slideIndex}>
        <ProfileSelectionSlide
          t={t}
          nextSlide={nextSlide}
          handleProfileCheckboxChecked={handleProfileCheckboxChecked}
          profileState={profileState}
        />
        <QuestionsSlide
          t={t}
          nextSlide={nextSlide}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
          questions={questions}
          score={score}
          increaseScore={increaseScore}
          setconfettiRun={setconfettiRun}
          setconfettiRecycle={setconfettiRecycle}
        />
        <ResultSlide
          score={score}
          maxScore={maxScore}
          testFinished={testFinished}
        />
      </SwipeableViews>
    </div>
  );
};

export default withTranslation("common")(TestSlides);
