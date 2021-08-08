import React from "react";
import { withTranslation } from "react-i18next";
// Material UI
import Grid from "@material-ui/core/Grid";
import StarOutlineRoundedIcon from "@material-ui/icons/StarOutlineRounded";
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

// Custom components
import { AlignCenter, Logo, StyledNavLink } from "../components/general";
import ProgressBar from "../components/features/ProgressBar";
import Mainlogo from "../assets/sakerhetskontrollen-logo.svg";
import LangChooser from "../components/features/LangChooser";

const Header = ({ t, currentQuestionIndex, totalQuestions, isFinished }) => {
  const ContentBeforeStart = () => (
    <>
      <div>
        <StarOutlineRoundedIcon />
      </div>
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
        <p
          style={{
            fontSize: "0.9em",
            display: "block",
            width: "100%",
            margin: 0,
          }}
        >
          Digital Ungdom
        </p>
      </div>
      <div>
        <LangChooser/>
      </div>
    </>
  );

  const ContentAfterStart = ({
    t,
    currentQuestionIndex,
    totalQuestions
  }) => (
    <>
      {/*TODO: Implement auto-resume. When user clicks 'Return to Start' and then clicks 'Start' again, the quiz resumes from last answered question.*/}
      <div style={{ lineHeight: 1 }}>
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
          <NavigateBeforeIcon style={{
            height: 20,
            margin: "-2px -2px -5px -8px"
          }}/>
          Start
        </p>
      </div>
      <div style={{ width: 110, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <img
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
          }}
          alt="Säkerhetskontrollen"
          src={Mainlogo}
        />
      </div>
      <div
        style={{
          lineHeight: 1,
          display: "flex",
          flexWrap: "nowrap",
          alignItems: "center",
        }}
      >
        <p
          style={{
            fontSize: "1.5em",
            display: "inline-block",
            margin: 5,
            fontWeight: "bold"
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
  )

  return (
    <div>
      <AlignCenter>
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
            <ContentBeforeStart/>
          ) : (
            <ContentAfterStart 
              t={t}
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={totalQuestions}
            />
          )}
        </div>
      </AlignCenter>
      {currentQuestionIndex !== 0 ? <ProgressBar currentQuestionIndex={currentQuestionIndex} totalQuestions={totalQuestions}/> : null}
    </div>
  );
};

export default withTranslation("common")(Header);
