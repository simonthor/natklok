// Third party
import React from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";

// Custom
import StyledButton from "components/general/StyledButton";
import Logo from "components/general/Logo";
import BackgroundOrbs from "components/features/BackgroundOrbs";

import SocialShare from "components/features/SocialShare";

import "keyframes.css";
import Subtitle from "components/general/typeography/Subtitle";

const Welcome = ({ t, hasStarted }) => {
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
    </>
  );
};

export default withTranslation("common")(Welcome);
