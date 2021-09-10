import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import SwipeableViews from "react-swipeable-views";
import PwdSecurityModal from "../features/PwdSecurity";

// Custom components
import { AlignCenter, Fade, StyledButton, HTMLRenderer } from "../general";
import AnswerFeedback from "./AnswerFeedback";
import ReactReveal from "react-reveal/Fade";
import {
  YES_NO,
  SEVERAL_OPTION,
  PASSWORD_INPUT,
  CHAT,
  FAKE_WEBSITE,
} from "../../util/constants";
import RomanceChat from "../dynamicQuestions/RomanceChat";
import FakeWebsite from "../dynamicQuestions/FakeWebsite";

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
  linkToEntireQuiz,
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
    <SwipeableViews
      index={questionIndex}
      style={{ height: "100%" }}
      containerStyle={{ height: "100%" }}
      id="questionsSlide"
    >
      {questions.map((questionData, index) => (
        <div key={index} id="questionContainer" style={{ height: "100%" }}>
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
            linkToEntireQuiz={linkToEntireQuiz}
          />
        </div>
      ))}
    </SwipeableViews>
  );
};

//The Question slide is divided into a Question (header) section and an AnswerOptions (body) section
const AnswerOptions = ({
  t,
  questionData,
  onSelectAnswer,
  profileForQuestion,
  setChangedTitle,
}) => {
  if (questionData.type === CHAT) {
    return (
      <RomanceChat
        t={t}
        options={questionData.options}
        onSelectAnswer={onSelectAnswer}
      />
    );
  } else if (questionData.type === FAKE_WEBSITE) {
    return (
      <FakeWebsite
        t={t}
        options={questionData.options}
        onSelectAnswer={onSelectAnswer}
      />
    );
  } else if (questionData.type === YES_NO) {
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
    return (
      <PasswordCheck
        onSelectAnswer={onSelectAnswer}
        questionData={questionData}
        profileForQuestion={profileForQuestion}
        t={t}
        setChangedTitle={setChangedTitle}
      />
    );
  } else {
    alert("Error: No suitable question type found.");
    return null;
  }
};

// Type: Interactive question
// Name: Logging in safe
// Description: A login form customized to fit the profile, which tests the user for the strength of their password.
const PasswordCheck = ({
  t,
  profileForQuestion,
  questionData,
  onSelectAnswer,
  setChangedTitle,
}) => {
  const [password, setPassword] = useState("");
  const [showSecond, setShowSecond] = useState(false);
  const [pwdIsSecure, setPwdIsSecure] = useState(null);
  const handleSubmit = (score) => {
    if (score > 0.8 && pwdIsSecure) {
      onSelectAnswer(score, t("questions.passwordCheck.result0"));
    } else if (score > 0.8) {
      onSelectAnswer(score, t("questions.passwordCheck.result1"));
    } else if (score > 0.6) {
      onSelectAnswer(score, t("questions.passwordCheck.result2"));
    } else {
      onSelectAnswer(score, t("questions.passwordCheck.result3"));
    }
  };

  const handleClick = () => {
    setChangedTitle(
      pwdIsSecure
        ? t("questions.passwordCheck.secondTitle").replace(
            "{password}",
            password
          )
        : t("questions.passwordCheck.secondTitleUnsecurePwd")
    );
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
    return (
      <div>
        <PwdSecurityModal
          t={t}
          profileForQuestion={profileForQuestion}
          questionData={questionData}
          setPassword={setPassword}
          setPwdIsSecure={setPwdIsSecure}
        />
        <StyledButton
          style={{ margin: "20px 0", width: "100%", textAlign: "center" }}
          disabled={password.length > 0 ? false : true}
          onClick={handleClick}
        >
          {t("test.nextQuestion")}
        </StyledButton>
      </div>
    );
  }
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
  linkToEntireQuiz,
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
  for (var i in profileStates) chosenProfiles.push(i);
  chosenProfiles.shift();
  const profileForQuestion =
    chosenProfiles[Math.floor(Math.random() * chosenProfiles.length)];

  let questionTitle = t(questionData.title);
  if (questionData.profileBasedTitleVars !== undefined) {
    questionData.profileBasedTitleVars.forEach((value) => {
      console.log(questionData[value][profileForQuestion]);
      if (questionData[value][profileForQuestion] !== undefined) {
        questionTitle = questionTitle.replace(
          "{" + value + "}",
          t(questionData[value][profileForQuestion].name)
        );
      }
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
    <div id="question" style={{ height: "100%" }}>
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
          linkToEntireQuiz={linkToEntireQuiz}
          questionId={questionData.id}
        />
      ) : (
        <AlignCenter withMaxWidth>
          {questionOpened === true ? (
            <h2 style={{ minWidth: "100%", width: 0 }}>
              {changedTitle !== null ? changedTitle : questionTitle}
            </h2>
          ) : null}

          {timeSinceOpened > showTextAfterTime ? (
            <>
              <HTMLRenderer style={{ marginBottom: 20 }}>
                {t(questionData.text)}
              </HTMLRenderer>
              <AnswerOptions
                t={t}
                questionData={questionData}
                profileForQuestion={profileForQuestion}
                onSelectAnswer={onSelectAnswer}
                setChangedTitle={setChangedTitle}
              />
            </>
          ) : null}
        </AlignCenter>
      )}
    </div>
  );
};

export default withTranslation("common")(Questions);
