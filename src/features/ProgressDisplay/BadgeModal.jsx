import React, { useState } from "react";
import { PALEBLUE, LIGHT_BLUE, PURPLE } from "util/constants";

import HTMLRenderer from "components/HTMLRenderer";
import StyledButton from "components/StyledButton";
import Modal from "components/Modal";
import BadgeDisplay from "features/ProgressDisplay/BagdeDisplay";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { styled } from "@material-ui/styles";

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

const BadgeModal = ({
  openMoreInfoModal,
  setOpenMoreInfoModal,
  emoji,
  getAllCorrect,
  getProgress,
  correctAnsweredQuestions,
  totalAmount,
  group,
  t,
  redoTest,
}) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Modal open={openMoreInfoModal} setOpen={setOpenMoreInfoModal} title={""}>
      <div style={{ flex: 1, position: "relative" }}>
        <BadgeDisplay
          emoji={emoji}
          getAllCorrect={getAllCorrect}
          getProgress={getProgress}
          correctAnsweredQuestions={correctAnsweredQuestions}
          totalAmount={totalAmount}
          group={group}
          emojiLeft={"calc(50% - 24px)"}
          progressLeft={"calc(50% - 24px)"}
          progressTop={28}
          t={t}
          containerStyle={{ marginTop: 6 }}
          useSubtitle
        />
        {/* <p
          style={{
            textAlign: "center",
            opacity: 0.7,
            margin: 0,
          }}
        >
          {t("progressionDisplay.groupDesc." + group)}
        </p>*/}

        <div
          style={{
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
      </div>
    </Modal>
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
      {amountCorrect !== totalAmount ? (
        <>
          <p style={{ margin: "6px 0 6px 0" }}>
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
            style={{ marginTop: 16, width: 360, maxWidth: "100%" }}
          >
            {t("progressionDisplay.redoGroup.button") + groupName + "'"}
          </StyledButton>
        </>
      ) : (
        <p style={{ margin: "20px 0 6px 0" }}>
          {t("progressionDisplay.redoGroup.allCorrect")}
        </p>
      )}
      <div style={{ width: "100%" }}>
        <StyledButton
          onClick={() => {
            redoTest(true, group);
          }}
          style={{
            margin: "6px 0 16px 0",
            width: 360,
            maxWidth: "100%",
            background: PALEBLUE,
          }}
        >
          {t("progressionDisplay.redoGroup.showIncorrectAndCorrect")}
        </StyledButton>
      </div>
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

export default BadgeModal;
