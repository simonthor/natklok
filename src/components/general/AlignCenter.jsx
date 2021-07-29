import React from "react";
import Grid from "@material-ui/core/Grid";

const AlignCenter = ({ children }) => (
  <Grid container direction="row" alignItems="center" justify="center">
    <Grid item xs={11} sm={11} md={10} lg={9} xl={8}>
      <Grid container>{children}</Grid>
    </Grid>
  </Grid>
);

export default AlignCenter;
