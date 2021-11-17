import React from "react";
import { withTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import StyledButton from "components//StyledButton";

const QuestionNotFound = ({ t }) => {
  const history = useHistory();

  return (
    <div style={{ textAlign: "center", width: "100%", marginTop: "10%" }}>
      <h3>{t("error.somethingWentWrong")}</h3>
      <p>{t("error.couldntFindQuestion")}</p>
      <StyledButton
        onClick={() => {
          history.push("/");
        }}
      >
        {t("error.returnWelcome")}
      </StyledButton>
    </div>
  );
};

export default withTranslation("common")(QuestionNotFound);
