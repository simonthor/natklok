// Third party
import React from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
// Custom
import { Logo, StyledButton } from "../components/general";
import { PURPLE, HEIGHT } from "../util/constants";

const Welcome = ({ t }) => (
  <div
    style={{
      background: PURPLE,
      height: HEIGHT,
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <div
      style={{
        textAlign: "center",
        width: "100%",
        position: "relative",
      }}
    >
      <Logo large />
      <p>{t("welcome.desc")}</p>

      <Link to="/test">
        <StyledButton>{t("welcome.test")}</StyledButton>
      </Link>
    </div>
  </div>
);

export default withTranslation("common")(Welcome);
