// Third party
import React from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
// Custom
import { StyledButton } from "../components/general";
import { BLUE,PURPLE,PINK,PALEBLUE} from "../util/constants";

const Welcome = ({ t }) => (
  <div style={{
      background: PURPLE,
      height: "100vh",
      display: "flex",
      flexDirection: "row",
      flexWrap:"wrap",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div
        style={{
          textAlign: "center",
          width: "100%",
          position: "relative"
        }}
      >
        <h1 style={{fontSize: "4em", margin:0 }}>{t("welcome.title")}</h1>
        <p>{t("welcome.desc")}</p>
        <p style={{ fontSize: "0.8em",marginBottom:10 }}>{t("general.madeByDU")}</p>
        <div style={{width:150,height:40,background:BLUE,margin:"0 auto",marginBottom:30}}>DU logo</div>
        <Link to="/test">
          <StyledButton>{t("welcome.test")}</StyledButton>
        </Link>
      </div>
  </div>
);

export default withTranslation("common")(Welcome);
