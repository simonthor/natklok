import React, { useState } from "react";
import StyledButton from "components/StyledButton";

import { withTranslation } from "react-i18next";
import { getAllQuestionAmount, getStoredTotalAmount } from "util/totalScore";
import { PALEBLUE, PINK } from "util/constants";
import { Link } from "react-router-dom";

const getButtonDesc = (t) => {
  const allCorrect = getStoredTotalAmount() >= getAllQuestionAmount();
  if (allCorrect) {
    return <span>{t("progressionDisplay.allCorrectDesc")}</span>;
  } else {
    return (
      <span>
        {t("progressionDisplay.firstPlaceEvenMorePoints1")}
        <b>
          {getStoredTotalAmount() +
            t("progressionDisplay.firstPlaceEvenMorePoints2") +
            getAllQuestionAmount()}
        </b>
        {t("progressionDisplay.firstPlaceEvenMorePoints3")}
      </span>
    );
  }
};

const RedoOrStartButton = ({
  redoTest = () => {},
  showText = true,
  t,
  buttonStyle = {},
}) => {
  const [buttonDesc] = useState(getButtonDesc(t));

  // Don't want to give users that only answered a few correct a brutal amount of questions when they choose the "do more"
  if (getStoredTotalAmount() < 2) {
    return <FirstTimeButton t={t} />;
  } else if (getStoredTotalAmount() >= getAllQuestionAmount()) {
    return (
      <>
        {showText && (
          <p
            style={{
              textAlign: "center",
              opacity: 0.8,
              padding: "0 20%",
              maxWidth: 300,
              margin: "0 auto 12px auto",
            }}
          >
            {buttonDesc}
          </p>
        )}

        <StyledButton
          onClick={() => {
            redoTest(false);
          }}
          style={{
            margin: 0,
            background: PINK,
            paddingLeft: 32,
            paddingRight: 32,
            ...buttonStyle,
          }}
        >
          {t("result.redo")}
        </StyledButton>
      </>
    );
  } else {
    return (
      <>
        {showText && (
          <p
            style={{
              textAlign: "center",
              opacity: 0.8,
              padding: "0 20%",
              margin: "0 auto 12px auto",
            }}
          >
            {buttonDesc}
          </p>
        )}

        <StyledButton
          onClick={() => {
            redoTest(true);
          }}
          style={{
            margin: 0,
            background: PALEBLUE,
            paddingLeft: 32,
            paddingRight: 32,
            ...buttonStyle,
          }}
        >
          {t("progressionDisplay.redoWithUnanswered")}
        </StyledButton>
      </>
    );
  }
};

const FirstTimeButton = ({ t }) => {
  return (
    <Link to="/test">
      <StyledButton
        cinematicColor="#212058"
        caps
        style={{ paddingLeft: 32, paddingRight: 32 }}
      >
        {t("welcome.test")}
      </StyledButton>
    </Link>
  );
};

export default withTranslation("common")(RedoOrStartButton);
