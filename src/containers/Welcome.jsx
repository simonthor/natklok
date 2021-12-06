// Third party
import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";

// Custom
import StyledButton from "components//StyledButton";
import Logo from "components//Logo";
import BackgroundOrbs from "features/BackgroundOrbs";

import SocialShare from "features/SocialShare";

import "keyframes.css";
import Subtitle from "components/typeography/Subtitle";
import ProgressionDisplay from "features/ProgressionDisplay";
import { getStoredTotalAmount } from "util/totalScore";

const Welcome = ({ t, hasStarted, redoTest }) => {
  const [amountCorrectQuestions] = useState(getStoredTotalAmount());
  const hasGotAtleastOneCorrect = amountCorrectQuestions !== 0;

  return (
    <>
      <BackgroundOrbs />
      <Grid
        container
        alignContent="stretch"
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          position: "relative",
          width: "100%",
          marginTop: window.innerWidth > 600 ? "10vh" : 0,
          overflow: "hidden",
        }}
        id="hoverColorEffect"
      >
        <Grid
          item
          style={{
            textAlign: "center",
            zIndex: "5",
            marginTop: "10vh",
            width: "100%",
          }}
        >
          <Logo />
          <Subtitle
            style={{
              marginBottom: "2em",
              fontSize: window.innerWidth < 576 ? 16 : 24,
              marginTop: window.innerWidth < 576 ? -8 : -14,
              fontWeight: 400,
              opacity: 0.8,
            }}
          >
            {t("welcome.desc")}
          </Subtitle>
          <Link to="/test">
            <StyledButton
              cinematicColor="#212058"
              caps
              style={{
                boxShadow: "0px 0px 8px 8px rgba(33, 32, 88, 0.2)",
                paddingLeft: 32,
                paddingRight: 32,
              }}
            >
              {hasStarted ? t("welcome.continueTest") : t("welcome.test")}
            </StyledButton>
          </Link>
          <SocialShare shareText={t("general.shareTest")} />
        </Grid>
      </Grid>
      {hasGotAtleastOneCorrect && (
        <ProgressionDisplay redoTest={redoTest} fadeInAfter={500} />
      )}
    </>
  );
};

export default withTranslation("common")(Welcome);
