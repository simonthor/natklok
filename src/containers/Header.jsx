import React from "react";
// Material UI
import Grid from "@material-ui/core/Grid";
import TranslateOutlinedIcon from '@material-ui/icons/TranslateOutlined';
import StarOutlineRoundedIcon from '@material-ui/icons/StarOutlineRounded';

// Custom components
import { AlignCenter, Logo, StyledNavLink } from "../components/general";
import DUlogo from "../assets/duLogo.svg";

export default () => {
  return (
    <AlignCenter>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        paddingTop: 8
      }}>
        <div>
          <a>
            <StarOutlineRoundedIcon/>
          </a>
        </div>
        <div>
          <p style={{ fontSize: "0.8em", display: "block", width: "100%", margin: 0 }}>
            I samarbete med
          </p>
          <p style={{ fontSize: "0.9em", display: "block", width: "100%", margin: 0 }}>
            Digital Ungdom
          </p>
        </div>
        <div>
          <a>
            <TranslateOutlinedIcon/>
          </a>
        </div>
      </div>
    </AlignCenter>
  );
};
