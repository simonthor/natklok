import React from "react";
// Material UI
import Grid from "@material-ui/core/Grid";

// Custom components
import { AlignCenter, Logo, StyledNavLink } from "../components/general";
import ToggleLanguage from "../components/features/ToggleLanguage";

export default () => {
  return (
    <AlignCenter>
      <div
        style={{ width: "100%", margin: "10px 0", background: "rgba(0,0,0,0)" }}
      >
        <Grid container alignItems="center" justify="space-between">
          <Grid item>
            <StyledNavLink exact to="/">
              <Logo />
            </StyledNavLink>
          </Grid>
          <Grid item>
            <Grid container>
              <ToggleLanguage />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </AlignCenter>
  );
};
