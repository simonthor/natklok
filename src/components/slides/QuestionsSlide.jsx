import { Grid, Hidden, Input, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import SwipeableViews from "react-swipeable-views";
import stringEntropy from "fast-password-entropy";

// Custom components
import {
  AlignCenter,
  Fade,
  StyledButton,
  StyledMarkdown,
  StyledTextField,
} from "../general";
import AnswerFeedback from "./AnswerFeedback";
import ReactReveal from "react-reveal/Fade";
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
  profileStates,
  increaseScore,
  setCurrentQuestionIndex,
  setconfettiRun,
  setconfettiRecycle,
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
            profileStates={profileStates}
            handleIncrementScore={handleIncrementScore}
            setconfettiRun={setconfettiRun}
            setconfettiRecycle={setconfettiRecycle}
          />
        </div>
      ))}
    </SwipeableViews>
  );
};

//The Question slide is divided into a Question (header) section and an AnswerOptions (body) section
const AnswerOptions = ({ t, questionData, onSelectAnswer, profileForQuestion }) => {
  if (questionData.type === YES_NO) {
    return (
      <>
        <StyledButton
          style={{ margin: "6px 0", width: "100%" }}
          onClick={() => onSelectAnswer(questionData.yes_score)}
        >
          {t("general.yes")}
        </StyledButton>
        <StyledButton
          style={{ margin: "6px 0", width: "100%" }}
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
            <StyledButton
              onClick={() => onSelectAnswer(option.score)}
              style={{ width: "100%", textAlign: "center" }}
            >
              {t(option.text)}
            </StyledButton>
          </div>
        ))}
      </>
    );
  } else if (questionData.type === PASSWORD_INPUT) {
    return <PasswordCheck onSelectAnswer={onSelectAnswer} questionData={questionData} profileForQuestion={profileForQuestion} t={t} />;
  }
};

// Type: Interactive question
// Name: Logging in safe
// Description: A login form customized to fit the profile, which tests the user for the strength of their password.
const PasswordCheck = ({ t, profileForQuestion, questionData, onSelectAnswer }) => {
  const [password, setPassword] = useState("");
  const service = t(questionData.profileBasedService[profileForQuestion].name).split(" ").splice(-1);

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
    <>
      <Grid container justify="center">
        <Grid item xs={12} sm={12} md={11} style={{
          background: questionData.profileBasedService[profileForQuestion].color,
          padding: 30,
          marginTop: 30,
          borderRadius: 8,
          position: "relative",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
        }}>
          <span style={{
            textTransform: "uppercase",
            fontWeight: "bold",
            fontFamily: "sans-serif",
            letterSpacing: -3,
            fontSize: "1.8em",
            color: questionData.profileBasedService[profileForQuestion].thirdColor
          }}>{service}</span>
          <span style={{
            marginLeft: 10,
            color: questionData.profileBasedService[profileForQuestion].thirdColor
          }}>{questionData}</span>
          <h2 style={{color: questionData.profileBasedService[profileForQuestion].thirdColor}}>Skapa ett konto</h2>
          <form onSubmit={handleSubmit}>
            <StyledTextField
              margin="normal"
              fullWidth
              disabled
              defaultValue="bamse@ssf.se"
              variant="filled"
              label="Ange mejladress"
              style={{ marginTop: 5}}
              color={questionData.profileBasedService[profileForQuestion].secondColor}
            />
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
              color={questionData.profileBasedService[profileForQuestion].secondColor}
            />
            <StyledTextField
              inputProps={{ maxLength: 14 }}
              onChange={onChange}
              margin="normal"
              fullWidth
              type="password"
              variant="filled"
              label={t("questions.passwordCheck.confirmLabel")}
              color={questionData.profileBasedService[profileForQuestion].secondColor}
            />
            <button
              type="submit"
              style={{
                width: "100%",
                borderRadius: 5,
                cursor: "pointer",
                background: questionData.profileBasedService[profileForQuestion].thirdColor,
                color: questionData.profileBasedService[profileForQuestion].color,
                fontSize: "1.1em",
                padding: "15px 0",
                fontWeight: "800",
                display: "inline-block",
                margin: "20px 0 0 0",
                transition: "0.3s ease-in-out",
                border: "none",
              }}
            >
              {t("general.next")}
            </button>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

const Question = ({
  t,
  currentIndex,
  index,
  amountOfQuestions,
  questionData,
  profileStates,
  nextQuestion,
  handleIncrementScore,
  setconfettiRun,
  setconfettiRecycle,
}) => {
  const [questionResult, setQuestionResult] = useState(null);
  const [questionResultDesc, setQuestionResultDesc] = useState(null);
  const [questionOpened, setQuestionOpened] = useState(false);
  const [timeSinceOpened, setTimeSinceOpened] = useState(0);
  const [questionPicture] = useState(
    Math.random() > 0.5 ? "row" : "row-reverse"
  );
  const [emojiArt] = useState(generateEmojiArt(questionData.emojis));

  let chosenProfiles = [];
  for(var i in profileStates)
    chosenProfiles.push(i);
  chosenProfiles.shift();
  const profileForQuestion = chosenProfiles[Math.floor(Math.random()*chosenProfiles.length)];

  let questionTitle = t(questionData.title)
  if (questionData.profileBasedTitleVars !== undefined) {
    questionData.profileBasedTitleVars.forEach((value) => {
      questionTitle = questionTitle.replace("{" + value + "}", t(questionData[value][profileForQuestion].name));
    });
  }

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
                      <h1
                        style={{
                          lineHeight: "1.3",
                          fontSize: "1.5em",
                          marginBottom: 0,
                        }}
                      >
                        {questionTitle}
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
                    profileForQuestion={profileForQuestion}
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
