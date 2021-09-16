import React from "react";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { WHITE } from "util/constants";

export default ({
  inputProps,
  onChange,
  margin,
  fullWidth,
  autoFocus,
  type,
  variant,
  label,
  disabled,
  defaultValue,
  color = "#fff",
  style,
}) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: color,
      },
    },
    typography: {
      color: color,
    },
  });

  const useStyles = makeStyles({
    root: {
      "& .Mui-focused": {
        color: color,
      },
      "& .Mui-disabled": {
        color: color,
      },
      "& label": {
        color: color,
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: color,
      },
    },
  });
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <TextField
        inputProps={inputProps}
        onChange={onChange}
        margin={margin}
        fullWidth={fullWidth}
        autoFocus={autoFocus}
        type={type}
        variant={variant}
        label={label}
        defaultValue={defaultValue}
        disabled={disabled}
        style={{
          color: WHITE,
          ...style,
        }}
        color="primary"
        className={classes.root}
      />
    </ThemeProvider>
  );
};
