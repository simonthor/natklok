import React, { useEffect, useState } from "react";
import {
  PURPLE,
  WHITE,
  QUESTIONS,
  PASSWORD,
  PHISHING,
  THEFT,
  CONNECTION,
  CHAT,
  MALWARE,
  SURFING,
} from "util/constants";
import { withTranslation } from "react-i18next";
import Fade from "react-reveal/Fade";

import {
  getAllQuestionAmount,
  getCorrectlyAnsweredQuestionData,
  getIncorrectlyAnsweredQuestionData,
  getStoredTotalAmount,
} from "util/totalScore";

import AlignCenter from "components/AlignCenter";
import Subtitle from "components/typeography/Subtitle";
import HTMLRenderer from "components/HTMLRenderer";

import Grid from "@material-ui/core/Grid";

import BadgeDisplay from "./ProgressDisplay/BagdeDisplay";
import BadgeModal from "./ProgressDisplay/BadgeModal";

const ProgressionDisplayFadeWrapper = ({
  t,
  redoTest,
  openQuestion,
  fadeInAfter = -1,
}) => {
  if (fadeInAfter === -1) {
    return (
      <ProgressionDisplay
        t={t}
        redoTest={redoTest}
        openQuestion={openQuestion}
      />
    );
  } else {
    return (
      <Fade delay={fadeInAfter} bottom fraction={0}>
        <ProgressionDisplay
          t={t}
          redoTest={redoTest}
          openQuestion={openQuestion}
        />
      </Fade>
    );
  }
};

const ProgressionDisplay = ({ t, redoTest, openQuestion }) => {
  let availableGroups = [
    PASSWORD,
    PHISHING,
    THEFT,
    CONNECTION,
    CHAT,
    MALWARE,
    SURFING,
  ];
  let scoreStr = `<b>${getStoredTotalAmount()} ${t(
    "general.outOf"
  )} ${getAllQuestionAmount()}</b>`;
  let progressionDisplayDesc = t("progressionDisplay.yourProgressDesc").replace(
    "{score}",
    scoreStr
  );
  return (
    <div style={{ background: WHITE, minHeight: "70vh", color: PURPLE }}>
      <AlignCenter>
        <Subtitle style={{ marginTop: 12 }}>
          {t("progressionDisplay.yourProgress")}
        </Subtitle>
        <HTMLRenderer style={{ marginBottom: 12 }}>
          {progressionDisplayDesc}
        </HTMLRenderer>
        <Grid
          container
          justify="center"
          style={{
            marginTop: 8,
            bottom: 0,
            overflow: "hidden",
            width: "100%",
          }}
        >
          {availableGroups.map((group, index) => (
            <GroupProgressionItem
              key={index}
              group={group}
              t={t}
              redoTest={redoTest}
              openQuestion={openQuestion}
            />
          ))}
        </Grid>
      </AlignCenter>
    </div>
  );
};

const GroupProgressionItem = ({ group, t, redoTest, openQuestion, key }) => {
  const [openMoreInfoModal, setOpenMoreInfoModal] = useState(false);
  const [hoveringOver, setHoveringOver] = useState(false);

  return (
    <Grid
      item
      key={key}
      style={{
        margin: 6,
      }}
    >
      <div
        onMouseEnter={() => setHoveringOver(true)}
        onMouseLeave={() => setHoveringOver(false)}
        onClick={() => {
          setOpenMoreInfoModal(!openMoreInfoModal);
        }}
        style={{
          width: 160,
          height: 150,
          border: "1px solid rgba(0,0,0,0)",
          borderRadius: 8,
          textAlign: "center",
          cursor: "pointer",
          position: "relative",
          transform: hoveringOver ? "scale(1.03)" : "scale(1)",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        <BadgeDisplay
          group={group}
          progressLeft={"calc(50% - 24px)"}
          progressTop={55}
          t={t}
        />
      </div>
      <BadgeModal
        openMoreInfoModal={openMoreInfoModal}
        setOpenMoreInfoModal={setOpenMoreInfoModal}
        group={group}
        t={t}
        redoTest={redoTest}
        openQuestion={openQuestion}
      />
    </Grid>
  );
};

export default withTranslation("common")(ProgressionDisplayFadeWrapper);
