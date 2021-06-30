// Third party
import React, { Suspense, lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
// Custom components
import { Loading } from "../components/general";
import TestSlides from "../containers/TestSlides";
import Welcome from "../containers/Welcome";
import { PURPLE, HEIGHT } from "../util/constants";
// Lazy loading
const Header = lazy(() => import("../containers/Header"));
const Footer = lazy(() => import("../containers/Footer"));

const Boiler = () => (
  <Suspense fallback={<Loading />}>
    <div style={{ 
      background: PURPLE,
      height: ((HEIGHT === 0) ? "100vh" : HEIGHT),
      display: "grid",
      gridTemplateRows: "1fr min-content",
      transition: "0.13s"
     }}
     id="bgd-container">
      <Switch>
        <Route path="/" exact render={() => <Welcome />} />
        <Route path="/test" exact render={() => <TestSlides />} />
        <Route render={(props) => <Redirect to="/" />} />
      </Switch>
      <Footer />
    </div>
  </Suspense>
);

export default Boiler;
