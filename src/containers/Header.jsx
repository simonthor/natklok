import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
// Material UI
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

// Custom components
import { AlignCenter } from "../components/general";
import ProgressBar from "../components/features/ProgressBar";
import Mainlogo from "../assets/sakerhetskontrollen-logo.svg";
import StyledLink from "../components/general/StyledLink";

import { useHistory } from "react-router-dom";
import { Star } from "@material-ui/icons";
import { Hidden } from "@material-ui/core";

const Header = ({
  t,
  currentQuestionIndex,
  totalQuestions,
  isFinished,
  starAmount,
}) => {
  return (
    <div>
      <AlignCenter marginTop={false} row>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",

            width: "100%",
            padding: "8px 0",
          }}
        >
          {currentQuestionIndex === 0 ? (
            <ContentBeforeStart />
          ) : (
            <ContentAfterStart
              t={t}
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={totalQuestions}
              starAmount={starAmount}
            />
          )}
        </div>
      </AlignCenter>
      {currentQuestionIndex !== 0 ? (
        <ProgressBar
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={totalQuestions}
        />
      ) : null}
    </div>
  );
};

const ContentBeforeStart = () => (
  <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
    <div>
      <p
        style={{
          fontSize: "0.8em",
          display: "block",
          width: "100%",
          margin: 0,
        }}
      >
        I samarbete med
      </p>
      <StyledLink
        href="https://www.digitalungdom.se/"
        colored
        style={{
          fontSize: "0.9em",
          display: "block",
          width: "100%",
          margin: 0,
        }}
      >
        Digital Ungdom
      </StyledLink>
    </div>
  </div>
);

const ContentAfterStart = ({
  t,
  currentQuestionIndex,
  totalQuestions,
  starAmount,
}) => {
  const history = useHistory();
  return (
    <>
      {/*TODO: Implement auto-resume. When user clicks 'Return to Start' and then clicks 'Start' again, the quiz resumes from last answered question.*/}
      <div style={{ display: "flex" }}>
        <div
          style={{ lineHeight: 1, cursor: "pointer", paddingRight: 12 }}
          onClick={() => {
            history.push("/");
          }}
        >
          <p
            style={{
              fontSize: "0.7em",
              display: "block",
              width: "100%",
              margin: 0,
            }}
          >
            Tillbaks till
          </p>
          <p
            style={{
              fontSize: "0.8em",
              display: "block",
              width: "100%",
              margin: 0,
              fontWeight: "bold",
            }}
          >
            <NavigateBeforeIcon
              style={{
                height: 20,
                margin: "-2px -2px -5px -8px",
              }}
            />
            Start
          </p>
        </div>
        <StarContainer starAmount={starAmount} />
      </div>

      <Hidden xsDown>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            left: 0,
            top: 6,
            position: "absolute",
            pointerEvents: "none",
          }}
        >
          <img
            style={{
              width: 110,
              position: "relative",
              height: "auto",
            }}
            alt="Säkerhetskontrollen"
            src={Mainlogo}
          />
        </div>
      </Hidden>

      <div
        style={{
          fontSize: "0.6em",
          display: "block",
          width: 5,
          margin: "0 20px 0 0",
          lineHeight: 1,
          flexWrap: "nowrap",
          alignItems: "center",
        }}
      >
        <p
          style={{
            fontSize: "1.5em",
            display: "inline-block",
            margin: 5,
            fontWeight: "bold",
          }}
        >
          {totalQuestions - currentQuestionIndex + 1}
        </p>
        <p
          style={{
            fontSize: "0.6em",
            display: "block",
            width: 5,
            margin: "0 20px 0 0",
          }}
        >
          {totalQuestions - currentQuestionIndex + 1 === 1
            ? t("general.questionLeft")
            : t("general.questionsLeft")}
        </p>
      </div>
    </>
  );
};

let prevStarAmount = 0;

const StarContainer = ({ starAmount }) => {
  // Star values
  const [scale, setScale] = useState(1);
  const [left, setLeft] = useState(window.innerWidth / 2);
  const [top, setTop] = useState("40vh");
  const [opacity, setOpacity] = useState(0);
  const [transition, setTransition] = useState("");
  const [starAmountText, setStarAmountText] = useState(0);

  function showStar() {
    setTransition(
      "opacity 0.5s ease, transform 0.5s cubic-bezier(.16,.98,.36,1.6)"
    );
    setScale(3);
    setOpacity(1);
    setLeft(window.innerWidth / 2 - 16);
    setTop("40vh");

    setTimeout(function () {
      setTransition("all 1s ease-in-out");
      const starAmountIcon = document.getElementById("starAmountIcon");
      const starAmountIconRect = starAmountIcon.getBoundingClientRect();

      setScale(1);
      setOpacity(0);
      setLeft(starAmountIconRect.left);
      setTop(starAmountIconRect.top);
      setStarAmountText(starAmount);
    }, 800);
  }

  useEffect(() => {
    if (starAmount > prevStarAmount) {
      prevStarAmount = starAmount;
      showStar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [starAmount]);

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.1)",
        borderRadius: 6,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
      }}
    >
      <div
        id="animatedStar"
        style={{
          transform: "scale(" + scale + ") ",
          position: "absolute",
          left: left,
          top: top,
          opacity: opacity,
          transition: transition,
          zIndex: 100,
        }}
      >
        <Star style={{ color: "yellow" }} />
      </div>

      <Star id="starAmountIcon" style={{ color: "yellow" }} />
      <p style={{ margin: "0 2px" }}>{starAmountText}</p>
    </div>
  );
};

export default withTranslation("common")(Header);
