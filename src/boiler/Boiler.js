// Third party
import React, { Suspense, lazy, useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useHistory, useLocation } from "react-router";
import Confetti from "react-confetti";
// Custom
import {
  BANK_PROFILE,
  GAMING_PROFILE,
  STREAMING_PROFILE,
  SOCIAL_MEDIA_PROFILE,
  PURPLE,
} from "util/constants";

// Custom components
import Loading from "components/general/Loading";
import TestSlides from "containers/TestSlides";
import Welcome from "containers/Welcome";
import getWindowSize from "util/getWindowSize.js";
import { ThumbDown } from "@material-ui/icons";
import { generateQuestions } from "util/generateQuestions";
import QuestionNotFound from "components/slides/QuestionNotFound";
import { getQuestionFromId } from "util/getQuestionFromId";
import ResultSlide from "components/slides/ResultSlide";

// Lazy loading
const Header = lazy(() => import("containers/Header"));

const Boiler = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [maxStarAmount, setMaxStarAmount] = useState(0);
  const [starAmount, setStarAmount] = useState(0);
  const [showThumbsDown, setShowThumbsDown] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [confettiRecycle, setconfettiRecycle] = useState(true);
  const [confettiRun, setconfettiRun] = useState(false);
  const [foundQuerySearchQuestion, setFoundQuerySearchQuestion] =
    useState(false);
  const [checkedQuery, setCheckedQuery] = useState(false);
  const [profileState, setProfileState] = useState({
    [BANK_PROFILE]: false,
    [GAMING_PROFILE]: false,
    [STREAMING_PROFILE]: false,
    [SOCIAL_MEDIA_PROFILE]: false,
  });

  const history = useHistory();
  const windowSize = getWindowSize();
  const location = useLocation();

  // If user has entered url /test?id=11 they should only receive that question
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

  const increaseStarAmount = (inc) => {
    let prevAmount = Number(starAmount);
    let newAmount = Number(starAmount) + Number(inc);
    setStarAmount(newAmount);
    // No score increase? Show thumbs down
    if (prevAmount === newAmount) {
      setShowThumbsDown(true);
    }
  };

  const startQuiz = (generateUnanswered) => {
    console.log("generateUnanswered: ", generateUnanswered);
    let generatedQuestions = generateQuestions(
      profileState,
      generateUnanswered
    );
    setQuestions(generatedQuestions);
    setMaxStarAmount(generatedQuestions.length);
    setTotalQuestions(generatedQuestions.length);
    setCurrentQuestionIndex(0);
    setHasStarted(true);
    setSlideIndex(1);
  };

  const redoTest = (generateUnansweredOnly) => {
    resetQuizData(generateUnansweredOnly);
    if (generateUnansweredOnly === true) {
      startQuiz(generateUnansweredOnly);
    }
  };

  const resetQuizData = () => {
    history.push("/test");
    let newProfileState = {};
    Object.keys(profileState).forEach((profileId) => {
      newProfileState[profileId] = false;
    });
    setProfileState(newProfileState);
    setCurrentQuestionIndex(0);
    setSlideIndex(0);
    setStarAmount(0);
    setTotalQuestions(0);
    setIsFinished(false);
    setHasStarted(false);
    setCheckedQuery(false);
    setFoundQuerySearchQuestion(false);
  };

  return (
    <Suspense fallback={<Loading />}>
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        run={confettiRun}
        style={{ opacity: confettiRun ? 1 : 0, transition: "all 0.2s ease" }}
        recycle={confettiRecycle}
        numberOfPieces={40}
        confettiSource={{ x: windowSize.width / 2, y: 80 }}
        initialVelocityX={3}
        initialVelocityY={1}
      />
      <ThumbsDown
        showThumbsDown={showThumbsDown}
        setShowThumbsDown={setShowThumbsDown}
      />
      <div
        style={{
          transition: "0.13s",
          position: "relative",
          display: "grid",
          gridTemplateRows: "min-content 1fr",
          justifyItems: "stretch",
          alignItems: "stretch",
          height: "-webkit-fill-available",
        }}
        id="bgd-container"
      >
        <Header
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={totalQuestions}
          isFinished={isFinished}
          hasStarted={hasStarted}
          starAmount={starAmount}
        />
        <Switch>
          <Route
            path="/"
            exact
            render={() => <Welcome hasStarted={hasStarted} />}
          />
          <Route
            path="/resultslidepreview"
            exact
            render={() => <ResultSlide />}
          />
          <Route
            path="/test"
            render={() => (
              <TestSlides
                profileState={profileState}
                setProfileState={setProfileState}
                setCurrentQuestionIndex={setCurrentQuestionIndex}
                currentQuestionIndex={currentQuestionIndex}
                setIsFinished={setIsFinished}
                setconfettiRecycle={setconfettiRecycle}
                setconfettiRun={setconfettiRun}
                increaseStarAmount={increaseStarAmount}
                starAmount={starAmount}
                redoTest={redoTest}
                slideIndex={slideIndex}
                setSlideIndex={setSlideIndex}
                startQuiz={startQuiz}
                questions={questions}
                foundQuerySearchQuestion={foundQuerySearchQuestion}
                maxStarAmount={maxStarAmount}
              />
            )}
          />
          <Route render={(props) => <Redirect to="/" />} />
        </Switch>
      </div>
    </Suspense>
  );
};

const ThumbsDown = ({ showThumbsDown, setShowThumbsDown }) => {
  const [thumbOpacity, setThumbOpacity] = useState(0);
  const [thumbScale, setThumbScale] = useState(0);
  const [thumbLeft, setThumbLeft] = useState(window.innerWidth / 2);
  const [thumbTop, setThumbTop] = useState("40vh");

  useEffect(() => {
    if (showThumbsDown === true) {
      playAnimation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showThumbsDown]);

  function playAnimation() {
    setThumbOpacity(1);
    setThumbScale(3);
    setThumbLeft(window.innerWidth / 2 - 16);
    setThumbTop("40vh");

    setTimeout(function () {
      setThumbScale(0);
      setThumbOpacity(0);
      setShowThumbsDown(false);
    }, 800);
  }

  return (
    <div
      id="animatedThumb"
      style={{
        transform: "scale(" + thumbScale + ") ",
        position: "absolute",
        left: thumbLeft,
        top: thumbTop,
        opacity: thumbOpacity,
        transition:
          "opacity 0.5s ease, transform 0.5s cubic-bezier(.16,.98,.36,1.6)",
        zIndex: 100,
      }}
    >
      <ThumbDown style={{ color: "red" }} />
    </div>
  );
};

export default Boiler;
