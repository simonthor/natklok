import React from "react";
import { useState } from "react";

import { Hidden } from "@material-ui/core";
import { WarningOutlined } from "@material-ui/icons";

const SearchResults = ({ options, onSelectAnswer, t }) => {
  const [scams, setScams] = useState({
    httpFound: false,
    finalDomainScam: false,
  });

  let amountFound = 0;
  Object.values(scams).forEach((found) => {
    if (found === true) {
      amountFound += 1;
    }
  });
  if (amountFound === Object.values(scams).length) {
    onSelectAnswer(1, "", "", 500); 
  }

  const dark = window.matchMedia("(prefers-color-scheme: dark)");

  return (
    <div style={{
      width: "100%",
      backgroundColor: dark ? "#151e4a" : "#e5e5ea",
      color: dark ? "#e5e5ea" : "#151e4a",
      padding: 20
    }}>
    </div>
  );
};

export default SearchResults;
