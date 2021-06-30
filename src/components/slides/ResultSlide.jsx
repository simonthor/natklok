import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";

// Custom components
import { AlignCenter, Fade } from "../general";

import gauge_img from "../../assets/gauge.png";
import pointer_img from "../../assets/pointer.png";
import StyledLink from "../general/StyledLink";
import { Facebook, Instagram, Twitter } from "@material-ui/icons";

const clamp = (value, max) => {
  if (value > max) {
    return max;
  }
  return value;
};

const getResultText = (t, score, maxScore) => {
  let title = "";
  let desc = "";
  let percentCorrect = score / maxScore;

  if (percentCorrect > 0.8) {
    title = t("result.firstPlaceTitle");
    desc = t("result.firstPlaceDesc");
  } else if (percentCorrect > 0.4) {
    title = t("result.secondPlaceTitle");
    desc = t("result.secondPlaceDesc");
  } else {
    title = t("result.thirdPlaceTitle");
    desc = t("result.thirdPlaceDesc");
  }

  return { title, desc };
};

const ResultSlide = ({ t, score, maxScore, testFinished }) => {
  const [rotation, setRotation] = useState(-120);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [animationDone, setAnimationDone] = useState(false);
  const animationTime = 10 * (score / maxScore);
  const timeoutStep = 0.1;
  const resultTextObj = getResultText(t, score, maxScore);

  useEffect(() => {
    setTimeout(() => {
      if (testFinished === true && animationDone === false) {
        setElapsedTime(elapsedTime + timeoutStep);

        let target_rot = (score / maxScore) * 220;
        let new_rot = target_rot * (elapsedTime / animationTime);
        setRotation(new_rot - 120);

        if (elapsedTime > animationTime) {
          setAnimationDone(true);
        }
      }
    }, timeoutStep * 100);
  }, [
    animationDone,
    animationTime,
    elapsedTime,
    maxScore,
    score,
    testFinished,
  ]);

  return (
    <AlignCenter>
      <Grid
        item
        xs={12}
        sm={6}
        style={{ textAlign: "center", paddingRight: 10,overflow: "hidden" }}
        container
        direction="column"
      >
        <div
          style={{
            height: 250,
            width: "100%",
            position: "relative",
          }}
        >
          <img
            style={{ position: "absolute", top: 0, left: "10%" }}
            alt=""
            src={gauge_img}
          />
          <img
            style={{
              position: "absolute",
              top: 20,
              left: "10%",
              transform: "rotate(" + rotation + "deg)",
            }}
            alt=""
            src={pointer_img}
          />
        </div>
        <p style={{ margin: 8, opacity: 0.7 }}>{t("result.yourScore")}</p>
        <h1 style={{ margin: 0 }}>
          {clamp(
            Number((score * elapsedTime) / animationTime).toFixed(1),
            maxScore
          )}
          <span style={{ fontSize: "0.6em", opacity: 0.7 }}> /{maxScore}</span>
        </h1>
        {animationDone ? (
          <Fade>
            <h2 style={{ margin: 2 }}>{resultTextObj.title}</h2>
            <p style={{ margin: 2 }}>{resultTextObj.desc}</p>
          </Fade>
        ) : null}
      </Grid>
      <Grid item xs={12} sm={6} style={{ paddingLeft: 10 }}>
        {animationDone ? (
          <Fade>
            <h3>Viktigt att du övar mer på:</h3>
            <ReadMore
              emoji="🔒"
              title="Lösenord"
              desc="Att få sitt lösenord kapat är ett av de vanligaste och mest förödande sakerna som kan hämta online. Du måste ha bättre koll på lösenord."
            />
            <ReadMore
              emoji="📶"
              title="VPN"
              desc="VPN:er är mycket användbara för många saker, men det löser inte alla ens säkerhetsproblem..."
            />
            <h3>Dela ditt resultat:</h3>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <ShareLink icon={<Instagram style={{ fontSize: 32 }} />} />
              <ShareLink icon={<Facebook style={{ fontSize: 32 }} />} />
              <ShareLink icon={<Twitter style={{ fontSize: 32 }} />} />
            </div>
          </Fade>
        ) : null}
      </Grid>
    </AlignCenter>
  );
};

const ShareLink = ({ icon }) => (
  <div
    style={{
      cursor: "pointer",
      display: "inline-block",
      verticalAlign: "middle",
      color: "white",
      fontSize: 30,
      marginRight: 8,
    }}
  >
    {icon}
  </div>
);

const ReadMore = ({ emoji, title, desc }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        border: "1px solid white",
        borderRadius: 4,
        width: "100%",
        padding: 10,
        margin: 10,
      }}
    >
      <span style={{ fontSize: 32, marginRight: 6 }}>{emoji}</span>
      <div>
        <p style={{ fontWeight: 600, margin: "0 0 4px 0" }}>{title}</p>
        <p style={{ margin: "0 0 4px 0" }}>{desc}</p>
        <StyledLink colored style={{ margin: 0 }}>
          Läs mer här
        </StyledLink>
      </div>
    </div>
  );
};

export default withTranslation("common")(ResultSlide);
