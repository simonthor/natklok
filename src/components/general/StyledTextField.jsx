import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { PALEBLUE, WHITE } from "../../util/constants";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: WHITE,
    },
  },
  typography: {
    color: WHITE,
  },
});

export default ({ inputProps, onChange, margin, fullWidth, autoFocus, type, variant, label, style }) => {
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
        style={{
          color: WHITE,
          ...style
        }}
        color="primary"
      />
    </ThemeProvider>
  );
}