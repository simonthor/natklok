import { Grid, Hidden, Input, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import SwipeableViews from "react-swipeable-views";
import stringEntropy from "fast-password-entropy";

// Custom components
import { AlignCenter, Fade, StyledButton, StyledMarkdown, StyledTextField } from "../general";
import AnswerFeedback from "./AnswerFeedback";
import ReactReveal from "react-reveal/Fade";
import { Facebook, Twitter, Instagram } from "@material-ui/icons";
import StyledLink from "../general/StyledLink";
import {
  YES_NO,
  SEVERAL_OPTION,
  HEIGHT,
  PASSWORD_INPUT,
  PALEBLUE,
  PURPLE,
} from "../../util/constants";

// Deprecated: Emoji art used in Yes/No & Multiple choice questions
const generateEmojiArt = (arrayOfEmojis) => {
  let emojiArt = [];
  let style = "random";

  if (style === "random") {
    for (let i = 0; i < arrayOfEmojis.length; i++) {
      const emoji = arrayOfEmojis[i];
      const amountOfEmoji = Math.random() * (15 / arrayOfEmojis.length);
      for (let j = 0; j < amountOfEmoji; j++) {
        const top = Math.random() * 80 + "%";
        const left = Math.random() * 80 + "%";
        const fontSize = Math.random() * 18 + 18;
        const rot = Math.random() * 100 - 50;
        emojiArt.push({ emoji, top, left, fontSize, rot });
      }
    }
  }

  return emojiArt;
};

// Component that layers all the questions
const Questions = ({
  t,
  nextSlide,
  questions,
  score,
  increaseScore,
  setCurrentQuestionIndex,
  setconfettiRun,
  setconfettiRecycle
}) => {
  const [questionIndex, setQuestionIndex] = useState(0);

  const nextQuestion = () => {
    if (questionIndex + 1 === questions.length) {
      nextSlide();
    } else {
      setQuestionIndex(questionIndex + 1);
      setCurrentQuestionIndex(questionIndex + 2);
    }
  };

  const handleIncrementScore = (score) => {
    increaseScore(score);
  };

  return (
    <SwipeableViews index={questionIndex}>
      {questions.map((questionData, index) => (
        <div key={index}>
          <Question
            t={t}
            currentIndex={questionIndex}
            index={index}
            amountOfQuestions={questions.length}
            questionData={questionData}
            nextQuestion={nextQuestion}
            handleIncrementScore={handleIncrementScore}
            setconfettiRun={setconfettiRun}
            setconfettiRecycle={setconfettiRecycle}
          />
        </div>
      ))}
    </SwipeableViews>
  );
};

const AnswerOptions = ({ t, questionData, onSelectAnswer }) => {
  if (questionData.type === YES_NO) {
    return (
      <>
        <StyledButton
          style={{ margin: "6px 0",width: "100%" }}
          onClick={() => onSelectAnswer(questionData.yes_score)}
        >
          {t("general.yes")}
        </StyledButton>
        <StyledButton
          style={{ margin: "6px 0",width: "100%" }}
          onClick={() => onSelectAnswer(questionData.no_score)}
        >
          {t("general.no")}
        </StyledButton>
      </>
    );
  } else if (questionData.type === SEVERAL_OPTION) {
    return (
      <>
        {questionData.options.map((option) => (
          <div style={{ margin: "6px 0" }}>
            <StyledButton onClick={() => onSelectAnswer(option.score)} style={{width: "100%", textAlign: "center"}}>
              {t(option.text)}
            </StyledButton>
          </div>
        ))}
      </>
    );
  } else if (questionData.type === PASSWORD_INPUT) {
    return <PasswordCheck onSelectAnswer={onSelectAnswer} t={t} />;
  }
};

const PasswordCheck = ({ t, onSelectAnswer }) => {
  const [password, setPassword] = useState("");
  const onChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(stringEntropy(password));
    let score = stringEntropy(password) / 92; // 92 seems to be the max for 14 chars
    if (score > 0.8) {
      onSelectAnswer(
        score,
        "Utmärkt lösenord! (" + stringEntropy(password) + "/95 entropi)"
      );
    } else if (score > 0.6) {
      onSelectAnswer(
        score,
        "Bra lösenord! (" + stringEntropy(password) + "/95 entropi)"
      );
    } else if (score > 0.4) {
      onSelectAnswer(
        score,
        "Helt okej lösenord. (" + stringEntropy(password) + "/95 entropi)"
      );
    } else {
      onSelectAnswer(
        score,
        "Dåligt lösenord... (" + stringEntropy(password) + "/95 entropi)"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
    >
      <TextField
        id="disable-pwd-mgr-1"
        name="disable-pwd-mgr-1"
        value="disable-pwd-mgr-1"
        type="password"
        style={{ display: "none" }}
      />
      <TextField
        id="disable-pwd-mgr-2"
        name="disable-pwd-mgr-2"
        value="disable-pwd-mgr-2"
        type="password"
        style={{ display: "none" }}
      />
      <TextField
        id="disable-pwd-mgr-3"
        name="disable-pwd-mgr-3"
        value="disable-pwd-mgr-3"
        type="password"
        style={{ display: "none" }}
      />
      <StyledTextField
        inputProps={{ maxLength: 14 }}
        onChange={onChange}
        margin="normal"
        fullWidth
        autoFocus={true}
        type="password"
        variant="filled"
        label={t("questions.passwordCheck.inputLabel")}
      />
      <button
        type="submit"
        style={{
          borderRadius: 4,
          cursor: "pointer",
          fontSize: "1.1em",
          background: PALEBLUE,
          color: PURPLE,
          padding: "14px 50px",
          fontWeight: "800",
          display: "inline-block",
          margin: 0,
          transition: "0.3s ease-in-out",
          border: "none",
        }}
      >
        {t("general.next")}
      </button>
    </form>
  );
};

const Question = ({
  t,
  currentIndex,
  index,
  amountOfQuestions,
  questionData,
  nextQuestion,
  handleIncrementScore,
  setconfettiRun,
  setconfettiRecycle
}) => {
  const [questionResult, setQuestionResult] = useState(null);
  const [questionResultDesc, setQuestionResultDesc] = useState(null);
  const [questionOpened, setQuestionOpened] = useState(false);
  const [timeSinceOpened, setTimeSinceOpened] = useState(0);
  const [questionPicture] = useState(
    Math.random() > 0.5 ? "row" : "row-reverse"
  );
  const [emojiArt] = useState(generateEmojiArt(questionData.emojis));

  const last = index + 1 === amountOfQuestions;
  const showTextAfterTime = t(questionData.title).length / 25;
  let streak = 0;

  const onSelectAnswer = (addedScore, resultText = "") => {
    if (questionResult === null) {
      var res = "";
      if (resultText != "") {
        res = resultText;
      } else if (addedScore > 0.8) {
        res = t("test.correctAnswer");
      } else if (addedScore > 0.5) {
        res = t("test.almostCorrectAnswer");
      } else if (addedScore > 0.3) {
        res = t("test.acceptableAnswer");
      } else {
        res = t("test.wrongAnswer");
      }
      setQuestionResult(res);
      handleIncrementScore(addedScore);
    }
    if (addedScore > 0.3) {
      setconfettiRun(true);
      setTimeout(() => {
        setconfettiRecycle(false);
      }, 500);
      setTimeout(() => {
        setconfettiRun(false);
        setconfettiRecycle(true);
      }, 6000);
      streak += 1;
    } else {
      streak = 0;
    }
  };

  useEffect(() => {
    if (index === currentIndex) {
      setQuestionOpened(true);
    }
    setTimeout(() => {
      if (questionOpened === true && timeSinceOpened <= showTextAfterTime) {
        setTimeSinceOpened(timeSinceOpened + 0.1);
      }
    }, 100);
  }, [currentIndex, index, questionOpened, showTextAfterTime, timeSinceOpened]);

  return (
    <Wrapper>
      <Grid container justify="center">
        {questionResult !== null ? (
          <AnswerFeedback
            t={t}
            nextQuestion={nextQuestion}
            streak={null}
            isCorrect={true}
            isLastQuestion={last}
            title={questionResult}
            desc={t(questionData.moreInfo)}
            bodyMarkdown={null}
          />
        ) : (
          <Grid container direction={questionPicture} justify="center">
            <Grid item sm={12} md={6} style={{ textAlign: "start" }}>
              {questionOpened === true ? (
                <Fade>
                  <Grid container>
                    <Grid item xs={12}>
                      <h1 style={{ lineHeight:"1.3", fontSize: "1.5em", marginBottom: 0 }}>
                        {t(questionData.title)}
                      </h1>
                    </Grid>
                  </Grid>
                </Fade>
              ) : null}

              {timeSinceOpened > showTextAfterTime ? (
                <ReactReveal>
                  <StyledMarkdown style={{ marginBottom: 20 }}>
                    {t(questionData.text)}
                  </StyledMarkdown>
                  <AnswerOptions
                    t={t}
                    questionData={questionData}
                    onSelectAnswer={onSelectAnswer}
                  />
                </ReactReveal>
              ) : null}
            </Grid>
          </Grid>
        )}
      </Grid>
    </Wrapper>
  );
};

const Wrapper = ({ children }) => {
  return (
    <AlignCenter>
      <div
        style={{
          textAlign: "center",
          width: "100%",
          padding: 20,
        }}
      >
        {children}
      </div>
    </AlignCenter>
  );
};

export default withTranslation("common")(Questions);
