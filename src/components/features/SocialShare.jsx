import React, { useState } from "react";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import { withTranslation } from "react-i18next";
import SmallText from "components/general/typeography/SmallText";

const copyToClipBoard = (setShowCopied, questionId) => {
  let href = window.location.href;
  let url = new URL(href);
  // Gets domain name only (even with localhost)
  let domain = (url + "").replace(url.search, "").replace(url.pathname, "");
  let questionUrl = domain + "/test?id=" + questionId;
  navigator.clipboard.writeText(questionUrl);
  setShowCopied(true);
};

const SocialShare = ({ shareText, style, questionId, t }) => {
  const [showCopied, setShowCopied] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <div
        onClick={() => {
          copyToClipBoard(setShowCopied, questionId);
        }}
        style={{
          marginTop: 8,
          padding: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          ...style,
        }}
      >
        <ShareOutlinedIcon style={{ opacity: "0.6", marginRight: 5 }} />
        <SmallText opacity style={{ marginRight: 10 }}>
          {shareText}
        </SmallText>
      </div>
      {showCopied && (
        <SmallText opacity style={{ margin: 0 }}>
          {t("general.copied")}
        </SmallText>
      )}
    </div>
  );
};

export default withTranslation("common")(SocialShare);
