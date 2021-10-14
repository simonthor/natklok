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
} from "util/constants";
import ChatQuestion from "components/dynamicQuestions/ChatQuestion";
import FakeWebsite from "components/dynamicQuestions/FakeWebsite";
import OrderQuestion from "components/dynamicQuestions/OrderQuestion";
import YesNoWrapper from "components/features/YesNoWrapper";
import DragToTrash from "components/dynamicQuestions/DragToTrash";
import FakeDomain from "components/dynamicQuestions/FakeDomain";
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
    <div>
      {questions.map((questionData, index) => {
        return (
          <>
            {questionIndex === index && (
              <div key={index} id="questionContainer">
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
    <div
      id="question"
      style={{ width: "100%", maxHeight: "-webkit-fill-available" }}
    >
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
              {questionData.text !== "" && (
                <HTMLRenderer style={{ marginBottom: 12 }}>
                  {changedTitle !== null ? "" : t(questionData.text)}
                </HTMLRenderer>
              )}
            </Fade>
            <AnswerOptions
              t={t}
              contentFadeDelay={contentFadeDelay}
              questionData={questionData}
              profileForQuestion={profileForQuestion}
              onSelectAnswer={onSelectAnswer}
              setChangedTitle={setChangedTitle}
            />
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
  contentFadeDelay,
}) => {
  if (questionData.type === CHAT) {
    return (
      <Fade delay={contentFadeDelay}>
        <ChatQuestion
          t={t}
          questionData={questionData}
          onSelectAnswer={onSelectAnswer}
        />
      </Fade>
    );
  } else if (questionData.type === FAKE_WEBSITE) {
    return (
      <Fade delay={contentFadeDelay}>
        <FakeWebsite
          t={t}
          options={questionData.options}
          onSelectAnswer={onSelectAnswer}
        />
      </Fade>
    );
  } else if (questionData.type === FAKE_DOMAIN) {
    return (
      <Fade delay={contentFadeDelay}>
        <FakeDomain
          t={t}
          options={questionData.options}
          onSelectAnswer={onSelectAnswer}
        />
      </Fade>
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
      <Fade delay={contentFadeDelay}>
        {questionData.options.map((option) => (
          <div style={{ margin: "6px 0" }}>
            <StyledButton
              onClick={() => onSelectAnswer(option.score)}
              style={{
                width: "100%",
                textAlign: "center",
              }}
            >
              {t(option.text)}
            </StyledButton>
          </div>
        ))}
      </Fade>
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
