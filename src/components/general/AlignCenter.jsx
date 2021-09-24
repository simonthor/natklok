import React from "react";
import Grid from "@material-ui/core/Grid";
import getWindowSize from "util/getWindowSize";

const AlignCenter = ({
  children,
  key,
  withMaxWidth = false,
  centerBothAxis = false,
  marginTop = true,
  row = false,
}) => {
  const windowSize = getWindowSize();

  let paddingTop = 0;
  if (centerBothAxis && windowSize.height > 620) {
    paddingTop = "-5vh";
  } else if (!centerBothAxis && windowSize.height > 620 && marginTop === true) {
    paddingTop = "5vh";
  }

  return (
    <Grid
      id="alignCenter"
      container
      direction={row === true ? "row" : "column"}
      alignItems="center"
      justifyContent="center"
      key={key}
      style={{
        paddingTop: paddingTop,
        width: withMaxWidth ? "100%" : "auto",
        height: centerBothAxis ? "100%" : "auto",
      }}
    >
      <Grid
        item
        xs={11}
        sm={10}
        md={9}
        lg={8}
        xl={9}
        style={{ width: "100%", height: "100%" }}
      >
        <Grid
          container
          direction={row === true ? "row" : "column"}
          justifyContent="center"
          alignItems="center"
          style={{ width: "100%", height: "100%" }}
        >
          {withMaxWidth === true ? (
            <Grid item style={{ maxWidth: 600, width: "100%" }}>
              {children}
            </Grid>
          ) : (
            <>{children}</>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AlignCenter;
