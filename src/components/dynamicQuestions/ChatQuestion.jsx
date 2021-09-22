import React from "react";
import { StyledButton } from "../general";
import intim1 from "assets/intim1.png";
import dontClickVideo from "assets/dontClickVideo.png";

const ChatQuestion = ({ questionData, onSelectAnswer, t }) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          position: "relative",
          maxWidth: 300,
          height: 380,
          background: "white",
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
                fontSize: "1em",
                opacity: 0.9,
                margin: 0,
                color: "lightgrey",
              }}
            >
              Meddelande
            </p>
          </div>
        </div>
      </div>
      <p style={{ marginBottom: 0 }}>{t(questionData.yourAnswer)}</p>
      <div style={{ margin: "6px 0", display: "flex", flexDirection: "row" }}>
        {questionData.options.map((option) => (
          <div>
            <StyledButton
              onClick={() => onSelectAnswer(option.score)}
              style={{
                fontSize: "1em",
                fontWeight: 500,
                background: "#4a5ef3",
                color: "white",
                margin: "6px 2px",
                borderRadius: 20,
                padding: 6,
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

  if (sms.text !== undefined) {
    return (
      <div
        style={{
          background: sms.side === "left" ? "#e5e5ea" : "#4a5ef3",
          color: sms.side === "left" ? "grey" : "white",
          width: sms.side === "left" ? "70%" : "30%",
          margin: "6px 0",
          alignSelf: sms.side === "left" ? "flex-start" : "flex-end",
          borderRadius: 20,
          padding: "6px 6px 6px 12px",
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
          margin: "6px 0",
          alignSelf: sms.side === "left" ? "flex-start" : "flex-end",
          borderRadius: 20,
        }}
      />
    );
  }
};

export default ChatQuestion;
