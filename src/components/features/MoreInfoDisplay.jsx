import React, { useState } from "react";
import { PURPLE, WHITE } from "../../util/constants";
import { withTranslation } from "react-i18next";

import { AlignCenter, HTMLRenderer, StyledButton } from "../general";

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
          marginTop: "1.5em",
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
            fontSize: "0.9em",
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
            marginTop: "2em",
            background: WHITE,
            position: fixed ? "fixed" : "none",
            bottom: 0,
            color: PURPLE,
            transititon: "height 0.5s",
            height: aboutExpanded ? "auto" : 0,
            overflow: "hidden",
            width: "100%",
          }}
        >
          <div style={{ padding: "2em 0" }}>
            <AlignCenter>
              <HTMLRenderer>{content}</HTMLRenderer>
              {buttonComponent}
            </AlignCenter>
          </div>
        </div>
      )}
    </>
  );
};

export default withTranslation("common")(MoreInfoDisplay);
