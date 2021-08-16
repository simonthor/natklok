import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import Fade from "react-reveal/Fade";
import { StyledButton, StyledMarkdown } from "components/general";
import { Grid } from "@material-ui/core";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SocialShare from "components/features/SocialShare";
import { WHITE, PALEBLUE, PURPLE } from "util/constants";

const AnswerFeedbackSlide = ({
  t,
  nextQuestion,
  streak,
  isCorrect,
  isLastQuestion,
  title,
  desc,
  bodyMarkdown,
}) => {
  return (
    <>
      <Grid container style={{ textAlign: "left" }}>
        <Grid item xs={12} lg={6}>
          <Fade bottom delay={400}>
            <Grid
              container
              alignItems="center"
              style={{
                fontFamily: "Bungee, Arial, Helvetica, sans-serif",
              }}
            >
              <WhatshotIcon
                style={{
                  color: PALEBLUE,
                }}
              />
              <span
                style={{
                  margin: 0,
                  textAlign: "left",
                  color: PALEBLUE,
                  padding: 3,
                  display: "flex",
                  alignItems: "center",
                  fontSize: "1.1em",
                }}
              >
                Streak
              </span>
              <div
                style={{
                  fontSize: "1.2em",
                  padding: 15,
                  borderRadius: 15,
                  marginLeft: 5,
                  display: "inline-block",
                  position: "relative",
                  backgroundColor: PALEBLUE,
                  color: PURPLE,
                  lineHeight: "1.1",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {streak}
                </span>
              </div>
            </Grid>
          </Fade>
          <Fade>
            <h1
              style={{
                marginTop: 8,
                textTransform: "uppercase",
                lineHeight: "1.3",
                fontFamily: "Bowlby One SC, Arial, Helvetica, sans-serif",
              }}
            >
              {title}
            </h1>
          </Fade>
        </Grid>
      <Grid item xs={12} lg={6}>
        <Fade delay={200}>
        <StyledMarkdown style={{
          marginTop: 0,
          fontSize: "1.1em"
        }}>{desc}</StyledMarkdown>
        <div style={{
          display: "flex",
          alignItems: "center",
          textDecoration: "underline",
          padding: "10px 10px 10px 0",
          marginTop: -10,
          cursor: "pointer",
        }}>
          {t("test.pressToReadMore")}
          <ExpandMoreIcon/>
        </div>
        </Fade>
      </Grid>
      </Grid>
      <Fade bottom delay={800}>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12}>
            <Grid container justify="center" alignItems="center">
              <Grid item xs={12} sm={12} md={8} lg={6}>
                <StyledButton
                  style={{ margin: "6px 0", width: "100%"}}
                  onClick={nextQuestion}
                >{t(isLastQuestion === true ? "test.result" : "test.nextQuestion")}
                </StyledButton>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <SocialShare shareText={t("general.shareQuestion")} style={{marginTop: 0}}/>
          </Grid>
        </Grid>
      </Fade>
    </>
  );
};

export default withTranslation("common")(AnswerFeedbackSlide);