import React from "react";
import SearchResultLink from "../features/SearchResultLink";
import { withTranslation } from "react-i18next";
import searchEngineLogo from "../../assets/searchEngineLogo.svg";

const SearchResults = ({ questionData, onSelectAnswer, t }) => {
  let randomQuery = questionData.searches[Math.floor(Math.random() * questionData.searches.length)];
  const dark = window.matchMedia("(prefers-color-scheme: dark)");

  const pointsController = (index) => {
    if (index === randomQuery.correctAnswerIndex) {
      let correct = questionData.options.correct
      onSelectAnswer(correct.score, "", correct.text, 500)
    } else if (randomQuery.links[index].type === "ad") {
      let partially = questionData.options.partially
      onSelectAnswer(partially.score, "", partially.text, 500)
    } else {
      let wrong = questionData.options.wrong
      onSelectAnswer(wrong.score, "", wrong.text, 500)
    }
  }

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: dark ? "#1d2342" : "#fff",
        color: dark ? "#e5e5ea" : "#3e3e3e",
        borderRadius: 6
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: "6px 6px 0 0",
          padding: 10,
          backgroundColor: dark ? "#10142b" : "#fff",
        }}
      >
        <div style={{marginTop: 3, marginLeft: 3}}><img src={searchEngineLogo} alt="Piggy Sökmotor" width="42"/></div>
        <div
          style={{
            width: "80%",
            display: "flex",
            height: 38,
            alignItems: "center",
            backgroundColor: dark ? "#212959" : "#fff",
            border: dark ? "none" : "1px solid gray",
            padding: "0 15px",
            borderRadius: 19,
            fontSize: "0.85em",
            cursor: "text"
          }}
        >{randomQuery.query}</div>
      </div>
      <div
        style={{
          display: "flex",
          paddingLeft: 20,
          alignItems: "center",
          fontSize: "0.75em",
          fontWeight: "bold",
          backgroundColor: dark ? "#10142b" : "#fff",
        }}
      >
        <div
          style={{
            color: "#7d9efa",
            padding: "7px 0",
            margin: "0 5px",
            borderBottom: "3px solid #7d9efa",
            cursor: "pointer"
          }}
        >{questionData.searchCategories[0]}</div>
        <div
          style={{
            padding: "7px 0",
            margin: "0 5px",
            borderBottom: "3px solid transparent",
            cursor: "pointer",
          }}>{questionData.searchCategories[1]}</div>
        <div
          style={{
            padding: "7px 0",
            margin: "0 5px",
            borderBottom: "3px solid transparent",
            cursor: "pointer",
          }}
        >{questionData.searchCategories[2]}</div>
      </div>
      <div style={{
        padding: 20
      }}>
      {randomQuery.links.map((result, index) => <SearchResultLink data={result} index={index} adNotice={t(questionData.adNotice)} dark={dark} pointsController={pointsController}/>)}
    </div>
    </div>
  );
};

export default withTranslation("common")(SearchResults);
