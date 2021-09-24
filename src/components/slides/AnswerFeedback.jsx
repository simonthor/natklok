import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import Fade from "react-reveal/Fade";
import { StyledButton, AlignCenter, HTMLRenderer } from "components/general";
import { Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import SocialShare from "components/features/SocialShare";
import MoreInfoDisplay from "components/features/MoreInfoDisplay";
import { PALEBLUE, PURPLE } from "util/constants";

const AnswerFeedback = ({
  t,
  nextQuestion,
  streak,
  isLastQuestion,
  title,
  desc,
  questionId,
  evenMoreInfo,
  linkToEntireQuiz,
}) => {
  // Scroll to top of page so that mobile doesn't look bad
  useEffect(() => {
    window.scrollTo(0, 0);
  });

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
        </div>
      </AlignCenter>
      <ReadMoreOrContinue
        t={t}
        evenMoreInfo={evenMoreInfo}
        linkToEntireQuiz={linkToEntireQuiz}
        nextQuestion={nextQuestion}
        isLastQuestion={isLastQuestion}
        questionId={questionId}
      />
    </div>
  );
};

const ReadMoreOrContinue = ({
  linkToEntireQuiz,
  nextQuestion,
  isLastQuestion,
  questionId,
  evenMoreInfo,
  t,
}) => {
  const [moreInfoExpanded, setMoreInfoExpanded] = useState(false);

  return (
    <Fade delay={800}>
      <Grid container justify="center" alignItems="center" direction="column">
        {evenMoreInfo !== undefined && (
          <MoreInfoDisplay
            title={t("test.pressToReadMore")}
            content={t(evenMoreInfo)}
            setExpanded={setMoreInfoExpanded}
            buttonComponent={
              <NextQuestionOrDoTestButton
                t={t}
                linkToEntireQuiz={linkToEntireQuiz}
                nextQuestion={nextQuestion}
                isLastQuestion={isLastQuestion}
                questionId={questionId}
              />
            }
          />
        )}

        {moreInfoExpanded === false && (
          <NextQuestionOrDoTestButton
            t={t}
            linkToEntireQuiz={linkToEntireQuiz}
            nextQuestion={nextQuestion}
            isLastQuestion={isLastQuestion}
            questionId={questionId}
          />
        )}
      </Grid>
    </Fade>
  );
};

const NextQuestionOrDoTestButton = ({
  linkToEntireQuiz,
  nextQuestion,
  isLastQuestion,
  questionId,
  t,
}) => {
  const history = useHistory();

  if (linkToEntireQuiz === false) {
    return (
      <>
        <Grid container justify="center" alignItems="center">
          <StyledButton
            style={{ marginTop: 24, width: 300 }}
            onClick={nextQuestion}
          >
            {t(isLastQuestion === true ? "test.result" : "test.nextQuestion")}
          </StyledButton>
        </Grid>
        <SocialShare
          questionId={questionId}
          shareText={t("general.shareQuestion")}
          style={{ marginTop: 0 }}
        />
      </>
    );
  } else {
    return (
      <>
        <h2 style={{ marginBottom: 0, marginTop: "10vh" }}>
          {t("test.doTheTestTitle")}
        </h2>
        <p style={{ marginTop: 6, fontSize: "1em" }}>
          {t("test.doTheTestDesc")}
        </p>
        <StyledButton
          style={{ margin: "6px 0 2em 0" }}
          onClick={() => {
            history.push("/test");
            // TODO: Just reset state instead
            window.location.reload(false);
          }}
        >
          {t("welcome.test")}
        </StyledButton>
      </>
    );
  }
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
            marginTop: 6,
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
