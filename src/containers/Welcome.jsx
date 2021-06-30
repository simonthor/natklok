// Third party
import React, {useRef, useEffect} from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";

// Custom
import { StyledButton } from "../components/general";
import { PURPLE, HEIGHT } from "../util/constants";
import Mainlogo from "../assets/sakerhetskontrollen-logo.svg";
import DUlogo from "../assets/duLogo.svg";
import ListOfReviews from "../components/features/ListOfReviews";

const Welcome = ({ t }) => {
  const bgdRef = useRef(null);

  useEffect(() => {
    const bgdObj = bgdRef.current;

    function GenerateBgd() {
      let nBlobs = window.innerWidth < 576 ? 3 : 5;
      let height = (HEIGHT === 0) ? window.innerHeight : HEIGHT;
      let width = window.innerWidth;

      for (let i = 0; i < nBlobs; i++) {
        let diam = Math.floor(Math.random() * 90 + 90);
        let posX = Math.floor(Math.random() * (width - (diam * 2)) + diam);
        let posY = Math.floor(Math.random() * (height - (diam * 2)) + diam);
        var blob = document.createElement("div");
        if (i % 2 == 0) {
          blob.style.cssText = `width:${diam}px;height:${diam}px;position:absolute;top:${posY}px;left:${posX}px;background:radial-gradient(58.66% 58.66% at 77.37% 78.77%, #84256F 0%, #E2147E 100%);border-radius:100%;z-index:0;`
        } else {
          blob.style.cssText = `width:${diam}px;height:${diam}px;position:absolute;top:${posY}px;left:${posX}px;background: radial-gradient(58.66% 58.66% at 77.37% 78.77%, #0F5073 0%, #1D78AA 100%);;border-radius:100%;z-index:0;`
        }
        bgdObj.appendChild(blob);
      }
    };
    GenerateBgd();
  }, [bgdRef]);
  return (
    <Grid
      container
      alignContent="stretch"
      style={{height: "100%"}}
    >
      <Grid item
        style={{
          background: PURPLE,
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          height: "100%"
        }}
        lg="12"
        md="12"
        sm="12"
        ref={bgdRef}
      >
        <div
          style={{
            textAlign: "center",
            width: "100%",
            position: "relative",
            zIndex: 5
          }}
        >
          <div style={{width:571,height:207,margin: "0 auto"}}>
            <img 
              style={{position: "relative", width: "100%", height: "100%"}}
              alt="Säkerhetskontrollen"
              src={Mainlogo}
            />
          </div>
          <p style={{fontWeight: "700",fontSize: "1.5em"}}>{t("welcome.desc")}</p>
          <p style={{ fontSize: "0.8em", marginBottom: 2 }}>
            {t("general.madeByDU")}
          </p>
          <div
            style={{
              width: 150,
              height: 40,
              margin: "0 auto",
              marginBottom: 30,
              opacity: "0.5",
            }}
          >
            <img
              style={{ position: "relative", width: "100%", height: "100%" }}
              alt=""
              src={DUlogo}
            />
          </div>
          <Link to="/test">
            <StyledButton>{t("welcome.test")}</StyledButton>
            <div></div>
          </Link>
        </div>
      </Grid>
      <Grid item 
        style={{backgroundColor: "red",position:"relative"}}
        lg="2"
        md="0"
        sm="0">
          <div style={{position:"absolute",width:"100%",height: "30%",top:0,left:0,zIndex: 5,background:"linear-gradient(rgb(34,34,107),rgb(34,34,107) 40%,rgba(34,34,107,0))"}}></div>
          <div style={{position:"absolute",width:"100%",height: "30%",bottom:0,left:0,zIndex: 5,background:"linear-gradient(0deg,rgb(34,34,107),rgb(34,34,107) 40%,rgba(34,34,107,0))"}}></div>
          <ListOfReviews/>
      </Grid>
    </Grid>
  );
};

export default withTranslation("common")(Welcome);
