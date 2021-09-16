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
  isLastQuestion,
  title,
  desc,
  questionId,
  linkToEntireQuiz,
}) => {
  const history = useHistory();

  return (
    <div style={{ height: "100%" }}>
      <AlignCenter withMaxWidth={true}>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <StreakDisplay streak={streak} />
          <Fade>
            <h1
              style={{
                marginTop: 8,
                textTransform: "uppercase",
                marginBottom: 0,
                textAlign: "center",
                fontFamily: "Bowlby One SC, Arial, Helvetica, sans-serif",
              }}
            >
              {title}
            </h1>
          </Fade>
          <Fade delay={800}>
            <HTMLRenderer
              style={{
                marginTop: 0,
                fontSize: "1.1em",
                textAlign: "center",
              }}
            >
              {desc}
            </HTMLRenderer>
          </Fade>
          <Fade bottom delay={800}>
            <Grid
              container
              justify="center"
              alignItems="center"
              direction="column"
            >
              {linkToEntireQuiz === false ? (
                <>
                  <Grid container justify="center" alignItems="center">
                    <StyledButton
                      style={{ marginTop: 24, width: "100%" }}
                      onClick={nextQuestion}
                    >
                      {t(
                        isLastQuestion === true
                          ? "test.result"
                          : "test.nextQuestion"
                      )}
                    </StyledButton>
                  </Grid>
                  <SocialShare
                    questionId={questionId}
                    shareText={t("general.shareQuestion")}
                    style={{ marginTop: 0 }}
                  />
                </>
              ) : (
                <>
                  <h2 style={{ marginBottom: 0, marginTop: "10vh" }}>
                    {t("test.doTheTestTitle")}
                  </h2>
                  <p style={{ marginTop: 6 }}>{t("test.doTheTestDesc")}</p>
                  <StyledButton
                    style={{ margin: "6px 0" }}
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
        </div>
      </AlignCenter>
      <MoreInfoModal
        title={t("test.pressToReadMore")}
        content={t("welcome.aboutContent")}
        buttonComponent={
          <StyledButton
            style={{ marginTop: 24, width: "100%" }}
            onClick={nextQuestion}
          >
            {t(isLastQuestion === true ? "test.result" : "test.nextQuestion")}
          </StyledButton>
        }
      />
    </div>
  );
};

const StreakDisplay = ({ streak }) => {
  if (streak > 1) {
    return (
      <Fade bottom delay={400}>
        <Grid
          container
          xs={12}
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
    );
  } else {
    return null;
  }
};

export default withTranslation("common")(AnswerFeedback);
