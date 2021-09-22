import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";

// Custom components
import AlignCenter from 'components/general/AlignCenter'
import Fade from 'components/general/Fade'
import StyledButton from 'components/general/StyledButton'
import StyledLink from "components/general/StyledLink";
import { Facebook, Instagram, Star, Twitter } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { BLUE } from "util/constants";

const getResultText = (t, starAmount, maxStarAmount) => {
  let title = "";
  let desc = "";
  let percentCorrect = starAmount / maxStarAmount;

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

const ResultSlide = ({
  t,
  starAmount = 12,
  maxStarAmount = 12,
  testFinished = true,
}) => {
  const resultTextObj = getResultText(t, starAmount, maxStarAmount);
  const starAnimationTimeMS = 400 * maxStarAmount;
  const achievedStars = [];
  for (let i = 0; i < maxStarAmount; i++) {
    let achieved = starAmount > i;
    achievedStars.push(achieved);
  }

  return (
    <AlignCenter marginTop={false} withMaxWidth style={{ width: "100vw" }}>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h1
          style={{
            margin: 8,
            fontFamily: "Bowlby One SC, Arial, Helvetica, sans-serif",
          }}
        >
          {t("result.yourScore")}
        </h1>
        <div
          style={{
            background: "rgba(255,255,255,0.2)",
            borderRadius: 10,
            padding: 2,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {achievedStars.map((val, index) => (
            <ResultStar
              unlocked={val}
              index={index}
              starAmount={starAmount}
              starAnimationTimeMS={starAnimationTimeMS}
              testFinished={testFinished}
            />
          ))}
        </div>
        <Fade delay={starAnimationTimeMS}>
          <div style={{ marginTop: 32 }}>
            <p
              style={{
                fontSize: "0.9em",
                margin: 0,
                opacity: 0.6,
                fontWeight: 600,
              }}
            >
              {starAmount + " / " + maxStarAmount + " " + t("result.correct")}
            </p>
            <h2 style={{ margin: "6px 0" }}>{resultTextObj.title}</h2>
            <p style={{ margin: "6px 0" }}>{resultTextObj.desc}</p>
            <Link to="/test">
              <StyledButton style={{ margin: "8px 0" }}>
                {t("result.redo")}
              </StyledButton>
            </Link>
          </div>
        </Fade>
        <Fade delay={starAnimationTimeMS + 2000}>
          <div style={{ margin: "12px 0" }}>
            <h3 style={{ marginBottom: 2 }}>Dina svagheter</h3>
            <Grid container>
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
            </Grid>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  fontSize: "0.85em",
                  margin: "18px 0 4px 0",
                  opacity: 0.6,
                }}
              >
                {t("result.share")}!
              </p>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <ShareLink icon={<Instagram style={{ fontSize: 28 }} />} />
                <ShareLink icon={<Facebook style={{ fontSize: 28 }} />} />
                <ShareLink icon={<Twitter style={{ fontSize: 28 }} />} />
              </div>
            </div>
          </div>
        </Fade>
      </div>
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
    <Grid
      item
      style={{
        margin: "6px 0",
        padding: "6px 12px 12px 12px",
        background: "white",
        borderRadius: 6,
      }}
    >
      <div>
        <p style={{ color: "black", fontWeight: 600, margin: "0 0 6px 0" }}>
          <span style={{ marginRight: 6 }}>{emoji}</span>
          {title}
        </p>
        <p style={{ color: "grey", margin: "0 0 6px 0", opacity: 0.8 }}>
          {desc}
        </p>
        <StyledLink style={{ color: BLUE, margin: 0 }}>
          Tryck här för att läsa mer
        </StyledLink>
      </div>
    </Grid>
  );
};

const ResultStar = ({
  unlocked,
  index,
  starAmount,
  starAnimationTimeMS,
  testFinished,
}) => {
  // Star values
  const [scale, setScale] = useState(1);
  const [left, setLeft] = useState(window.innerWidth / 2);
  const [top, setTop] = useState("40vh");
  const [transition, setTransition] = useState("");
  const [opacity, setOpacity] = useState(0);
  const id = "resultStar" + index;
  const flyAnimTime = 800;
  const timeUntilStartAnim =
    100 + (Number(index) / Number(starAmount)) * starAnimationTimeMS;

  // Start the animation on mounted
  useEffect(() => {
    if (unlocked === true && testFinished === true) {
      console.log("starting animation");
      setTimeout(function () {
        console.log("first");

        const starAmountIcon = document.getElementById("starAmountIcon");
        const starAmountIconRect = starAmountIcon.getBoundingClientRect();
        setScale(1);
        setOpacity(1);
        setLeft(starAmountIconRect.left);
        setTop(starAmountIconRect.top);

        setTimeout(function () {
          console.log("second");
          const resultStar = document.getElementById(id);
          const resultStarRect = resultStar.getBoundingClientRect();

          setTransition(
            "transform 1s cubic-bezier(.03,1.9,.63,1.95), left 1s cubic-bezier(.04,1.31,.71,1.05), top 1s ease-in-out"
          );
          setLeft(resultStarRect.left);
          setTop(resultStarRect.top);
          setScale(1.1);
        }, flyAnimTime);
      }, timeUntilStartAnim);
    }
  }, [
    id,
    index,
    starAnimationTimeMS,
    testFinished,
    timeUntilStartAnim,
    unlocked,
  ]);

  return (
    <div key={index} id={id}>
      {unlocked && (
        <div
          style={{
            transition: transition,
            position: "absolute",
            transform: "scale(" + scale + ")",
            left,
            top,
            opacity,
          }}
        >
          <Star style={{ color: "yellow" }} />
        </div>
      )}
      <Star style={{ color: "grey" }} />
    </div>
  );
};

export default withTranslation("common")(ResultSlide);
