import React from "react";
import Grid from "@material-ui/core/Grid";

const AlignCenter = ({
  children,
  key,
  marginTop = true,
  withMaxWidth = false,
  row = false,
}) => (
  <Grid
    id="alignCenter"
    container
    direction={row === true ? "row" : "column"}
    alignItems="center"
    justify="center"
    key={key}
    style={{
      paddingTop: marginTop && "5vh",
      width: withMaxWidth ? "100%" : "auto",
    }}
  >
    <Grid item xs={11} sm={10} md={9} lg={8} xl={9} style={{ width: "100%" }}>
      <Grid
        container
        direction={row === true ? "row" : "column"}
        justify="center"
        alignItems="center"
      >
        {withMaxWidth === true ? (
          <Grid style={{ maxWidth: 600, width: "100%" }}>{children}</Grid>
        ) : (
          <>{children}</>
        )}
      </Grid>
    </Grid>
  </Grid>
);

export default AlignCenter;
