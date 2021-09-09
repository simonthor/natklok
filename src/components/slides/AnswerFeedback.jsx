import React from "react";
import { withTranslation } from "react-i18next";
import Fade from "react-reveal/Fade";
import { StyledButton, HTMLRenderer, AlignCenter } from "../general";
import { Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import SocialShare from "../features/SocialShare";
import { PALEBLUE, PURPLE } from "../../util/constants";
import MoreInfoModal from "../features/MoreInfoModal";

const AnswerFeedback = ({
  t,
  nextQuestion,
  streak,
  isCorrect,
  isLastQuestion,
  title,
  desc,
  questionId,
  linkToEntireQuiz,
}) => {
  const history = useHistory();

  return (
    <div style={{ height: "100%" }}>
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
      <Fade delay={200}>
        <HTMLRenderer
          style={{
            marginTop: 0,
            fontSize: "1.1em",
          }}
        >
          {desc}
        </HTMLRenderer>
      </Fade>
      <Fade bottom delay={800}>
        <Grid container justify="center" alignItems="center" direction="column">
          {linkToEntireQuiz === false ? (
            <>
              <Grid container justify="center" alignItems="center">
                <Grid item xs={12} sm={12} md={8} lg={6}>
                  <StyledButton
                    style={{ margin: "6px 0", width: "100%" }}
                    onClick={nextQuestion}
                  >
                    {t(
                      isLastQuestion === true
                        ? "test.result"
                        : "test.nextQuestion"
                    )}
                  </StyledButton>
                </Grid>
              </Grid>
              <SocialShare
                questionId={questionId}
                shareText={t("general.shareQuestion")}
                style={{ marginTop: 0 }}
              />
            </>
          ) : (
            <>
              <h2 style={{ marginBottom: 0 }}>{t("test.doTheTestTitle")}</h2>
              <p style={{ marginTop: 6 }}>{t("test.doTheTestDesc")}</p>
              <StyledButton
                style={{ margin: "6px 0", width: "100%" }}
                onClick={() => {
                  history.push("/test");
                  // TODO: Just reset state instead
                  window.location.reload(false);
                }}
              >
                {t("welcome.test")}
              </StyledButton>
            </>
          )}
        </Grid>
      </Fade>
      <MoreInfoModal
        title={t("test.pressToReadMore")}
        content={t("welcome.aboutContent")}
      />
    </div>
  );
};

export default withTranslation("common")(AnswerFeedback);
