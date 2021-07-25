// Third party
import React, { Suspense, lazy, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
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
  return (
    <Suspense fallback={<Loading />}>
      <div style={{ 
        background: PURPLE,
        height: ((HEIGHT === 0) ? "100vh" : HEIGHT),
        transition: "0.13s",
        position: "relative"
      }}
      id="bgd-container">
        <Switch>
          <Route path="/" exact render={() => <Welcome />} />
          <Route path="/test" exact render={() => <TestSlides updateFooterCount={updateFooterCount} setFooterTotal={setFooterTotal} setFinishedStatus={setFinishedStatus} />} />
          <Route render={(props) => <Redirect to="/" />} />
        </Switch>
        <Footer currentQuestion={footerCount} totalQuestions={footerTotal} isFinished={finishedStatus}/>
      </div>
    </Suspense>
  );
};

export default Boiler;
