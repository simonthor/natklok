import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";

// Custom components
import { YES_NO } from "util/constants";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Fade from "components//Fade";
import Subtitle from "components/typeography/Subtitle";
import SmallText from "components/typeography/SmallText";

const YesNoWrapper = ({
  children,
  questionData,
  onSelectAnswer,
  contentFadeDelay,
  t,
}) => {
  const [percentSwitched, setPercentSwitched] = useState(1);

  const handleUpdateIndex = (newIndex, lastestIndex) => {
    if (newIndex === 2) {
      onSelectAnswer(questionData.no_score);
    } else if (newIndex === 0) {
      onSelectAnswer(questionData.yes_score);
    }
  };

  const handleAction = (percent) => {
    setPercentSwitched(percent);
  };

  if (questionData.type === YES_NO) {
    return (
      <SwipeableViews
        onSwitching={handleAction}
        index={1}
        enableMouseEvents
        id="yesNoWrapper"
        onChangeIndex={handleUpdateIndex}
        slideStyle={{
          height: "calc(90vh - 60px)",
          overflow: "hidden",
        }}
      >
        <div />

        <div>
          <div style={{ pointerEvents: "none" }}>{children}</div>
          <Fade delay={contentFadeDelay}>
            <SmallText
              style={{
                textAlign: "center",
                pointerEvents: "none",
              }}
              opacity
            >
              Swipe:a eller klicka
            </SmallText>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: "20vw",
                  pointerEvents: "auto",
                  transform:
                    "scale(" +
                    Math.pow(Number(1 + (1 - percentSwitched)), 2) +
                    ")",
                }}
              >
                <KeyboardArrowLeft />
                <Subtitle
                  onClick={() => {
                    onSelectAnswer(questionData.yes_score);
                  }}
                  style={{
                    cursor: "pointer",
                    margin: 0,
                    padding: "3px 0px",
                  }}
                >
                  {t("general.yes")}
                </Subtitle>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: "20vw",
                  pointerEvents: "auto",
                  transform: "scale(" + Math.pow(percentSwitched, 2) + ")",
                }}
              >
                <Subtitle
                  onClick={() => {
                    onSelectAnswer(questionData.no_score);
                  }}
                  style={{
                    cursor: "pointer",
                    margin: 0,
                    padding: "3px 0px",
                  }}
                >
                  {t("general.no")}
                </Subtitle>
                <KeyboardArrowRight />
              </div>
            </div>
          </Fade>
        </div>

        <div />
      </SwipeableViews>
    );
  } else {
    return children;
  }
};

export default YesNoWrapper;
