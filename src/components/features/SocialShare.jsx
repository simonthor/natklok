import React, { useEffect, useState } from "react";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import { withTranslation } from "react-i18next";
import SmallText from "components/general/typeography/SmallText";
import { CopyToClipboard } from "react-copy-to-clipboard";

const SocialShare = ({ shareText, style, questionId, t }) => {
  const [copiedOpacity, setCopiedOpacity] = useState(0);

  const onCopy = () => {
    setCopiedOpacity(0.6);
  };

  let href = window.location.href;
  let url = new URL(href);
  // Gets domain name only (even with localhost)
  let domain = (url + "").replace(url.search, "").replace(url.pathname, "");
  let questionUrl = domain + "/test?id=" + questionId;

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
        pointerEvents: "auto",
      }}
    >
      <CopyToClipboard text={questionUrl} onCopy={onCopy}>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
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
      </CopyToClipboard>

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
