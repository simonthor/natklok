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
  setShowCopied(0.6);
};

const SocialShare = ({ shareText, style, questionId, t }) => {
  const [copiedOpacity, setCopiedOpacity] = useState(0);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        marginBottom: 12,
        marginTop: 12,
        postion: "relative",
      }}
    >
      <button
        id="shareButton"
        onClick={() => {
          copyToClipBoard(setCopiedOpacity, questionId);
        }}
        onTouchStart={() => {
          copyToClipBoard(setCopiedOpacity, questionId);
        }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          pointerEvents: "auto",
          background: "rgba(0,0,0,0)",
          color: "white",
          border: "none",
          ...style,
        }}
      >
        <ShareOutlinedIcon style={{ opacity: "0.6", marginRight: 5 }} />
        <SmallText opacity style={{ marginRight: 10 }}>
          {shareText}
        </SmallText>
      </button>
      <SmallText
        opacity
        style={{
          textAlign: "center",
          width: "100%",
          opacity: copiedOpacity,
          transition: "0.4s ease",
          margin: "0 0 0 0",
        }}
      >
        {t("general.copied")}
      </SmallText>
    </div>
  );
};

export default withTranslation("common")(SocialShare);
