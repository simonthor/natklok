import React, { useState } from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { PINK, PURPLE, WHITE } from "../../util/constants";
import i18next from "i18next";
import { withTranslation } from "react-i18next";
import TranslateOutlinedIcon from "@material-ui/icons/TranslateOutlined";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

//TODO: Fix Radio buttons not updating bug
//TODO: Fix setIsOpen firing when user changes language bug

const theme = createMuiTheme({
  typography: {
    body1: {
      fontSize: "0.87em",
      color: PURPLE,
      whiteSpace: "nowrap",
    },
  },
  overrides: {
    MuiFormLabel: {
      root: {
        "&$focused": {
          color: PURPLE,
        },
      },

      focused: {},
    },
  },
});

const useStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  icon: {
    borderRadius: "50%",
    width: 24,
    height: 24,
    boxShadow:
      "inset 0 0 0 2px rgba(16,22,26,.2), inset 0 -2px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "#fafafa",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: "white",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 24,
      height: 24,
      backgroundImage:
        "radial-gradient(" + PINK + "," + PINK + " 33%,transparent 37%)",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#fafafa",
    },
  },
  legend: {
    margin: "2px 0 10px 0",
    fontSize: "0.9em",
    fontWeight: "bold",
  },
});

// Inspired by blueprintjs
const StyledRadio = (props) => {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={
        <span className={`${classes.icon} ${classes.checkedIcon}`} />
      }
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
};

function RadioButtonsGroup() {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (event) => {
    i18next.changeLanguage(event.target.value);
  };

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <div
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        style={{ cursor: "pointer" }}
      >
        <TranslateOutlinedIcon />
      </div>
      <div
        style={{
          backgroundColor: "white",
          borderRadius: 3,
          boxShadow: "0 2px 5px 0 rgba(0,0,0,.14), 0 2px 10px 0 rgba(0,0,0,.1)",
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 100,
          overflow: "hidden",
          display: isOpen ? "block" : "none",
        }}
      >
        <div
          style={{
            padding: 20,
          }}
        >
          <ThemeProvider theme={theme}>
            <FormControl component="fieldset">
              <FormLabel component="legend" className={classes.legend}>
                Change language
              </FormLabel>
              <RadioGroup
                aria-label="language"
                name="lang1"
                defaultValue="swe"
                onChange={handleChange}
              >
                <FormControlLabel
                  value="swe"
                  control={<StyledRadio />}
                  label="Svenska - SV"
                />
                <FormControlLabel
                  value="en"
                  control={<StyledRadio />}
                  label="English - EN"
                />
              </RadioGroup>
            </FormControl>
          </ThemeProvider>
        </div>
        <div
          style={{
            backgroundColor: PINK,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 8,
            fontSize: "0.9em",
            fontWeight: "bold",
            color: WHITE,
            cursor: "pointer",
          }}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <span>Close</span>
        </div>
      </div>
    </div>
  );
}

export default withTranslation("common")(RadioButtonsGroup);
