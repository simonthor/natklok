import { Grid, Hidden, Input, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import SwipeableViews from "react-swipeable-views";
import PwdSecurityModal from "../features/PwdSecurity";

// Custom components
import { AlignCenter, Fade, StyledButton, StyledMarkdown, StyledTextField } from "components/general";
import AnswerFeedback from "./AnswerFeedback";
import ReactReveal from "react-reveal/Fade";
import { Facebook, Twitter, Instagram } from "@material-ui/icons";
import StyledLink from "components/general/StyledLink";
import {
  YES_NO,
  SEVERAL_OPTION,
  HEIGHT,
  PASSWORD_INPUT,
  PALEBLUE,
  PURPLE,
} from "util/constants";

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
const AnswerOptions = ({ t, questionData, onSelectAnswer, profileForQuestion, setChangedTitle }) => {
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
  return <PasswordCheck onSelectAnswer={onSelectAnswer} questionData={questionData} profileForQuestion={profileForQuestion} t={t} setChangedTitle={setChangedTitle} />;
  }
};

// Type: Interactive question
// Name: Logging in safe
// Description: A login form customized to fit the profile, which tests the user for the strength of their password.
const PasswordCheck = ({ t, profileForQuestion, questionData, onSelectAnswer, setChangedTitle }) => {
  const [password, setPassword] = useState("");
  const [showSecond, setShowSecond] = useState(false);
  const [pwdIsSecure, setPwdIsSecure] = useState(null);
  const handleSubmit = (score) => {
    if (score > 0.8 && pwdIsSecure) {
      onSelectAnswer(
        score,
        t("questions.passwordCheck.result0")
      );
    } else if (score > 0.8) {
      onSelectAnswer(
        score,
        t("questions.passwordCheck.result1")
      );
    } else if (score > 0.6) {
      onSelectAnswer(
        score,
        t("questions.passwordCheck.result2")
      );
    } else {
      onSelectAnswer(
        score,
        t("questions.passwordCheck.result3")
      );
    }
  };
  const handleClick = () => {
    setChangedTitle(pwdIsSecure ? t("questions.passwordCheck.secondTitle").replace("{password}", password) : t("questions.passwordCheck.secondTitleUnsecurePwd"));
    setShowSecond(true);
  };

  if (showSecond) {
    return (
      <>
        {questionData.options.map((option) => (
          <div style={{ margin: "6px 0" }}>
            <StyledButton
              onClick={() => handleSubmit(option.score)}
              style={{ width: "100%", textAlign: "center" }}
            >
              {t(option.text)}
            </StyledButton>
          </div>
        ))}
      </>
    );
  } else {
    return(
      <>
      <PwdSecurityModal t={t} profileForQuestion={profileForQuestion} questionData={questionData} setPassword={setPassword} setPwdIsSecure={setPwdIsSecure} />
      <StyledButton
        style={{ margin: "20px 0", width: "100%", textAlign: "center" }}
        disabled={password.length > 0 ? false : true}
        onClick={handleClick}
      >{t("test.nextQuestion")}
      </StyledButton>
      </>
    );
  };
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
  const [changedTitle, setChangedTitle] = useState(null);
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

  let questionTitle = t(questionData.title);
  if (questionData.profileBasedTitleVars !== undefined) {
    questionData.profileBasedTitleVars.forEach((value) => {
      questionTitle = questionTitle.replace("{" + value + "}", t(questionData[value][profileForQuestion].name));
    });
  }

  const last = index + 1 === amountOfQuestions;
  const showTextAfterTime = 0;
  let streak = 0;

  const onSelectAnswer = (addedScore, resultText = "") => {
    console.log(addedScore, resultText);
    if (questionResult === null) {
      var res = "";
      if (resultText !== "") {
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
                        {changedTitle !== null ? changedTitle : questionTitle}
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
                    setChangedTitle={setChangedTitle}
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
