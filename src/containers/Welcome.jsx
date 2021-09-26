// Third party
import React, { useRef, useEffect } from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";

// Custom
import StyledButton from "components/general/StyledButton";
import Logo from "components/general/Logo";

import { HEIGHT } from "util/constants";
import SocialShare from "components/features/SocialShare";
import MoreInfoDisplay from "components/features/MoreInfoDisplay";

import "keyframes.css";

const Welcome = ({ t, hasStarted }) => {
  const bgdRef = useRef(null);

  useEffect(() => {
    const bgdObj = bgdRef.current;

    function generateBgd() {
      let nBlobs = window.innerWidth < 576 ? 3 : 5;
      let height = HEIGHT === 0 ? window.innerHeight : HEIGHT;
      let width = window.innerWidth;

      for (let i = 0; i < nBlobs; i++) {
        let diam = Math.floor(Math.random() * 90 + 90);
        let posX = Math.floor(Math.random() * (width - diam * 2) + diam);
        let posY = Math.floor(Math.random() * (height - diam * 2) + diam);
        var blob = document.createElement("div");
        if (i % 2 === 0) {
          blob.style.cssText = `width:${diam}px;height:${diam}px;position:absolute;top:${posY}px;left:${posX}px;background:radial-gradient(58.66% 58.66% at 77.37% 78.77%, #84256F 0%, #E2147E 100%);border-radius:100%;z-index:0;animation: blobsExpand 8s infinite alternate;animation-delay: ${i}s;`;
        } else {
          blob.style.cssText = `width:${diam}px;height:${diam}px;position:absolute;top:${posY}px;left:${posX}px;background: radial-gradient(58.66% 58.66% at 77.37% 78.77%, #0F5073 0%, #1D78AA 100%);;border-radius:100%;z-index:0;animation: blobsExpand 8s infinite alternate;animation-delay: ${i}s;`;
        }
        bgdObj.appendChild(blob);
      }
    }
    generateBgd();
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
          justifyContent: "center",
          position: "relative",
          height: "100%",
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
          <p
            style={{
              fontWeight: "700",
              margin: "0 0 2em 0",
              fontSize: "1.5em",
            }}
          >
            {t("welcome.desc")}
          </p>
          <Link to="/test">
            <StyledButton cinematicColor="#212058">
              {hasStarted ? t("welcome.continueTest") : t("welcome.test")}
            </StyledButton>
          </Link>
          <SocialShare shareText={t("general.shareTest")} />
          <MoreInfoDisplay
            title={t("welcome.aboutTitle")}
            content={t("welcome.aboutContent")}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default withTranslation("common")(Welcome);
