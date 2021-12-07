import React from "react";
import { GOLD, AMBER } from "util/constants";

import SmallText from "components/typeography/SmallText";
import Subtitle from "components/typeography/Subtitle";

import shine from "assets/shine.png";
import "./BadgeDisplay.css";

import Star from "@material-ui/icons/Star";
import { CircularProgress } from "@material-ui/core";

const BadgeDisplay = ({
  emoji,
  getAllCorrect,
  getProgress,
  correctAnsweredQuestions,
  totalAmount,
  group,
  emojiLeft = 0,
  progressLeft = 55,
  progressTop = 55,
  containerStyle = {},
  useSubtitle = false,
  t,
}) => {
  return (
    <>
      <div
        style={{
          margin: "32px 0 0 0",
          position: "relative",
          zIndex: 2,
          ...containerStyle,
        }}
      >
        <span
          style={{
            fontSize: 48,
            marginLeft: emojiLeft,
            filter: getAllCorrect() ? "saturate(1)" : "saturate(0)",
          }}
        >
          {emoji}
        </span>
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
              color: AMBER /*getAllCorrect() ? AMBER : "rgba(0, 0, 0, 0.6)"*/,
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

      <div>
        <img
          src={shine}
          id="spin"
          alt=""
          style={{
            position: "absolute",
            zIndex: 1,
            width: 80,
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            top: progressTop - 34,
            textAlign: "center",
            opacity: getAllCorrect() ? 0.6 : 0,
          }}
        />
        <ProgressCircle
          progress={getProgress(true)}
          progressLeft={progressLeft}
          progressTop={progressTop}
          color="rgba(0,0,0,0.1)"
        />
        <ProgressCircle
          progress={getProgress() + 1}
          progressLeft={progressLeft}
          progressTop={progressTop}
          color="white"
        />
        <ProgressCircle
          progress={getProgress()}
          progressLeft={progressLeft}
          progressTop={progressTop}
          color={GOLD}
        />
      </div>

      <div style={{ textAlign: "center" }}>
        {useSubtitle ? (
          <Subtitle
            style={{
              marginTop: 16,
              marginBottom: 0,
            }}
          >
            {t("progressionDisplay." + group)}
          </Subtitle>
        ) : (
          <p
            style={{
              margin: "8px 0 0 0",
              fontWeight: "bold",
            }}
          >
            {t("progressionDisplay." + group)}
          </p>
        )}
      </div>
    </>
  );
};

const ProgressCircle = ({ progress, progressLeft, progressTop, color }) => {
  return (
    <CircularProgress
      variant="determinate"
      value={progress}
      style={{
        position: "absolute",
        zIndex: 1,
        width: 90,
        transform: "rotate(127deg)",
        marginLeft: progressLeft,
        left: 0,
        right: 0,
        top: progressTop,
        color: color,
      }}
    />
  );
};

export default BadgeDisplay;
