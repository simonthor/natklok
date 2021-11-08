// Third party
import React, { useRef, useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";

// Custom
import StyledButton from "components/general/StyledButton";
import Logo from "components/general/Logo";

import { HEIGHT, LIGHT_BLUE, PINK } from "util/constants";
import SocialShare from "components/features/SocialShare";

import "keyframes.css";
import Subtitle from "components/general/typeography/Subtitle";

const Welcome = ({ t, hasStarted }) => {
  const bgdRef = useRef(null);
  const [generatedOnce, setGeneratedOnce] = useState(false);

  useEffect(() => {
    if (generatedOnce === false) {
      setGeneratedOnce(true);
      const bgdObj = bgdRef.current;

      function generateBgd() {
        let nBlobs = window.innerWidth < 576 ? 3 : 5;
        let blobInfo = [
          { x: "15%", y: "20%", diam: 70 },
          { x: "15%", y: "60%", diam: 150 },
          { x: "85%", y: "40%", diam: 100 },
        ];
        for (let i = 0; i < blobInfo.length; i++) {
          let color = i % 2 === 0 ? PINK : LIGHT_BLUE;
          let shade = i % 2 === 0 ? "#e892d5" : "#9fe0f5";
          var yPos =
            "calc(" + blobInfo[i].y + " - " + blobInfo[i].diam / 2 + "px)";
          var xPos =
            "calc(" + blobInfo[i].x + " - " + blobInfo[i].diam / 2 + "px)";
          var blob = document.createElement("div");
          blob.style.cssText = `width:${blobInfo[i].diam}px;height:${
            blobInfo[i].diam
          }px;position:absolute;top:${yPos};left:${xPos};background:radial-gradient(58.66% 58.66% at 77.37% 78.77%, ${shade} 0%, ${color} 100%);border-radius:100%;z-index:0;animation: blobsExpand 8s infinite alternate;animation-delay: ${
            i * 2
          }s;`;
          bgdObj.appendChild(blob);
        }
      }
      generateBgd();
    }
  }, [bgdRef]);

  return (
    <>
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
        ref={bgdRef}
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
