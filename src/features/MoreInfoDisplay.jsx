import React, { useState } from "react";
import { PURPLE, WHITE } from "util/constants";
import { withTranslation } from "react-i18next";

import AlignCenter from "components/AlignCenter";
import HTMLRenderer from "components/HTMLRenderer";
import StyledButton from "components/StyledButton";

const MoreInfoDisplay = ({
  title,
  content,
  t,
  buttonComponent = null,
  fixed = false,
  setExpanded = (val) => {},
}) => {
  const [aboutExpanded, setAboutExpanded] = useState(false);

  return (
    <>
      <div
        style={{
          marginTop: 16,
          width: "100%",
          textAlign: "center",
        }}
      >
        <StyledButton
          onClick={() => {
            setAboutExpanded(!aboutExpanded);
            setExpanded(!aboutExpanded);
          }}
          style={{
            background: "rgba(0,0,0,0)",
            color: "white",
            border: "1px solid white",
            padding: "0.5em 1.5em",
          }}
        >
          {aboutExpanded === false && title}
          {aboutExpanded === true && t("general.close")}
        </StyledButton>
      </div>
      {aboutExpanded && (
        <div
          style={{
            minHeight: "70vh",
            marginTop: 16,
            background: WHITE,
            position: fixed ? "fixed" : "none",
            left: 0,
            bottom: 0,
            color: PURPLE,
            transititon: "height 0.5s",
            height: aboutExpanded ? "auto" : 0,
            overflow: "hidden",
            width: "100%",
          }}
        >
          <AlignCenter>
            <HTMLRenderer>{content}</HTMLRenderer>
            {buttonComponent}
          </AlignCenter>
        </div>
      )}
    </>
  );
};

export default withTranslation("common")(MoreInfoDisplay);
