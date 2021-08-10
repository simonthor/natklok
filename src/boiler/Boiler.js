// Third party
import React, { Suspense, lazy, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Confetti from "react-confetti";
// Custom components
import { Loading } from "../components/general";
import TestSlides from "../containers/TestSlides";
import Welcome from "../containers/Welcome";
import { PURPLE, HEIGHT } from "../util/constants";
import getWindowSize from "../util/getWindowSize.js";

// Lazy loading
const Header = lazy(() => import("../containers/Header"));
const Footer = lazy(() => import("../containers/Footer"));

const Boiler = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [confettiRecycle, setconfettiRecycle] = useState(true);
  const [confettiRun, setconfettiRun] = useState(false);
  const windowSize = getWindowSize();

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
        />
        <Switch>
          <Route path="/" exact render={() => <Welcome />} />
          <Route
            path="/test"
            exact
            render={() => (
              <TestSlides
                setCurrentQuestionIndex={setCurrentQuestionIndex}
                setTotalQuestions={setTotalQuestions}
                setIsFinished={setIsFinished}
                setconfettiRecycle={setconfettiRecycle}
                setconfettiRun={setconfettiRun}
              />
            )}
          />
          <Route render={(props) => <Redirect to="/" />} />
        </Switch>
      </div>
    </Suspense>
  );
};

export default Boiler;
