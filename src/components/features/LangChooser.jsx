import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { PINK } from "../../util/constants";
import i18next from "i18next";
import { withTranslation } from "react-i18next";
import TranslateOutlinedIcon from "@material-ui/icons/TranslateOutlined";


const useStyles = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  icon: {
    borderRadius: '50%',
    width: 20,
    height: 20,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: 'white',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 20,
      height: 20,
      backgroundImage: 'radial-gradient(' + PINK + ',' + PINK + ' 38%,transparent 42%)',
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#106ba3',
    },
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
      checkedIcon={<span className={`${classes.icon} ${classes.checkedIcon}`} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

const CustomizedRadios = () => {
  return (
    <div>
        <TranslateOutlinedIcon/>
        <div style={{
            backgroundColor: "white",
            padding: 10,
            borderRadius: 3,
            boxShadow: '0 2px 5px 0 rgba(0,0,0,.14), 0 2px 10px 0 rgba(0,0,0,.1)'
        }}>
            <FormControl component="fieldset">
            <FormLabel component="legend">Change language</FormLabel>
            <RadioGroup defaultValue="sv" aria-label="language" name="lang">
                <FormControlLabel value="sv" control={<StyledRadio />} label="Svenska - SV" />
                <FormControlLabel value="en" control={<StyledRadio />} label="English - EN" />
            </RadioGroup>
            </FormControl>
        </div>
    </div>
  );
}

export default CustomizedRadios;