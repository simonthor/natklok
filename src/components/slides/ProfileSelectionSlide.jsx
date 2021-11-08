import { Checkbox, FormControlLabel, Grid } from "@material-ui/core";
import React from "react";
import { withTranslation } from "react-i18next";
import ReactReveal from "react-reveal/Fade";

import AccountBalanceWalletOutlinedIcon from "@material-ui/icons/AccountBalanceWalletOutlined";
import SportsEsportsOutlinedIcon from "@material-ui/icons/SportsEsportsOutlined";
import MovieOutlinedIcon from "@material-ui/icons/MovieOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import MovieIcon from "@material-ui/icons/Movie";
import ShareIcon from "@material-ui/icons/Share";

// Custom components
import AlignCenter from "components/general/AlignCenter";
import StyledButton from "components/general/StyledButton";
import {
  BANK_PROFILE,
  GAMING_PROFILE,
  STREAMING_PROFILE,
  SOCIAL_MEDIA_PROFILE,
  PROFILE_STYLING,
} from "util/constants";
import Title from "components/general/typeography/Title";
import SmallText from "components/general/typeography/SmallText";

const ProfileSelectionSlide = ({
  t,
  nextSlide,
  profileState,
  handleProfileCheckboxChecked,
}) => {
  return (
    <AlignCenter centerBothAxis>
      <ReactReveal>
        <Grid
          container
          direction="column"
          xs={12}
          style={{ textAlign: "center", margin: "0 0 20px 0" }}
        >
          <Title>{t("profileSelection.title")}</Title>
          <p style={{ margin: 0, fontWeight: "bold" }}>
            {t("profileSelection.subtitle")}
          </p>
        </Grid>
        <Grid container alignItems="center" justify="center">
          <Grid item xs={12} sm={12} md={11} lg={10} xl={9}>
            <Grid container xs={12} spacing={1}>
              <ProfilCheckbox
                t={t}
                profileState={profileState}
                handleChange={handleProfileCheckboxChecked}
                name={BANK_PROFILE}
                icon={<AccountBalanceWalletOutlinedIcon />}
                checkedIcon={
                  <AccountBalanceWalletIcon
                    style={{ color: "rgba(0,0,0,0.7)" }}
                  />
                }
                color={PROFILE_STYLING[BANK_PROFILE].color}
                dark={PROFILE_STYLING[BANK_PROFILE].dark}
              />
              <ProfilCheckbox
                t={t}
                profileState={profileState}
                handleChange={handleProfileCheckboxChecked}
                name={GAMING_PROFILE}
                icon={<SportsEsportsOutlinedIcon />}
                checkedIcon={
                  <SportsEsportsIcon style={{ color: "rgba(0,0,0,0.7)" }} />
                }
                color={PROFILE_STYLING[GAMING_PROFILE].color}
                dark={PROFILE_STYLING[GAMING_PROFILE].dark}
              />
              <ProfilCheckbox
                t={t}
                profileState={profileState}
                handleChange={handleProfileCheckboxChecked}
                name={STREAMING_PROFILE}
                icon={<MovieOutlinedIcon />}
                checkedIcon={<MovieIcon style={{ color: "rgba(0,0,0,0.7)" }} />}
                color={PROFILE_STYLING[STREAMING_PROFILE].color}
                dark={PROFILE_STYLING[STREAMING_PROFILE].dark}
              />
              <ProfilCheckbox
                t={t}
                profileState={profileState}
                handleChange={handleProfileCheckboxChecked}
                name={SOCIAL_MEDIA_PROFILE}
                icon={<ShareOutlinedIcon />}
                checkedIcon={
                  <ShareIcon style={{ color: "rgba(255,255,255,0.8)" }} />
                }
                color={PROFILE_STYLING[SOCIAL_MEDIA_PROFILE].color}
                dark={PROFILE_STYLING[SOCIAL_MEDIA_PROFILE].dark}
              />
            </Grid>
            <Grid
              container
              direction="column"
              xs={12}
              style={{ textAlign: "center", paddingRight: 8, marginTop: 2 }}
            >
              <SmallText opacity>{t("profileSelection.desc")}</SmallText>
              <StyledButton
                onClick={nextSlide}
                caps
                style={{ marginBottom: 24 }}
              >
                {t("general.next")}
              </StyledButton>
            </Grid>
          </Grid>
        </Grid>
      </ReactReveal>
    </AlignCenter>
  );
};

const ProfilCheckbox = ({
  profileState,
  handleChange,
  name,
  icon,
  checkedIcon,
  color,
  dark,
  t,
}) => {
  return (
    <Grid item xs={12} sm={12} md={6}>
      <div
        style={{
          background: profileState[name] ? color : "rgba(0, 0, 0, 0.2)",
          borderRadius: 12,
          border: profileState[name]
            ? "4px solid rgba(0, 0, 0, 0.2)"
            : "4px solid transparent",
          width: "100%",
          padding: 0,
          color: profileState[name]
            ? dark
              ? "rgba(0, 0, 0, 0.7)"
              : "rgba(255, 255, 255, 0.8)"
            : "white",
          boxSizing: "border-box",
          transition: "all 0.2s",
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={profileState[name]}
              onChange={handleChange}
              name={name}
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ color: "white" }}
            />
          }
          style={{ paddingLeft: 5, marginLeft: 0, width: "100%" }}
          label={t("profileSelection.profiles." + name)}
        />
      </div>
    </Grid>
  );
};

export default withTranslation("common")(ProfileSelectionSlide);
