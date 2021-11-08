import React from "react";
import { StyledButton } from "../general";
import intim1 from "assets/intim1.png";
import dontClickVideo from "assets/dontClickVideo.png";
import { PINK } from "util/constants";

const ChatQuestion = ({ questionData, onSelectAnswer, t }) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        fontFamily: "arial",
      }}
    >
      <div
        style={{
          position: "relative",
          maxWidth: 300,
          background: "white",
          paddingBottom: 42,
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "100%",
            textAlign: "center",
            background: "rgba(0,0,0,0.1)",
          }}
        >
          <p style={{ padding: "6px 0", margin: 0, color: "grey" }}>
            {t(questionData.from)}
          </p>
        </div>

        <div
          style={{
            margin: "4px 6px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {questionData.smses.map((sms) => {
            return <SMS sms={sms} t={t} />;
          })}
        </div>

        <div
          style={{
            position: "absolute",
            width: "100%",
            bottom: 0,
            height: 36,
            background: "rgba(0,0,0,0.2)",
          }}
        >
          <div
            style={{
              flex: 1,
              background: "white",
              borderRadius: 20,
              margin: 6,
              height: 24,
            }}
          >
            <p
              style={{
                padding: 4,
                opacity: 0.9,
                margin: 0,
                fontSize: 16,
                color: "grey",
              }}
            >
              {t(questionData.yourAnswer)}
            </p>
          </div>
        </div>
      </div>
      <div
        style={{ margin: "6px 0", display: "flex", flexDirection: "column" }}
      >
        {questionData.options.map((option) => (
          <div>
            <StyledButton
              onClick={() => onSelectAnswer(option.score)}
              style={{
                fontWeight: 500,
                color: "white",
                margin: "5px 2px",
                borderRadius: 20,
                padding: 10,
              }}
            >
              {t(option.text)}
            </StyledButton>
          </div>
        ))}
      </div>
    </div>
  );
};

const SMS = ({ sms, t }) => {
  var imgSrc = null;
  if (sms.image === "intim1") {
    imgSrc = intim1;
  } else if (sms.image === "dontClickVideo") {
    imgSrc = dontClickVideo;
  }

  var greyWidth = t(sms.text).length > 30 ? "90%" : "75%";

  if (sms.text !== undefined) {
    return (
      <div
        style={{
          background: sms.side === "left" ? "#e5e5ea" : PINK,
          color: sms.side === "left" ? "grey" : "white",
          width: sms.side === "left" ? greyWidth : "50%",
          margin: "4px 0",
          alignSelf: sms.side === "left" ? "flex-start" : "flex-end",
          borderRadius: 20,
          padding: "6px 6px 6px 12px",
          fontSize: 16,
        }}
      >
        {t(sms.text)}
      </div>
    );
  } else if (imgSrc !== undefined) {
    return (
      <img
        src={imgSrc}
        alt=""
        style={{
          height: window.innerWidth < 500 ? 60 : "100%",
          margin: "4px 0",
          alignSelf: sms.side === "left" ? "flex-start" : "flex-end",
          borderRadius: 20,
        }}
      />
    );
  }
};

export default ChatQuestion;
