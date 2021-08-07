// Third party
import React, { Suspense, lazy, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Confetti from 'react-confetti';
// Custom components
import { Loading } from "../components/general";
import TestSlides from "../containers/TestSlides";
import Welcome from "../containers/Welcome";
import { PURPLE, HEIGHT } from "../util/constants";
// Lazy loading
const Header = lazy(() => import("../containers/Header"));
const Footer = lazy(() => import("../containers/Footer"));

const Boiler = () => {
  const [footerCount, updateFooterCount] = useState(0);
  const [footerTotal, setFooterTotal] = useState(0);
  const [finishedStatus, setFinishedStatus] = useState(false);
  const [confettiRecycle, setconfettiRecycle] = useState(true);
  const [confettiRun, setconfettiRun] = useState(false);
  const width = window.innerWidth;
  const height = window.innerHeight;
  return (
    <Suspense fallback={<Loading />}>
      <Confetti
          width={width}
          height={height}
          run={confettiRun}
          recycle={confettiRecycle}
          confettiSource={{x: 400, y: 200}}
          initialVelocityX={6}
          initialVelocityY={8}
        />
      <div style={{ 
        background: PURPLE,
        height: ((HEIGHT === 0) ? "100vh" : HEIGHT),
        transition: "0.13s",
        position: "relative",
        display: "grid",
        gridTemplateRows: "min-content 1fr",
        justifyItems: "stretch",
        alignItems: "stretch",
      }}
      id="bgd-container">
        <Header/>
        <Switch>
          <Route path="/" exact render={() => <Welcome />} />
          <Route path="/test" exact render={() => <TestSlides updateFooterCount={updateFooterCount} setFooterTotal={setFooterTotal} setFinishedStatus={setFinishedStatus} setconfettiRecycle={setconfettiRecycle} setconfettiRun={setconfettiRun} />} />
          <Route render={(props) => <Redirect to="/" />} />
        </Switch>
        {/*<Footer currentQuestion={footerCount} totalQuestions={footerTotal} isFinished={finishedStatus}/>*/}
      </div>
    </Suspense>
  );
};

export default Boiler;
