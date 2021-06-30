// Third party
import { Grid } from "@material-ui/core";
import React from "react";
import { withTranslation } from "react-i18next";
import InstagramIcon from "@material-ui/icons/Instagram";
// Custom
import { AlignCenter } from "../components/general";
import { Facebook, Twitter } from "@material-ui/icons";
import ToggleLanguage from "../components/features/ToggleLanguage";

const Footer = ({ t }) => {
  return (
    <AlignCenter>
      <Grid container xs={12} justify="space-between">
        <Grid item style={{ height: 30, padding: "3px 15px 15px 15px",backgroundColor: "rgba(0,0,0,0.1)",cursor:"pointer" }}>
          <ToggleLanguage />
        </Grid>
            <Grid item>
              <span
                  style={{
                    margin: 0,
                    padding: "6px",
                    color: "white",
                    fontSize: "0.7em",
                  }}
                >
                  {t("general.share")}
                </span>
              <FooterLink icon={<InstagramIcon style={{ fontSize: 25 }} />} />
              <FooterLink icon={<Facebook style={{ fontSize: 25 }} />} />
              <FooterLink icon={<Twitter style={{ fontSize: 25 }} />} />
            </Grid>
      </Grid>
    </AlignCenter>
  );
};

const FooterLink = ({ icon }) => (
  <div
    style={{
      cursor: "pointer",
      display: "inline-block",
      verticalAlign: "middle",
      color: "white",
      fontSize: 30,
    }}
  >
    {icon}
  </div>
);

export default withTranslation("common")(Footer);
