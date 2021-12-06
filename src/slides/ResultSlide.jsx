import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import Grid from "@material-ui/core/Grid";

// Custom components
import AlignCenter from "components/AlignCenter";
import Fade from "components//Fade";
import StyledButton from "components//StyledButton";
import StyledLink from "components//StyledLink";
//import { Facebook, Instagram, Star, Twitter } from "@material-ui/icons";
import Star from "@material-ui/icons/Star";
import { BLUE, PALEBLUE } from "util/constants";
import Title from "components/typeography/Title";
import Subtitle from "components/typeography/Subtitle";
import SmallText from "components/typeography/SmallText";
import SocialShare from "features/SocialShare";
import ProgressionDisplay from "features/ProgressionDisplay";

const getResultText = (t, starAmount, maxStarAmount) => {
  let title = "";
  let desc = "";
  let extraTitle = "";
  let extraDesc = "";
  let percentCorrect = starAmount / maxStarAmount;

  if (percentCorrect >= 0.8) {
    title = t("result.firstPlaceTitle");
    desc = t("result.firstPlaceDesc");
  } else if (percentCorrect >= 0.5) {
    title = t("result.secondPlaceTitle");
    desc = t("result.secondPlaceDesc");
  } else if (percentCorrect >= 0.3) {
    title = t("result.thirdPlaceTitle");
    desc = t("result.thirdPlaceDesc");
  } else {
    title = t("result.forthPlaceTitle");
    desc = t("result.forthPlaceDesc");
  }

  return { title, desc, extraDesc, extraTitle };
};

const ResultSlide = ({
  t,
  starAmount = 1,
  maxStarAmount = 12,
  testFinished = true,
  redoTest,
}) => {
  const resultTextObj = getResultText(t, starAmount, maxStarAmount);
  const starAnimationTimeMS = 310 * maxStarAmount;
  const achievedStars = [];
  for (let i = 0; i < maxStarAmount; i++) {
    let achieved = starAmount > i;
    achievedStars.push(achieved);
  }

  return (
    <>
      <AlignCenter withMaxWidth style={{ width: "100vw" }}>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Title>{t("result.yourScore")}</Title>
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Grid
              container
              style={{
                background: "rgba(255,255,255,0.2)",
                borderRadius: 10,
                maxWidth: "100%",
                padding: 2,
                display: "flex",
                justifyContent: "center",
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
            </Grid>
          </div>

          <Fade delay={starAnimationTimeMS}>
            <div style={{ marginTop: 32, textAlign: "center" }}>
              <SmallText
                opacity
                style={{
                  margin: 0,
                  fontWeight: 600,
                }}
              >
                {starAmount + " / " + maxStarAmount + " " + t("result.correct")}
              </SmallText>
              <Subtitle style={{ margin: "6px 0" }}>
                {resultTextObj.title}
              </Subtitle>
              <p style={{ margin: "6px 0" }}>{resultTextObj.desc}</p>
              <Grid
                container
                style={{
                  width: "100%",
                  marginTop: 12,
                }}
                spacing={1}
              >
                <Grid item xs={12} sm={6}>
                  <StyledButton
                    onClick={() => {
                      redoTest(false);
                    }}
                    style={{ width: "100%" }}
                  >
                    {t("result.redo")}
                  </StyledButton>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <StyledLink
                    rel=""
                    target="_self"
                    href="https://sakerhetskollen.se/"
                  >
                    <StyledButton
                      style={{
                        margin: 0,
                        width: "100%",
                        padding: "14px 14px",
                        background: PALEBLUE,
                      }}
                    >
                      Tillbaka till säkerhetskollen
                    </StyledButton>
                  </StyledLink>
                </Grid>
                <div style={{ width: "100%", textAlign: "center" }}>
                  <SocialShare shareText={t("general.shareTest")} />
                </div>

                {/* 
                <StyledLink href="https://sakerhetskollen.typeform.com/to/StcP4PFK">
                  <StyledButton style={{ margin: "8px 0", background: PALEBLUE }}>
                    Ge feedback här!
                  </StyledButton>
                </StyledLink>
              */}
              </Grid>
            </div>
          </Fade>
        </div>
      </AlignCenter>
      <ProgressionDisplay
        redoTest={redoTest}
        fadeInAfter={starAnimationTimeMS + 2000}
      />
    </>
  );
};

/*

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
*/

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
        <p style={{ color: "grey", margin: "0 0 6px 0", opacity: 0.6 }}>
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
  const [staticStarColor, setStaticStarColor] = useState("grey");
  const id = "resultStar" + index;
  const flyAnimTime = 800;
  const timeUntilStartAnim =
    100 + (Number(index) / Number(starAmount)) * starAnimationTimeMS;

  // Start the animation on mounted
  useEffect(() => {
    if (unlocked === true && testFinished === true) {
      const starAmountIcon = document.getElementById("starAmountIcon");
      if (starAmountIcon != null) {
        const starAmountIconRect = starAmountIcon.getBoundingClientRect();
        setScale(1);
        setOpacity(1);
        setLeft(starAmountIconRect.left);
        setTop(starAmountIconRect.top);

        // Start the flying animation
        setTimeout(function () {
          const resultStar = document.getElementById(id);
          const resultStarRect = resultStar.getBoundingClientRect();

          setTransition(
            "transform 1s cubic-bezier(.03,1.9,.63,1.95), left 0.8s cubic-bezier(.04,1.31,.71,1.05), top 0.8s ease-in-out, opacity 1s cubic-bezier(1,.01,1,.01)"
          );
          setOpacity(0);
          setLeft(resultStarRect.left);
          setTop(resultStarRect.top);
          setScale(1.1);

          // Finally, set the static star to yellow so it looks like the flying one landed
          setTimeout(function () {
            setStaticStarColor("#FDCF35");
          }, flyAnimTime);
        }, timeUntilStartAnim);
      }
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
    <Grid item key={index} id={id} style={{ margin: "0 12px" }}>
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
          <Star style={{ color: "#FDCF35" }} />
        </div>
      )}
      <Star style={{ color: staticStarColor }} />
    </Grid>
  );
};

export default withTranslation("common")(ResultSlide);
