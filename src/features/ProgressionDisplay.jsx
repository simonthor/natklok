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
  PALEBLUE,
  LIGHT_BLUE,
  GOLD,
  AMBER,
  LIGHT_PINK,
} from "util/constants";
import { withTranslation } from "react-i18next";
import Fade from "react-reveal/Fade";

import {
  getAllQuestionAmount,
  getCorrectlyAnsweredIds,
  getIncorrectlyAnsweredIds,
  getStoredTotalAmount,
} from "util/totalScore";

import AlignCenter from "components/AlignCenter";
import Subtitle from "components/typeography/Subtitle";
import StyledButton from "components/StyledButton";

import Grid from "@material-ui/core/Grid";

import BadgeDisplay from "./ProgressDisplay/BagdeDisplay";
import BadgeModal from "./ProgressDisplay/BadgeModal";

const getTextObj = (t, allCorrect) => {
  let extraTitle = "";
  let extraDesc = "";

  if (allCorrect === true) {
    extraTitle = t("progressionDisplay.allCorrectTitle");
    extraDesc = t("progressionDisplay.allCorrectDesc");
  } else {
    extraTitle = t("progressionDisplay.firstPlaceEvenMorePointsTitle");
    extraDesc =
      t("progressionDisplay.firstPlaceEvenMorePoints1") +
      getStoredTotalAmount() +
      t("progressionDisplay.firstPlaceEvenMorePoints2") +
      getAllQuestionAmount() +
      t("progressionDisplay.firstPlaceEvenMorePoints3");
  }

  return { extraTitle, extraDesc };
};

const ProgressionDisplayFadeWrapper = ({ t, redoTest, fadeInAfter = -1 }) => {
  if (fadeInAfter === -1) {
    return <ProgressionDisplay t={t} redoTest={redoTest} />;
  } else {
    return (
      <Fade delay={fadeInAfter} bottom>
        <ProgressionDisplay t={t} redoTest={redoTest} />
      </Fade>
    );
  }
};

const ProgressionDisplay = ({ t, redoTest }) => {
  const allCorrect = getStoredTotalAmount() >= getAllQuestionAmount();
  const textObj = getTextObj(t, allCorrect);

  return (
    <div style={{ background: WHITE, minHeight: "70vh", color: PURPLE }}>
      <AlignCenter>
        <Subtitle style={{ margin: 0 }}>
          {t("progressionDisplay.yourProgress")}
        </Subtitle>
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
          <GroupProgressionItem
            group={PASSWORD}
            emoji="🔒"
            t={t}
            redoTest={redoTest}
          />
          <GroupProgressionItem
            group={PHISHING}
            emoji="🎣"
            t={t}
            redoTest={redoTest}
          />
          <GroupProgressionItem
            group={THEFT}
            emoji="💰"
            t={t}
            redoTest={redoTest}
          />
          <GroupProgressionItem
            group={CONNECTION}
            emoji="📶"
            t={t}
            redoTest={redoTest}
          />
          <GroupProgressionItem
            group={CHAT}
            emoji="💬"
            t={t}
            redoTest={redoTest}
          />
          <GroupProgressionItem
            group={MALWARE}
            emoji="🤖"
            t={t}
            redoTest={redoTest}
          />
          <GroupProgressionItem
            group={SURFING}
            emoji="🏄"
            t={t}
            redoTest={redoTest}
          />
        </Grid>
        <Subtitle style={{ margin: "42px 0 6px 0" }}>
          {textObj.extraTitle}
        </Subtitle>
        <p
          style={{
            margin: "6px 0",
            textAlign: "center",
            opacity: 0.8,
            padding: "0 20%",
          }}
        >
          {textObj.extraDesc}
        </p>
        <StyledButton
          onClick={() => {
            if (allCorrect === false) {
              redoTest(true);
            } else {
              window.open("https://sakerhetskollen.se/", "_blank").focus();
            }
          }}
          style={{ margin: "8px 0 80px 0", background: PALEBLUE }}
        >
          {allCorrect
            ? t("progressionDisplay.toSSF")
            : t("progressionDisplay.redoWithUnanswered")}
        </StyledButton>
      </AlignCenter>
    </div>
  );
};

const GroupProgressionItem = ({ group, emoji, t, redoTest }) => {
  const [openMoreInfoModal, setOpenMoreInfoModal] = useState(false);
  const [correctAnsweredQuestions, setCorrectAnsweredQuestions] = useState([]);
  const [incorrectAnsweredQuestions, setIncorrectAnsweredQuestions] = useState(
    []
  );

  const [totalAmount, setTotalAmount] = useState(0);
  const [hoveringOver, setHoveringOver] = useState(false);

  const getAllCorrect = () => {
    return correctAnsweredQuestions.length === totalAmount;
  };

  const getProgress = (returnMax = false) => {
    if (returnMax) return 80;

    return (correctAnsweredQuestions.length / totalAmount) * 80;
  };

  useEffect(() => {
    const correctlyAnsweredIds = getCorrectlyAnsweredIds();
    const incorrectlyAnsweredIds = getIncorrectlyAnsweredIds();
    let correct = [];
    let incorrect = [];
    let amount = 0;

    QUESTIONS.forEach((questionData) => {
      if (questionData.group === group) {
        amount += 1;

        if (correctlyAnsweredIds.includes(questionData["id"])) {
          correct.push(questionData);
        } else if (incorrectlyAnsweredIds.includes(questionData["id"])) {
          incorrect.push(questionData);
        }
      }
    });

    setTotalAmount(amount);
    setCorrectAnsweredQuestions(correct);
    setIncorrectAnsweredQuestions(incorrect);
  }, [group]);

  return (
    <Grid
      item
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
          emoji={emoji}
          getAllCorrect={getAllCorrect}
          getProgress={getProgress}
          correctAnsweredQuestions={correctAnsweredQuestions}
          totalAmount={totalAmount}
          group={group}
          progressLeft={"calc(50% - 24px)"}
          progressTop={55}
          t={t}
        />
      </div>
      <BadgeModal
        openMoreInfoModal={openMoreInfoModal}
        setOpenMoreInfoModal={setOpenMoreInfoModal}
        emoji={emoji}
        getAllCorrect={getAllCorrect}
        getProgress={getProgress}
        correctAnsweredQuestions={correctAnsweredQuestions}
        totalAmount={totalAmount}
        group={group}
        t={t}
        redoTest={redoTest}
      />
    </Grid>
  );
};

export default withTranslation("common")(ProgressionDisplayFadeWrapper);
