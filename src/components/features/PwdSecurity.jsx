import React, { useState, useEffect } from "react";
import { withTranslation } from "react-i18next";
import { Grid } from "@material-ui/core";
import getPwdSecurity from "../../util/getPwdSecurity";
import language from "hsimp-purescript/language/english";
import characterSets from "hsimp-purescript/data/character-sets";
import common from "hsimp-purescript/data/common/top10k";
import patterns from "hsimp-purescript/data/patterns";
import { StyledTextField } from "../general";
import { GENERAL_PROFILE, SOCIAL_MEDIA_PROFILE } from "../../util/constants";

const PwdSecurityModal = ({
  t,
  profileForQuestion = SOCIAL_MEDIA_PROFILE,
  questionData,
  setPassword,
  setPwdIsSecure,
}) => {
  const [pwd, setPwd] = useState("");
  const [pwdTime, setPwdTime] = useState("");
  const [notice, setNotice] = useState("");
  const [checks, setChecks] = useState({});
  const [profileBasedService] = useState(
    questionData.profileBasedService[profileForQuestion]
  );

  const config = {
    calculationsPerSecond: 40e9,
    namedNumbers: true,
    language: language,
    checks: {
      characterSets: characterSets,
      common: common,
      patterns: patterns,
    },
  };
  let hsimp = getPwdSecurity(config);

  const onChange = (e) => {
    let res = hsimp(e.target.value);
    setPassword(e.target.value);
    setPwd(e.target.value);
    setPwdTime(res.time);
    setNotice(res.level);
    setChecks(res.checks);
    setPwdIsSecure(res.time.includes("years"));
  };

  return (
    <>
      <div
        style={{
          background: profileBasedService.color,
          padding: 10,
          borderRadius: 8,
          position: "relative",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
        }}
      >
        <span
          style={{
            textTransform: "uppercase",
            fontWeight: "bold",
            fontFamily: "sans-serif",
            letterSpacing: -3,
            fontSize: "1.8em",
            color: profileBasedService.thirdColor,
          }}
        >
          {t(profileBasedService.name).split(" ").splice(-1)}
        </span>
        <span
          style={{
            marginLeft: 10,
            color: profileBasedService.thirdColor,
          }}
        >
          Allt samlat.
        </span>
        <StyledTextField
          onChange={onChange}
          margin="normal"
          fullWidth
          autoFocus
          variant="filled"
          label={t("questions.passwordCheck.inputPlaceholder")}
          color={profileBasedService.secondColor}
        />
        <div
          style={{
            borderRadius: 5,
            background: profileBasedService.thirdColor,
            color: profileBasedService.color,
            fontSize: "0.8em",
            padding: "15px 0",
            transition: "0.3s ease-in-out",
            border: "none",
            textAlign: "center",
            width: "100%",
            display: pwd === "" ? "none" : "inline-block",
          }}
        >
          <h3 style={{ margin: 0, opacity: "0.8" }}>
            {t("questions.passwordCheck.resultPrefix")}
          </h3>
          <h2
            style={{
              margin: "5px 0",
              lineHeight: 1,
              fontSize: "1.7em",
              fontWeight: "800",
            }}
          >
            {pwdTime}
          </h2>
          <h3 style={{ margin: 0, opacity: "0.8" }}>
            {t("questions.passwordCheck.resultSuffix")}
          </h3>
        </div>
        <span
          style={{
            display: "block",
            marginTop: 15,
            textAlign: "center",
            fontSize: "0.7em",
            opacity: "0.7",
            color: profileBasedService.thirdColor,
            lineHeight: 1,
          }}
        >
          Använder samma teknologi som howsecureismypassword.net
        </span>
      </div>
    </>
  );
};

export default withTranslation("common")(PwdSecurityModal);
