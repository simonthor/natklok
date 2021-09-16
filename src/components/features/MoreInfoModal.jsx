import React, { useState } from "react";
import { PURPLE, WHITE } from "../../util/constants";
import BottomFade from "../general/Fade";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { AlignCenter, HTMLRenderer, StyledButton } from "../general";

const MoreInfoModal = ({ title, content, buttonComponent = null }) => {
  const [aboutExpanded, setaboutExpanded] = useState(false);
  const toggleExpand = () => setaboutExpanded(!aboutExpanded);

  return (
    <div
      style={{ position: "absolute", zIndex: 100, bottom: 0, width: "100%" }}
    >
      <BottomFade>
        <div
          style={{
            background: WHITE,
            color: PURPLE,
            transititon: "height 0.5s",
            height: aboutExpanded ? "auto" : 38,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              textAlign: "center",
              background: "rgba(0,0,0,0.05)",
              padding: 8,
              cursor: "pointer",
              maxHeight: 40,
              fontWeight: 600,
            }}
            onClick={toggleExpand}
          >
            {title}
            {aboutExpanded ? (
              <ExpandMoreIcon style={{ marginBottom: -5 }} />
            ) : (
              <ExpandLessIcon style={{ marginBottom: -5 }} />
            )}
          </div>
          <AlignCenter>
            <div
              style={{
                padding: "10px 20px 20px 20px",
                overflow: "scroll",
                height: "70vh",
              }}
            >
              <HTMLRenderer>{content}</HTMLRenderer>
              {buttonComponent}
            </div>
          </AlignCenter>
        </div>
      </BottomFade>
    </div>
  );
};

export default MoreInfoModal;
