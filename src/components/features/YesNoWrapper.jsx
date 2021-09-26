import React from "react";
import SwipeableViews from "react-swipeable-views";

// Custom components
import { YES_NO } from "../../util/constants";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";
import { Fade } from "components/general";
import Subtitle from "components/general/typeography/Subtitle";

const YesNoWrapper = ({
  children,
  questionData,
  onSelectAnswer,
  contentFadeDelay,
  t,
}) => {
  const handleUpdateIndex = (newIndex, lastestIndex) => {
    if (newIndex === 0) {
      onSelectAnswer(questionData.no_score);
    } else if (newIndex === 2) {
      onSelectAnswer(questionData.yes_score);
    }
  };

  if (questionData.type === YES_NO) {
    return (
      <SwipeableViews
        axis="y"
        index={1}
        enableMouseEvents
        containerStyle={{
          height: "90vh",
        }}
        slideStyle={{ height: "100%" }}
        id="yesNoWrapper"
        onChangeIndex={handleUpdateIndex}
      >
        <div />

        <div style={{ height: "100%" }}>
          <div
            style={{
              height: "10vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              paddingTop: window.innerHeight > 620 ? "8vh" : 0,
            }}
          >
            <Fade delay={contentFadeDelay}>
              <ExpandLess />
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
              <p
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "0.8em",
                  margin: 0,
                }}
              >
                Swipe:a uppåt
              </p>
            </Fade>
          </div>
          <div style={{ pointerEvents: "none" }}>{children}</div>
          <div
            style={{
              marginTop: "6vh",
              height: "10vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Fade delay={contentFadeDelay}>
              <p
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "0.8em",
                  margin: 0,
                }}
              >
                Swipe:a neråt
              </p>
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
              <ExpandMore />
            </Fade>
          </div>
        </div>
        <div />
      </SwipeableViews>
    );
  } else {
    return children;
  }
};

export default YesNoWrapper;
