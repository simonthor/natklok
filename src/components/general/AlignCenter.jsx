import React from "react";
import Grid from "@material-ui/core/Grid";

const AlignCenter = ({ children, key }) => (
  <Grid
    container
    direction="row"
    alignItems="center"
    justify="center"
    key={key}
  >
    <Grid item xs={11} sm={11} md={10} lg={9} xl={8}>
      <Grid container>{children}</Grid>
    </Grid>
  </Grid>
);

export default AlignCenter;
