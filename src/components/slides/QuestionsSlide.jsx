import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import PwdSecurityModal from "components/features/PwdSecurity";

// Custom components
import AlignCenter from "components/general/AlignCenter";
import Fade from "react-reveal/Fade";
import StyledButton from "components/general/StyledButton";
import HTMLRenderer from "components/general/HTMLRenderer";
import AnswerFeedback from "./AnswerFeedback";

import {
  SEVERAL_OPTION,
  PASSWORD_INPUT,
  CHAT,
  FAKE_WEBSITE,
  DRAG_TO_TRASH,
  ORDER,
  FAKE_DOMAIN,
  YES_NO,
  SEARCH_RESULT
} from "util/constants";
import ChatQuestion from "components/dynamicQuestions/ChatQuestion";
import FakeWebsite from "components/dynamicQuestions/FakeWebsite";
import OrderQuestion from "components/dynamicQuestions/OrderQuestion";
import YesNoWrapper from "components/features/YesNoWrapper";
import DragToTrash from "components/dynamicQuestions/DragToTrash";
import FakeDomain from "components/dynamicQuestions/FakeDomain";
import SearchResult from "components/dynamicQuestions/SearchResult";
import { addCorrectAnswer } from "util/totalScore";
import Title from "components/general/typeography/Title";

// Component that layers all the questions
const Questions = ({
  t,
  nextSlide,
  questions,
  profileStates,
  increaseStarAmount,
  setconfettiRun,
  setconfettiRecycle,
  linkToEntireQuiz,
  setStreak,
  streak,
  questionIndex,
  setQuestionIndex,
  redoTest,
}) => {
  const nextQuestion = () => {
    if (questionIndex + 1 === questions.length) {
      nextSlide();
    } else {
      setQuestionIndex(questionIndex + 1);
    }
  };

  return (
    <div style={{ height: "100%" }}>
      {questions.map((questionData, index) => {
        return (
          <>
            {questionIndex === index && (
              <div
                key={index}
                id="questionContainer"
                style={{ height: "100%" }}
              >
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
                  redoTest={redoTest}
                />
              </div>
            )}
          </>
        );
      })}
    </div>
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
  increaseStarAmount,
  setconfettiRun,
  setconfettiRecycle,
  linkToEntireQuiz,
  setStreak,
  streak,
  redoTest,
}) => {
  const [changedTitle, setChangedTitle] = useState(null);
  const [questionResult, setQuestionResult] = useState(null);
  const [questionResultAdditionalText, setQuestionResultAdditionalText] =
    useState("");
  const [questionOpened, setQuestionOpened] = useState(false);

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
  let contentFadeDelay = (0.5 + questionTitle.length / 40) * 1000;
  if (questionData.type === PASSWORD_INPUT) {
    contentFadeDelay = 0;
  }

  const onSelectAnswer = (
    addedScore,
    resultText = "",
    resultTitle = "",
    waitUntilShowAnswer = 0
  ) => {
    setTimeout(() => {
      if (questionResult === null) {
        if (addedScore > 0.8) {
          addCorrectAnswer(questionData.id);
        }

        var res = "";
        if (resultTitle !== "") {
          res = resultTitle;
        } else if (addedScore > 0.8) {
          res = t("test.correctAnswer");
        } else {
          res = t("test.wrongAnswer");
        }
        setQuestionResult(res);
        increaseStarAmount(addedScore);
        setQuestionResultAdditionalText(resultText);
      }

      if (addedScore > 0.8) {
        setconfettiRecycle(true);
        setconfettiRun(true);

        setTimeout(() => {
          setconfettiRecycle(false);
        }, 1200);
        setTimeout(() => {
          setconfettiRun(false);
        }, 5000);
        setStreak(streak + 1);
      } else {
        setStreak(0);
      }
    }, waitUntilShowAnswer);
  };

  useEffect(() => {
    if (index === currentIndex) {
      setQuestionOpened(true);
    }
  }, [setQuestionOpened, index, currentIndex]);

  if (questionOpened === false) {
    return null;
  }

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
          questionData={questionData}
          bodyMarkdown={null}
          evenMoreInfo={questionData.evenMoreInfo}
          linkToEntireQuiz={linkToEntireQuiz}
          questionId={questionData.id}
          redoTest={redoTest}
        />
      ) : (
        <YesNoWrapper
          questionData={questionData}
          onSelectAnswer={onSelectAnswer}
          contentFadeDelay={contentFadeDelay}
          t={t}
        >
          <AlignCenter
            withMaxWidth
            centerBothAxis={questionData.type !== YES_NO} // Messes up the wrapper otherwise
          >
            <Fade>
              <Title style={{ textAlign: "left" }}>
                {changedTitle !== null ? changedTitle : questionTitle}
              </Title>
            </Fade>

            <Fade delay={contentFadeDelay}>
              <HTMLRenderer style={{ marginBottom: 20 }}>
                {changedTitle !== null ? "" : t(questionData.text)}
              </HTMLRenderer>
              <AnswerOptions
                t={t}
                questionData={questionData}
                profileForQuestion={profileForQuestion}
                onSelectAnswer={onSelectAnswer}
                setChangedTitle={setChangedTitle}
              />
            </Fade>
          </AlignCenter>
        </YesNoWrapper>
      )}
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
  switch (questionData.type) {
    case CHAT:
      return (
        <ChatQuestion
        t={t}
        questionData={questionData}
        onSelectAnswer={onSelectAnswer}
      />
      )
    case FAKE_WEBSITE:
      return (
        <FakeWebsite
          t={t}
          options={questionData.options}
          onSelectAnswer={onSelectAnswer}
        />
      );
    case FAKE_DOMAIN:
      return (
        <FakeDomain
          t={t}
          options={questionData.options}
          onSelectAnswer={onSelectAnswer}
        />
      );
    case ORDER:
      return (
        <OrderQuestion
          questionData={questionData}
          t={t}
          onSelectAnswer={onSelectAnswer}
        />
      );
    case SEVERAL_OPTION:
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
    case DRAG_TO_TRASH:
      return (
        <DragToTrash
          questionData={questionData}
          onSelectAnswer={onSelectAnswer}
          t={t}
        />
      );
    case PASSWORD_INPUT:
      return (
        <PasswordCheck
          onSelectAnswer={onSelectAnswer}
          questionData={questionData}
          profileForQuestion={profileForQuestion}
          t={t}
          setChangedTitle={setChangedTitle}
        />
      );
    case SEARCH_RESULT:
      return (
        <SearchResult
          t={t}
          questionData={questionData}
          onSelectAnswer={onSelectAnswer}
        />
      );
    default:
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
      onSelectAnswer(1, "", t("questions.passwordCheck.result0"));
    } else if (score > 0.8) {
      onSelectAnswer(1, "", t("questions.passwordCheck.result1"));
    } else if (score > 0.6) {
      onSelectAnswer(0, "", t("questions.passwordCheck.result2"));
    } else {
      onSelectAnswer(0, "", t("questions.passwordCheck.result3"));
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

export default withTranslation("common")(Questions);
