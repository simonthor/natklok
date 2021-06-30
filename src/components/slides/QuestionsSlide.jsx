import { Grid, Hidden, Input, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import SwipeableViews from "react-swipeable-views";
import stringEntropy from "fast-password-entropy";

// Custom components
import { AlignCenter, Fade, StyledButton, StyledMarkdown } from "../general";
import ReactReveal from "react-reveal/Fade";

import StyledLink from "../general/StyledLink";
import {
  YES_NO,
  SEVERAL_OPTION,
  HEIGHT,
  PASSWORD_INPUT,
} from "../../util/constants";

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

const Questions = ({ t, nextSlide, questions, score, increaseScore }) => {
  const [questionIndex, setQuestionIndex] = useState(0);

  const nextQuestion = () => {
    if (questionIndex + 1 === questions.length) {
      nextSlide();
    } else {
      setQuestionIndex(questionIndex + 1);
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
          style={{ margin: "6px 0" }}
          onClick={() => onSelectAnswer(questionData.yes_score)}
        >
          {t("general.yes")}
        </StyledButton>
        <StyledButton
          style={{ margin: "6px 0" }}
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
            <StyledButton onClick={() => onSelectAnswer(option.score)}>
              {t(option.text)}
            </StyledButton>
          </div>
        ))}
      </>
    );
  } else if (questionData.type === PASSWORD_INPUT) {
    return <PasswordCheck onSelectAnswer={onSelectAnswer} />;
  }
};

const PasswordCheck = ({ onSelectAnswer }) => {
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
      style={{
        width: "95%",
      }}
      onSubmit={handleSubmit}
    >
      <TextField
        inputProps={{ maxLength: 14 }}
        onChange={onChange}
        margin="normal"
        fullWidth
        autoFocus={true}
        type="text"
      />
      <button type="submit">Fortsätt</button>
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
      <Grid container xs={12} style={{ textAlign: "center" }}>
        {questionResult !== null ? (
          <ReactReveal style={{ width: "100%",margin: "0 auto" }}>
            <Grid container xs={12} justify="center">
              <Grid item xs={12} sm={8} md={6} lg={4}>
                <h2>{questionResult}</h2>
                <StyledMarkdown style={{ textAlign: "justify" }}>
                  {questionResultDesc}
                </StyledMarkdown>
                <StyledMarkdown style={{ textAlign: "justify" }}>
                  {t(questionData.moreInfo)}
                </StyledMarkdown>

                <StyledButton onClick={nextQuestion}>
                  {t(last === true ? "test.result" : "test.nextQuestion")}
                </StyledButton>
                <p>
                  <StyledLink colored href={questionData.readMoreLink}>
                    {t("test.pressToReadMore")}
                  </StyledLink>
                </p>
              </Grid>
            </Grid>
          </ReactReveal>
        ) : (
          <Grid container direction={questionPicture}>
            <Grid item sm={12} md={6} style={{ textAlign: "start" }}>
              {questionOpened === true ? (
                <Fade>
                  <Grid
                    container
                    justify="space-between"
                    alignItems="flex-end"
                    style={{ marginBottom: 20 }}
                  >
                    <Grid item>
                      <p
                        style={{ fontSize: "3em", fontWeight: 900, margin: 0 }}
                      >
                        {index + 1}{" "}
                        <span style={{ opacity: 0.5, fontSize: "0.5em" }}>
                          / {amountOfQuestions}
                        </span>
                      </p>
                    </Grid>
                    <Grid item>
                      <h2 style={{ margin: "0 0 6px 0" }}>
                        {t(questionData.title)}
                      </h2>
                    </Grid>
                  </Grid>
                </Fade>
              ) : null}

              {timeSinceOpened > showTextAfterTime ? (
                <Fade>
                  <StyledMarkdown style={{ marginBottom: 20 }}>
                    {t(questionData.text)}
                  </StyledMarkdown>
                  <AnswerOptions
                    t={t}
                    questionData={questionData}
                    onSelectAnswer={onSelectAnswer}
                  />
                </Fade>
              ) : null}
            </Grid>
            <Hidden smDown>
              <Grid item sm={12} md={6} style={{ textAlign: "center" }}>
                {questionOpened === true ? (
                  <ReactReveal>
                    <div
                      style={{
                        width: "90%",
                        height: (HEIGHT === 0) ? 500 : HEIGHT - 10,
                        position: "relative",
                      }}
                    >
                      {emojiArt.map((emojiArtObj) => (
                        <span
                          style={{
                            position: "absolute",
                            top: emojiArtObj.top,
                            left: emojiArtObj.left,
                            transform: "rotate(" + emojiArtObj.rot + "deg)",
                            fontSize: emojiArtObj.fontSize,
                          }}
                        >
                          {emojiArtObj.emoji}
                        </span>
                      ))}
                    </div>
                  </ReactReveal>
                ) : null}
              </Grid>
            </Hidden>
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
