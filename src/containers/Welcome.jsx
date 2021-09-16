// Third party
import React, { useRef, useEffect } from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";

// Custom
import { StyledButton } from "components/general";
import { HEIGHT } from "util/constants";
import Mainlogo from "assets/sakerhetskontrollen-logo.svg";
import SocialShare from "components/features/SocialShare";
import MoreInfoModal from "components/features/MoreInfoModal";

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
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          height: "100%",
        }}
        id="hoverColorEffect"
        ref={bgdRef}
      >
        <Grid
          item
          xs={11}
          style={{
            textAlign: "center",
            zIndex: "5",
          }}
        >
          <div style={{ width: "40vw", margin: "0 auto" }}>
            <img
              style={{ position: "relative", width: "100%", height: "100%" }}
              alt="Säkerhetskontrollen"
              src={Mainlogo}
            />
          </div>
          <p style={{ fontWeight: "700", fontSize: "1.5em" }}>
            {t("welcome.desc")}
          </p>
          <Link to="/test">
            <StyledButton cinematicColor="#212058">
              {t("welcome.test")}
            </StyledButton>
          </Link>
          <SocialShare shareText={t("general.shareTest")} />
        </Grid>
      </Grid>
      <MoreInfoModal
        title={t("welcome.aboutTitle")}
        content={t("welcome.aboutContent")}
      />
    </>
  );
};

export default withTranslation("common")(Welcome);
