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
import HTMLRenderer from "components/HTMLRenderer";
import SmallText from "components/typeography/SmallText";
import Subtitle from "components/typeography/Subtitle";
import StyledButton from "components/StyledButton";
import Modal from "components/Modal";
import shine from "assets/shine.png";
import "./ProgressionDisplay.css";

import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Star from "@material-ui/icons/Star";
import { styled } from "@material-ui/styles";
import { CircularProgress } from "@material-ui/core";

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

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{
      children: <span className="MuiTabs-indicatorSpan" />,
    }}
    style={{
      borderBottom: "1px solid lightgrey",
      marginBottom: 4,
      ...props.style,
    }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    backgroundColor: PURPLE,
    maxWidth: 40,
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: "bold",
    color: PURPLE,
    fontSize: 18,
  })
);

const GroupProgressionItem = ({ group, emoji, t, redoTest }) => {
  const [openMoreInfoModal, setOpenMoreInfoModal] = useState(false);
  const [value, setValue] = useState(0);
  const [correctAnsweredQuestions, setCorrectAnsweredQuestions] = useState([]);
  const [incorrectAnsweredQuestions, setIncorrectAnsweredQuestions] = useState(
    []
  );
  const [totalAmount, setTotalAmount] = useState(0);
  const [hoveringOver, setHoveringOver] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
          transition: "all 0.3s ease-in-out",
        }}
      >
        <div
          style={{
            margin: "32px 0 0 0",
            position: "relative",
            zIndex: 2,
          }}
        >
          <span style={{ fontSize: 48 }}>{emoji}</span>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              marginTop: -4,
            }}
          >
            <Star
              style={{
                color: getAllCorrect() ? AMBER : "rgba(0, 0, 0, 0.6)",
                fontSize: 18,
                marginTop: 3,
                marginRight: 2,
                marginLeft: -6,
              }}
            />
            <SmallText
              style={{
                color: getAllCorrect() ? AMBER : "rgba(0, 0, 0, 0.6)",
                fontWeight: "bold",
                margin: "4px 0 0 0",
              }}
            >
              {correctAnsweredQuestions.length}/{totalAmount}
            </SmallText>
          </div>
        </div>

        <div style={{}}>
          <ProgressCircle
            progress={getProgress(true)}
            color="rgba(0,0,0,0.1)"
          />
          <ProgressCircle progress={getProgress() + 1} color="white" />
          <ProgressCircle progress={getProgress()} color={GOLD} />
          <img
            src={shine}
            id="spin"
            alt=""
            style={{
              position: "absolute",
              zIndex: 1,
              width: 110,
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              top: 6,
              textAlign: "center",
              opacity: getAllCorrect() ? 0.6 : 0,
            }}
          />
        </div>

        <div>
          <p
            style={{
              margin: "8px 0 0 0",
              fontWeight: "bold",
            }}
          >
            {t("progressionDisplay." + group)}
          </p>
        </div>
      </div>
      <Modal
        open={openMoreInfoModal}
        setOpen={setOpenMoreInfoModal}
        title={t("progressionDisplay." + group)}
      >
        <p style={{ margin: "4px 0 4px 0", textAlign: "center", opacity: 0.7 }}>
          {t("progressionDisplay.groupDesc." + group)}
        </p>
        <StyledTabs value={value} onChange={handleChange}>
          <StyledTab
            label={
              t("progressionDisplay.correct") +
              ` (${correctAnsweredQuestions.length})`
            }
          />
          <StyledTab
            label={
              t("progressionDisplay.wrong") +
              ` (${incorrectAnsweredQuestions.length})`
            }
          />
          {getAllCorrect() === false ? (
            <StyledTab label={t("progressionDisplay.test")} />
          ) : null}
        </StyledTabs>
        <div
          style={{
            opacity: value === 0 ? 1 : 0,
            maxHeight: value === 0 ? 9999 : 0,
            overflow: "hidden",
            transition: "opacity 0.5s ease",
          }}
        >
          <QuestionContainerList
            questionDataArray={correctAnsweredQuestions}
            noneText="rätt"
            t={t}
          />
        </div>

        <div
          style={{
            opacity: value === 1 ? 1 : 0,
            maxHeight: value === 1 ? 9999 : 0,
            overflow: "hidden",
            transition: "opacity 0.5s ease",
          }}
        >
          <QuestionContainerList
            questionDataArray={incorrectAnsweredQuestions}
            noneText="fel"
            t={t}
          />
        </div>
        <div
          style={{
            opacity: value === 2 ? 1 : 0,
            maxHeight: value === 2 ? 9999 : 0,
            overflow: "hidden",
            transition: "opacity 0.5s ease",
          }}
        >
          <TestContainer
            redoTest={redoTest}
            t={t}
            groupName={t("progressionDisplay." + group)}
            group={group}
            amountCorrect={correctAnsweredQuestions.length}
            totalAmount={totalAmount}
          />
        </div>
      </Modal>
    </Grid>
  );
};

