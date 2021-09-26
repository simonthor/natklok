// Third party
import { Grid } from "@material-ui/core";
import React from "react";
import { withTranslation } from "react-i18next";
// Custom
import AlignCenter from "components/general/AlignCenter";
import ProgressBar from "components/features/ProgressBar";

const Footer = ({ t, currentQuestion, totalQuestions, isFinished, style }) => {
  return (
    <AlignCenter>
      <Grid
        container
        justify={isFinished ? "center" : "space-between"}
        style={{
          padding: 10,
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          ...style,
        }}
        id="formFooter"
        alignItems="center"
      >
        {!isFinished ? (
          <Grid item>
            {currentQuestion === 0 ? null : (
              <ProgressBar
                currentQuestion={currentQuestion}
                totalQuestions={totalQuestions}
              />
            )}
          </Grid>
        ) : (
          <></>
        )}
      </Grid>
    </AlignCenter>
  );
};

const FooterLink = ({ icon }) => (
  <div
    style={{
      cursor: "pointer",
      display: "inline-block",
      verticalAlign: "middle",
      color: "white",
      fontSize: 30,
    }}
  >
    {icon}
  </div>
);

export default withTranslation("common")(Footer);
