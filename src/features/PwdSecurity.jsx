import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import getPwdSecurity from "util/getPwdSecurity";
import language from "hsimp-purescript/language/english";
import characterSets from "hsimp-purescript/data/character-sets";
import common from "hsimp-purescript/data/common/top10k";
import patterns from "hsimp-purescript/data/patterns";
import { SOCIAL_MEDIA_PROFILE } from "util/constants";
import { RemoveRedEye } from "@material-ui/icons";
import Subtitle from "components/typeography/Subtitle";
import SmallText from "components/typeography/SmallText";
import StyledTextField from "components/StyledTextField";

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
  const [visiblePwd, setVisiblePwd] = useState(false);
  const [profileBasedService] = useState(
    questionData.profileBasedService[profileForQuestion]
  );

  const toggleVisiblePwd = () => {
    setVisiblePwd(!visiblePwd);
  };

  const translate = (time) => {
    time = time.replace("pico", "piko");
    time = time.replace("micro", "mikro");
    time = time.replace("hundred", "hundra");
    time = time.replace("thousand", "tusen");
    time = time.replace("million", "miljoner");
    time = time.replace("billion", "miljarder");
    time = time.replace("Instantly", "0 sekunder");

    time = time.replace("seconds", "sekunder");
    time = time.replace("second", "sekund");

    time = time.replace("minutes", "minuter");
    if (time.includes("minuter") === false) {
      time = time.replace("minute", "minut");
    }

    time = time.replace("hours", "timmar");
    time = time.replace("hour", "timme");

    time = time.replace("days", "dagar");
    time = time.replace("day", "dag");

    time = time.replace("weeks", "veckor");
    time = time.replace("week", "vecka");

    time = time.replace("months", "månader");
    time = time.replace("month", "månad");

    time = time.replace("years", "år");
    time = time.replace("year", "år");

    return time;
  };

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
    setPwdTime(translate(res.time));
    setNotice(res.level);
    setChecks(res.checks);
    setPwdIsSecure(res.time.includes("years"));
  };

  return (
    <>
      <div
        style={{
          background: profileBasedService.color,
          padding: "6px 6px 2px 6px",
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
            fontSize: 24,
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
        <div style={{ position: "relative" }}>
          <StyledTextField
            onChange={onChange}
            margin="none"
            fullWidth
            autoFocus
            variant="filled"
            size="small"
            //type={visiblePwd === true ? "default" : "password"}
            label={t("questions.passwordCheck.inputPlaceholder")}
            color={profileBasedService.secondColor}
          />
          {/*<EyeVisibleButton
            visiblePwd={visiblePwd}
            toggleVisiblePwd={toggleVisiblePwd}
          />*/}
        </div>
        <div
          style={{
            borderRadius: 5,
            background: profileBasedService.thirdColor,
            color: profileBasedService.color,
            transition: "0.3s ease-in-out",
            marginTop: 4,
            padding: "6px 0",
            border: "none",
            textAlign: "center",
            width: "100%",
            display: pwd === "" ? "none" : "inline-block",
          }}
        >
          <SmallText style={{ margin: 0, opacity: "0.8" }}>
            {t("questions.passwordCheck.resultPrefix")}
          </SmallText>
          <Subtitle
            style={{
              margin: "5px 0",
              lineHeight: 1,
              fontWeight: "800",
            }}
          >
            {pwdTime}
          </Subtitle>
          <SmallText style={{ margin: 0, opacity: "0.8" }}>
            {t("questions.passwordCheck.resultSuffix")}
          </SmallText>
        </div>
        <SmallText
          opacity
          xs
          style={{
            display: "block",
            marginTop: 6,
            textAlign: "center",
            color: profileBasedService.thirdColor,
            lineHeight: 1,
          }}
        >
          Använder samma teknologi som howsecureismypassword.net
        </SmallText>
      </div>
    </>
  );
};

const EyeVisibleButton = ({ visiblePwd, toggleVisiblePwd }) => {
  return (
    <div
      style={{
        position: "absolute",
        right: 10,
        top: 0,
        paddingTop: 32,
        cursor: "pointer",
      }}
      onClick={toggleVisiblePwd}
    >
      <RemoveRedEye
        style={{
          color: visiblePwd ? "rgba(0,0,0,0.)" : "rgba(0,0,0,0.4)",
        }}
      />
    </div>
  );
};

export default withTranslation("common")(PwdSecurityModal);
