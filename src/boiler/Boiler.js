// Third party
import React, { Suspense, lazy } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
// Custom components
import { Loading } from "../components/general";
import TestSlides from "../containers/TestSlides";
import Welcome from "../containers/Welcome";
import { PURPLE } from "../util/constants";
// Lazy loading
const Header = lazy(() => import("../containers/Header"));
const Footer = lazy(() => import("../containers/Footer"));

const Boiler = () => (
  <Suspense fallback={<Loading fullScreen />}>
    <div style={{ background: PURPLE }}>
      <Header />
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
