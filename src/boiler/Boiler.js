// Third party
import React, { Suspense, lazy, useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Confetti from "react-confetti";

// Custom components
import { Loading } from "../components/general";
import TestSlides from "../containers/TestSlides";
import Welcome from "../containers/Welcome";
import { PURPLE, HEIGHT } from "../util/constants";
import getWindowSize from "../util/getWindowSize.js";
import { ThumbDown } from "@material-ui/icons";
import ResultSlide from "../components/slides/ResultSlide";

// Lazy loading
const Header = lazy(() => import("../containers/Header"));

const Boiler = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [starAmount, setStarAmount] = useState(0);
  const [showThumbsDown, setShowThumbsDown] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [confettiRecycle, setconfettiRecycle] = useState(true);
  const [confettiRun, setconfettiRun] = useState(false);

  const windowSize = getWindowSize();

  const increaseStarAmount = (inc) => {
    let prevAmount = Number(starAmount);
    let newAmount = Number(starAmount) + Number(inc);
    setStarAmount(newAmount);
    // No score increase? Show thumbs down
    if (prevAmount === newAmount) {
      setShowThumbsDown(true);
    }
  };

  const resetQuizData = () => {
    setCurrentQuestionIndex(0);
    setIsFinished(false);
  };

  return (
    <Suspense fallback={<Loading />}>
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        run={confettiRun}
        recycle={confettiRecycle}
        confettiSource={{ x: windowSize.width / 2, y: 55 }}
        initialVelocityX={3}
        initialVelocityY={1}
      />
      <ThumbsDown
        showThumbsDown={showThumbsDown}
        setShowThumbsDown={setShowThumbsDown}
      />
      <div
        style={{
          background: PURPLE,
          height: HEIGHT === 0 ? "100vh" : HEIGHT,
          transition: "0.13s",
          position: "relative",
          display: "grid",
          gridTemplateRows: "min-content 1fr",
          justifyItems: "stretch",
          alignItems: "stretch",
        }}
        id="bgd-container"
      >
        <Header
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={totalQuestions}
          isFinished={isFinished}
          starAmount={starAmount}
        />
        <Switch>
          <Route
            path="/"
            exact
            render={() => {
              resetQuizData();
              return <Welcome />;
            }}
          />
          <Route
            path="/test"
            render={() => (
              <TestSlides
                setCurrentQuestionIndex={setCurrentQuestionIndex}
                setTotalQuestions={setTotalQuestions}
                setIsFinished={setIsFinished}
                setconfettiRecycle={setconfettiRecycle}
                setconfettiRun={setconfettiRun}
                increaseStarAmount={increaseStarAmount}
                starAmount={starAmount}
              />
            )}
          />
          <Route path="/devresult" render={(props) => <ResultSlide />} />

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
