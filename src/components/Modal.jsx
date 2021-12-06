import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import CloseIcon from "@material-ui/icons/Close";
import { PURPLE } from "util/constants";
import { withTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: PURPLE,
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    outline: "none",
    borderRadius: 4,
    maxWidth: 500,
    padding: 12,
    margin: 12,
  },
}));

const TransitionsModal = ({ open, setOpen, title = "title", children, t }) => {
  const classes = useStyles();

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Grid container justify="space-between" alignItems="center">
              <Grid item style={{ cursor: "pointer", width: 80 }} />
              <Grid item>
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                    marginBottom: 0,
                    marginTop: 0,
                    color: PURPLE,
                  }}
                >
                  {title}
                </p>
              </Grid>

              <Grid
                item
                style={{ display: "flex", cursor: "pointer" }}
                onClick={() => setOpen(false)}
              >
                <p style={{ marginTop: -1, marginBottom: 0 }}>
                  {t("general.close").toLowerCase()}
                </p>
                <CloseIcon
                  style={{
                    fontSize: 22,
                    marginRight: 20,
                    color: PURPLE,
                  }}
                />
              </Grid>
            </Grid>
            {children}
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default withTranslation("common")(TransitionsModal);
