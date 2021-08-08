import { Grid, Hidden, Input, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import SwipeableViews from "react-swipeable-views";
import stringEntropy from "fast-password-entropy";

// Custom components
import { AlignCenter, Fade, StyledButton, StyledMarkdown, StyledTextField } from "../general";
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
          <>
            <Grid container justify="center" spacing={10} style={{margin: 0}}>
              <Grid item xs={12} sm={7}>
                <ReactReveal delay={700}>
                  <div
                    style={{
                      margin: 0,
                      padding: 0,
                      textAlign: "left",
                      fontFamily: "Bungee, Arial, Helvetica, sans-serif",
                      color: "#1DB6EB",
                      padding: 3,
                      display: "flex",
                      alignItems: "center",
                      fontSize: "1.1em",
                    }}
                  >
                    <span>Streak</span>
                    <div
                      style={{
                        fontSize: "1.2em",
                        padding: 15,
                        borderRadius: 15,
                        marginLeft: 5,
                        display: "inline-block",
                        position: "relative",
                        backgroundColor: "#063955",
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
                  </div>
                </ReactReveal>
                <ReactReveal bottom cascade>
                  <h3
                    style={{
                      fontSize: "5vw",
                      textTransform: "uppercase",
                      margin: 0,
                      padding: 0,
                      textAlign: "left",
                      lineHeight: "1",
                      letterSpacing: 6,
                      fontFamily: "Bowlby One SC, Arial, Helvetica, sans-serif",
                      whiteSpace: "nowrap",
                    }}
                  >{questionResult}</h3>
                </ReactReveal>
                <Grid container>
                  <Grid item md={10}>
                    <ReactReveal delay={400}>
                      <p
                        style={{
                          textAlign: "left",
                          fontSize: "1.4em",
                          margin: "40px 0"
                        }}
                      >
                        När du loggar in på en hemsida, var alltid säker på att
                        adressen du besökt är rätt.
                      </p>
                    </ReactReveal>
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <div style={{
                      backgroundColor: "rgba(0,0,0,0.25)",
                      width: "100%",
                      height: "100%",
                      marginRight: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "rgba(255,255,255,0.6"
                    }}>
                      <span style={{fontSize: "0.9em", marginRight: 10}}>Dela frågan</span>
                      <Instagram style={{ fontSize: 25 }} />
                      <Facebook style={{ fontSize: 25 }} />
                      <Twitter style={{ fontSize: 25 }} />
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <StyledButton onClick={nextQuestion} style={{width: "100%"}}>
                      {t(last === true ? "test.result" : "test.nextQuestion")}
                    </StyledButton>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={5} style={{
                backgroundColor: "rgba(0,0,0,0.25)",
                position: "relative",
                overflow: "scroll",
                textAlign: "left",
                height: "50vh",
                lineHeight: "1.5",
                fontSize: "1.2em",
                minHeight: 300,
              }}>
                <div>
                  <h4 style={{
                    fontFamily: "Bungee, Roboto, sans-serif",
                    fontSize: "1.2em",
                    margin: 0,
                  }}>Du ska vara försiktig.</h4>
                  <p>If you believed most of nature was threatened already, we think it’s useful for you to realize that two thirds of all animals and plants are NOT threatened, yet. One third is terribly high, but it’s still possible to reverse the trend towards mass extinction. A lot of conservation work is successful and more is needed. Every year, biologists across the world study the situation of plants and animals across the world and they publish their findings on the RedList, where you can track the status of more than 120,000 species! That is a lot, but it’s actually just 6% of all known species in the world, and nobody knows what share of all existing species are known. Even among the known species, 94% haven’t yet gotten enough attention to be fully investigated, mainly because it’s very costly to conduct multiple surveys of wild populations of animals and plants over time and track their decline. But new assessments of more species are still added every year, and with the additions to the list, roughly the same proportion is listed as threatened or endangered – around 27%. We have no intention of trivializing the fact that one third of nature is at risk already. But most people thought the situation was even worse, and we believe that may cause resignation, as people lose their hope. We hope this fact helps them realize that there’s still a lot we can and should do to reverse the trend towards mass extinction. It’s not too late, which too many seem to believe.</p>
                </div>
                
              </Grid>
            </Grid>
          </>
        ) : (
          <Grid container direction={questionPicture} justify="center">
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
