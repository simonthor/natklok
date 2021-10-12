import React from "react";
import SwipeableViews from "react-swipeable-views";

// Custom components
import { YES_NO } from "util/constants";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Fade from "components/general/Fade";
import Subtitle from "components/general/typeography/Subtitle";
import SmallText from "components/general/typeography/SmallText";

const YesNoWrapper = ({
  children,
  questionData,
  onSelectAnswer,
  contentFadeDelay,
  t,
}) => {
  const handleUpdateIndex = (newIndex, lastestIndex) => {
    if (newIndex === 2) {
      onSelectAnswer(questionData.no_score);
    } else if (newIndex === 0) {
      onSelectAnswer(questionData.yes_score);
    }
  };

  if (questionData.type === YES_NO) {
    return (
      <SwipeableViews
        index={1}
        enableMouseEvents
        id="yesNoWrapper"
        onChangeIndex={handleUpdateIndex}
        slideStyle={{
          height: "-webkit-fill-available",
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
                  margin: "0 12px",
                  pointerEvents: "auto",
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
                    padding: "3px 16px",
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
                  margin: "0 12px",
                  pointerEvents: "auto",
                }}
              >
                <Subtitle
                  onClick={() => {
                    onSelectAnswer(questionData.no_score);
                  }}
                  style={{
                    cursor: "pointer",
                    margin: 0,
                    padding: "3px 16px",
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
