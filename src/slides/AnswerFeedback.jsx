import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import Fade from "react-reveal/Fade";
import StyledButton from "components//StyledButton";
import AlignCenter from "components/AlignCenter";
import HTMLRenderer from "components//HTMLRenderer";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import SocialShare from "features/SocialShare";
import MoreInfoDisplay from "features/MoreInfoDisplay";
import { PALEBLUE, PURPLE } from "util/constants";
import Title from "components/typeography/Title";
import Subtitle from "components/typeography/Subtitle";

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
  redoTest,
}) => {
  // Scroll to top of page so that mobile doesn't look bad
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
            <Title>{title}</Title>
          </Fade>
          <Fade delay={800}>
            <HTMLRenderer
              style={{
                marginTop: 0,
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
        redoTest={redoTest}
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
  redoTest,
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
                redoTest={redoTest}
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
            redoTest={redoTest}
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
  redoTest,
  t,
}) => {
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
      <div style={{ padding: "0 1em", textAlign: "center" }}>
        <Subtitle style={{ marginBottom: 0, marginTop: 42 }}>
          {t("test.doTheTestTitle")}
        </Subtitle>
        <p style={{ marginTop: 6 }}>{t("test.doTheTestDesc")}</p>
        <StyledButton
          style={{ margin: "0px 0 18px 0", paddingLeft: 24, paddingRight: 24 }}
          caps
          onClick={() => {
            redoTest(false);
          }}
        >
          {t("welcome.test")}
        </StyledButton>
      </div>
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
