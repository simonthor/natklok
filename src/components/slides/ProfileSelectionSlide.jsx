import { Checkbox, FormControlLabel, Grid } from "@material-ui/core";
import React from "react";
import { withTranslation } from "react-i18next";
import ReactReveal from "react-reveal/Fade";

// Custom components
import { AlignCenter, StyledButton } from "../general";
import {
  BANK_PROFILE,
  GAMING_PROFILE,
  STREAMING_PROFILE,
  SOCIAL_MEDIA_PROFILE,
} from "../../util/constants";

const ProfileSelectionSlide = ({
  t,
  nextSlide,
  profileState,
  handleProfileCheckboxChecked,
}) => {
  return (
    <ReactReveal>
      <AlignCenter>
        <Grid
          container
          direction="column"
          xs={12}
          style={{ textAlign: "center", margin: "40px 0 20px 0" }}
        >
          <h2 style={{ margin: 0 }}>{t("profileSelection.title")}</h2>
          <p style={{ margin: 0 }}>{t("profileSelection.desc")}</p>
        </Grid>
        <Grid container xs={12} alignItems="center" justify="center">
          <Grid item xs={11} sm={12} md={8} lg={6} xl={4}>
            <Grid container xs={12} spacing={1}>
              <ProfilCheckbox
                t={t}
                profileState={profileState}
                handleChange={handleProfileCheckboxChecked}
                name={BANK_PROFILE}
              />
              <ProfilCheckbox
                t={t}
                profileState={profileState}
                handleChange={handleProfileCheckboxChecked}
                name={GAMING_PROFILE}
              />
              <ProfilCheckbox
                t={t}
                profileState={profileState}
                handleChange={handleProfileCheckboxChecked}
                name={STREAMING_PROFILE}
              />
              <ProfilCheckbox
                t={t}
                profileState={profileState}
                handleChange={handleProfileCheckboxChecked}
                name={SOCIAL_MEDIA_PROFILE}
              />
            </Grid>
            <Grid
              container
              direction="column"
              xs={12}
              style={{ textAlign: "center", paddingRight: 8, marginTop: 20 }}
            >
              <StyledButton onClick={nextSlide}>
                {t("general.next")}
              </StyledButton>
            </Grid>
          </Grid>
        </Grid>
      </AlignCenter>
    </ReactReveal>
  );
};

const ProfilCheckbox = ({ profileState, handleChange, name, t }) => {
  return (
    <Grid item xs={6}>
      <div
        style={{
          background: "rgba(62, 166, 207, 0.3)",
          borderRadius: 4,
          width: "100%",
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={profileState[name]}
              onChange={handleChange}
              name={name}
            />
          }
          style={{ paddingLeft: 12 }}
          label={t("profileSelection.profiles." + name)}
        />
      </div>
    </Grid>
  );
};

export default withTranslation("common")(ProfileSelectionSlide);
