// Third party
import React, {useRef, useEffect, useState} from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";

// Custom
import { StyledButton } from "../components/general";
import { BLUE, PURPLE, WHITE, HEIGHT } from "../util/constants";
import Mainlogo from "../assets/sakerhetskontrollen-logo.svg";
import ListOfReviews from "../components/features/ListOfReviews";
import keyframes from "../keyframes.css";
import SocialShare from "../components/features/SocialShare";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Welcome = ({ t, hasStarted }) => {
  const bgdRef = useRef(null);
  const [aboutExpanded, setaboutExpanded] = useState(false);
  const toggleExpand = () => setaboutExpanded(!aboutExpanded);

  useEffect(() => {
    const bgdObj = bgdRef.current;

    function generateBgd() {
      let nBlobs = window.innerWidth < 576 ? 3 : 5;
      let height = (HEIGHT === 0) ? window.innerHeight : HEIGHT;
      let width = window.innerWidth;

      for (let i = 0; i < nBlobs; i++) {
        let diam = Math.floor(Math.random() * 90 + 90);
        let posX = Math.floor(Math.random() * (width - (diam * 2)) + diam);
        let posY = Math.floor(Math.random() * (height - (diam * 2)) + diam);
        var blob = document.createElement("div");
        if (i % 2 == 0) {
          blob.style.cssText = `width:${diam}px;height:${diam}px;position:absolute;top:${posY}px;left:${posX}px;background:radial-gradient(58.66% 58.66% at 77.37% 78.77%, #84256F 0%, #E2147E 100%);border-radius:100%;z-index:0;animation: blobsExpand 8s infinite alternate;animation-delay: ${i}s;`
        } else {
          blob.style.cssText = `width:${diam}px;height:${diam}px;position:absolute;top:${posY}px;left:${posX}px;background: radial-gradient(58.66% 58.66% at 77.37% 78.77%, #0F5073 0%, #1D78AA 100%);;border-radius:100%;z-index:0;animation: blobsExpand 8s infinite alternate;animation-delay: ${i}s;`
        }
        bgdObj.appendChild(blob);
      }
    };
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
        height: "100%"
      }}
      id="hoverColorEffect"
      ref={bgdRef}
    >
      <Grid item
        xs={11}
        style={{
          textAlign: "center",
          zIndex: "5",
        }}>
         <div style={{width:"40vw",margin: "0 auto"}}>
            <img 
              style={{position: "relative", width: "100%", height: "100%"}}
              alt="Säkerhetskontrollen"
              src={Mainlogo}
            />
          </div>
          <p style={{fontWeight: "700",fontSize: "1.5em"}}>{t("welcome.desc")}</p>
          <Link to="/test">
            <StyledButton cinematicColor="#212058">{t("welcome.test")}</StyledButton>
          </Link>
          <SocialShare shareText="Dela detta test"/>
      </Grid>
    </Grid>
    <Grid container>
      <Grid item
        xs={12}
        style={{
          background: WHITE,
          color: PURPLE,
          position: "relative",
          transititon: "height 0.5s",
          height: aboutExpanded ? "auto" : 130,
          overflow: "hidden",
        }}>
        <div style={{
          textAlign: "center",
          background: "rgba(0,0,0,0.05)",
          padding: 8,
          cursor: "pointer"
        }}
        onClick={toggleExpand}>
          {aboutExpanded ? (<ExpandMoreIcon style={{marginBottom: -5}}/>) : (<ExpandLessIcon style={{marginBottom: -5}}/>)}
        </div>
        <div style={{
          padding: "10px 20px 20px 20px",
        }}>
          <h2>Om testet</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ipsum ipsum, fringilla ut ultricies at, maximus vitae dui. Nam commodo porttitor urna imperdiet imperdiet. Vestibulum pharetra pellentesque lobortis. In pulvinar dolor et convallis dignissim. Donec nec odio risus. Fusce auctor volutpat nibh, ac laoreet dui hendrerit vitae.</p>
          <p>Nulla ultricies tellus nunc, et accumsan mauris congue quis. Quisque iaculis nulla vel ex dapibus auctor. Suspendisse augue libero, varius vitae pharetra et, consequat vel dui. Sed condimentum nisi tincidunt diam luctus, nec facilisis erat sollicitudin.</p>
        </div>
      </Grid>
    </Grid>
    </>
  );
};

export default withTranslation("common")(Welcome);
