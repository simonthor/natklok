import { Grid } from "@material-ui/core";
import React from "react";
import { withTranslation } from "react-i18next";
import Mainlogo from "../../assets/sakerhetskontrollen-logo.svg";

const ProgressBar = ({ t, currentQuestion, totalQuestions }) => {

    const CompletedBlocks = () => {
        return [...Array(currentQuestion - 1)].map((e, i) => <div style={{height: "100%",width: "100%", background: "white"}} key={i}></div>);
    }

    const UnCompletedBlocks = () => {
        return [...Array(totalQuestions - currentQuestion + 1)].map((e, i) => <div style={{height: "100%",width: "100%", background: "rgba(0,0,0,0.3)"}} key={i}></div>);
    }

    return (
        <Grid container justify="space-evenly" alignItems="center">
            <Grid item><img src={Mainlogo} style={{height: 40, margin: 10}}/></Grid>
            <Grid item style={{marginLeft: 10}}>
                <p style={{margin: 0}}>{totalQuestions - currentQuestion + 1} {(totalQuestions - currentQuestion + 1) === 1 ? t("general.questionLeft") : t("general.questionsLeft")}</p>
                <Grid container style={{
                    height: 6, 
                    width: 180, 
                    borderRadius: 9, 
                    overflow: "hidden",
                    margin: "7px 0",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(0, 1fr))",
                    gridGap: 3}}>
                        <CompletedBlocks/>
                        <UnCompletedBlocks/>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default withTranslation("common")(ProgressBar);