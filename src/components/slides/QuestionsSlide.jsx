import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import PwdSecurityModal from "../features/PwdSecurity";

// Custom components
import {
  AlignCenter,
  Fade,
  StyledButton,
  HTMLRenderer,
} from "components/general";
import AnswerFeedback from "./AnswerFeedback";
import {
  SEVERAL_OPTION,
  PASSWORD_INPUT,
  CHAT,
  FAKE_WEBSITE,
  DRAG_TO_TRASH,
  ORDER,
} from "util/constants";
import RomanceChat from "components/dynamicQuestions/RomanceChat";
import FakeWebsite from "components/dynamicQuestions/FakeWebsite";
import OrderQuestion from "components/dynamicQuestions/OrderQuestion";
import YesNoWrapper from "components/features/YesNoWrapper";
import DragToTrash from "components/dynamicQuestions/DragToTrash";

// Component that layers all the questions
const Questions = ({
  t,
  nextSlide,
  questions,
  profileStates,
  increaseStarAmount,
  setCurrentQuestionIndex,
  setconfettiRun,
  setconfettiRecycle,
  linkToEntireQuiz,
  setStreak,
  streak,
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

  return (
    <div style={{ height: "100%" }}>
      {questions.map((questionData, index) => (
        <>
          {questionIndex === index && (
            <div key={index} id="questionContainer" style={{ height: "100%" }}>
              <Question
                t={t}
                currentIndex={questionIndex}
                index={index}
                amountOfQuestions={questions.length}
                questionData={questionData}
                nextQuestion={nextQuestion}
                profileStates={profileStates}
                increaseStarAmount={increaseStarAmount}
                setconfettiRun={setconfettiRun}
                setconfettiRecycle={setconfettiRecycle}
                linkToEntireQuiz={linkToEntireQuiz}
                setStreak={setStreak}
                streak={streak}
              />
            </div>
          )}
        </>
      ))}
    </div>
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
  } else if (questionData.type === ORDER) {
    return (
      <OrderQuestion
        questionData={questionData}
        t={t}
        onSelectAnswer={onSelectAnswer}
      />
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
  } else if (questionData.type === DRAG_TO_TRASH) {
    return (
      <DragToTrash
        questionData={questionData}
        onSelectAnswer={onSelectAnswer}
        t={t}
      />
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
      <Fade>
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
      </Fade>
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
  increaseStarAmount,
  setconfettiRun,
  setconfettiRecycle,
  linkToEntireQuiz,
  setStreak,
  streak,
  setStarAmount,
}) => {
  const [changedTitle, setChangedTitle] = useState(null);
  const [questionResult, setQuestionResult] = useState(null);
  const [questionResultAdditionalText, setQuestionResultAdditionalText] =
    useState("");
  const [questionOpened, setQuestionOpened] = useState(false);
  const [timeSinceOpened, setTimeSinceOpened] = useState(0);

  let chosenProfiles = [];
  for (var i in profileStates) chosenProfiles.push(i);
  chosenProfiles.shift();
  const profileForQuestion =
    chosenProfiles[Math.floor(Math.random() * chosenProfiles.length)];

  let questionTitle = t(questionData.title);
  if (questionData.profileBasedTitleVars !== undefined) {
    questionData.profileBasedTitleVars.forEach((value) => {
      if (questionData[value][profileForQuestion] !== undefined) {
        questionTitle = questionTitle.replace(
          "{" + value + "}",
          t(questionData[value][profileForQuestion].name)
        );
      }
    });
  }

  const last = index + 1 === amountOfQuestions;
  let showTextAfterTime = 0.5 + questionTitle.length / 40;
  if (questionData.type === PASSWORD_INPUT) {
    showTextAfterTime = 0;
  }

  const onSelectAnswer = (addedScore, resultText = "") => {
    if (questionResult === null) {
      var res = "";
      if (addedScore > 0.8) {
        res = t("test.correctAnswer");
      } else if (addedScore > 0.5) {
        res = t("test.almostCorrectAnswer");
      } else if (addedScore > 0.3) {
        res = t("test.acceptableAnswer");
      } else {
        res = t("test.wrongAnswer");
      }
      setQuestionResult(res);
      increaseStarAmount(addedScore);
      setQuestionResultAdditionalText(resultText);
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
      setStreak(streak + 1);
    } else {
      setStreak(0);
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
    <div id="question" style={{ height: "100%", width: "100%" }}>
      {questionResult !== null ? (
        <AnswerFeedback
          t={t}
          nextQuestion={nextQuestion}
          streak={streak}
          isLastQuestion={last}
          title={questionResult}
          desc={t(questionData.moreInfo) + questionResultAdditionalText}
          bodyMarkdown={null}
          linkToEntireQuiz={linkToEntireQuiz}
          questionId={questionData.id}
        />
      ) : (
        <YesNoWrapper
          questionData={questionData}
          onSelectAnswer={onSelectAnswer}
          showTextAfterTime={showTextAfterTime}
          timeSinceOpened={timeSinceOpened}
          t={t}
        >
          <AlignCenter withMaxWidth>
            {questionOpened === true ? (
              <Fade>
                <h2
                  style={{
                    minWidth: "100%",
                    width: 0,
                    fontFamily: "Bowlby One SC, Arial, Helvetica, sans-serif",
                    fontWeight: 400,
                  }}
                >
                  {changedTitle !== null ? changedTitle : questionTitle}
                </h2>
              </Fade>
            ) : null}

            {timeSinceOpened > showTextAfterTime ? (
              <Fade>
                <HTMLRenderer style={{ marginBottom: 20, fontSize: "1.1em" }}>
                  {t(questionData.text)}
                </HTMLRenderer>
                <AnswerOptions
                  t={t}
                  questionData={questionData}
                  profileForQuestion={profileForQuestion}
                  onSelectAnswer={onSelectAnswer}
                  setChangedTitle={setChangedTitle}
                />
              </Fade>
            ) : null}
          </AlignCenter>
        </YesNoWrapper>
      )}
    </div>
  );
};

export default withTranslation("common")(Questions);
