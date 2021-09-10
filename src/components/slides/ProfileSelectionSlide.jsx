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
import { AlignCenter, StyledButton } from "../general";
import {
  BANK_PROFILE,
  GAMING_PROFILE,
  STREAMING_PROFILE,
  SOCIAL_MEDIA_PROFILE,
  PURPLE,
} from "../../util/constants";

const ProfileSelectionSlide = ({
  t,
  nextSlide,
  profileState,
  handleProfileCheckboxChecked,
}) => {
  return (
    <AlignCenter>
      <ReactReveal>
        <Grid
          container
          direction="column"
          xs={12}
          style={{ textAlign: "center", margin: "0 0 20px 0" }}
        >
          <h2
            style={{
              margin: "0 0 10px 0",
              fontSize: 31,
              fontFamily: "Bungee, Roboto, sans-serif",
            }}
          >
            {t("profileSelection.title")}
          </h2>
          <p style={{ margin: "0 0 25px 0", fontSize: 19, marginBottom: 0 }}>
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
                name={BANK_PROFILE.title}
                icon={<AccountBalanceWalletOutlinedIcon />}
                checkedIcon={
                  <AccountBalanceWalletIcon
                    style={{ color: "rgba(0,0,0,0.7)" }}
                  />
                }
                color={BANK_PROFILE.color}
                dark={BANK_PROFILE.dark}
              />
              <ProfilCheckbox
                t={t}
                profileState={profileState}
                handleChange={handleProfileCheckboxChecked}
                name={GAMING_PROFILE.title}
                icon={<SportsEsportsOutlinedIcon />}
                checkedIcon={
                  <SportsEsportsIcon style={{ color: "rgba(0,0,0,0.7)" }} />
                }
                color={GAMING_PROFILE.color}
                dark={GAMING_PROFILE.dark}
              />
              <ProfilCheckbox
                t={t}
                profileState={profileState}
                handleChange={handleProfileCheckboxChecked}
                name={STREAMING_PROFILE.title}
                icon={<MovieOutlinedIcon />}
                checkedIcon={<MovieIcon style={{ color: "rgba(0,0,0,0.7)" }} />}
                color={STREAMING_PROFILE.color}
                dark={STREAMING_PROFILE.dark}
              />
              <ProfilCheckbox
                t={t}
                profileState={profileState}
                handleChange={handleProfileCheckboxChecked}
                name={SOCIAL_MEDIA_PROFILE.title}
                icon={<ShareOutlinedIcon />}
                checkedIcon={
                  <ShareIcon style={{ color: "rgba(255,255,255,0.8)" }} />
                }
                color={SOCIAL_MEDIA_PROFILE.color}
                dark={SOCIAL_MEDIA_PROFILE.dark}
              />
            </Grid>
            <Grid
              container
              direction="column"
              xs={12}
              style={{ textAlign: "center", paddingRight: 8, marginTop: 10 }}
            >
              <p style={{ fontSize: "0.7em", opacity: 0.8 }}>
                {t("profileSelection.desc")}
              </p>
              <StyledButton onClick={nextSlide}>
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
          borderRadius: 8,
          border: profileState[name]
            ? "4px solid rgba(0, 0, 0, 0.2)"
            : "4px solid transparent",
          width: "100%",
          padding: "3px 0",
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