const ProgressCircle = ({ progress, color }) => {
  return (
    <CircularProgress
      variant="determinate"
      value={progress}
      style={{
        position: "absolute",
        zIndex: 1,
        width: 90,
        transform: "rotate(127deg)",
        marginLeft: 55,
        left: 0,
        right: 0,
        top: 58,
        color: color,
      }}
    />
  );
};

const TestContainer = ({
  redoTest,
  t,
  groupName,
  group,
  amountCorrect,
  totalAmount,
}) => {
  return (
    <div style={{ textAlign: "center" }}>
      <p style={{ margin: "20px 0 6px 0" }}>
        {t("progressionDisplay.redoGroup.desc1")}
        <span style={{ fontWeight: "bold" }}>
          {amountCorrect + "/" + totalAmount}{" "}
        </span>
        {t("progressionDisplay.redoGroup.desc2")}
      </p>
      <StyledButton
        onClick={() => {
          redoTest(true, group);
        }}
        style={{ margin: "8px 0 30px 0", background: PALEBLUE }}
      >
        {t("progressionDisplay.redoGroup.button") + groupName + "'"}
      </StyledButton>
    </div>
  );
};

const QuestionContainerList = ({ questionDataArray, noneText, t }) => {
  if (questionDataArray.length === 0) {
    return (
      <p style={{ textAlign: "center", margin: "32px 0", opacity: 0.6 }}>
        Du har inte fått några {noneText}
      </p>
    );
  }
  return questionDataArray.map((questionData) => {
    return <QuestionContainer questionData={questionData} t={t} />;
  });
};

const QuestionContainer = ({ questionData, t }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "12px 0",
      }}
    >
      <div style={{ width: "75%" }}>
        <p style={{ margin: "0 0 4px 0", fontWeight: "bold" }}>
          {/*HACK: replace() is to remove dynamic naming title*/}
          {t(questionData.title).replace("{profileBasedService}", "")}
        </p>
        <HTMLRenderer style={{ marginTop: 0, fontSize: 14, opacity: 0.7 }}>
          {t(questionData.text)}
        </HTMLRenderer>
      </div>
      <StyledButton
        onClick={() => {
          let href = window.location.href;
          let url = new URL(href);
          // Gets domain name only (even with localhost)
          let domain = (url + "")
            .replace(url.search, "")
            .replace(url.pathname, "");
          let questionUrl =
            domain + "/test?id=" + questionData.id + "&res=true";
          document.location.href = questionUrl;
        }}
        color={LIGHT_BLUE}
        style={{ padding: 0, width: "25%", height: 40, margin: "0 4px" }}
      >
        {"Gör frågan"}
      </StyledButton>
    </div>
  );
};

export default withTranslation("common")(ProgressionDisplayFadeWrapper);
