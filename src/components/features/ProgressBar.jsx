import { Grid } from "@material-ui/core";
import React from "react";
import { withTranslation } from "react-i18next";
import Mainlogo from "../../assets/sakerhetskontrollen-logo.svg";

const CompletedBlocks = ({ completed }) => {
    return [...Array(completed)].map((e, i) => <div style={{height: "100%",width: "100%", background: "white"}} key={i}></div>);
}
const UnCompletedBlocks = ({ completed, count }) => {
    return [...Array(count - completed)].map((e, i) => <div style={{height: "100%",width: "100%", background: "rgba(0,0,0,0.3)"}} key={i}></div>);
}

const ProgressBar = () => {
    return (
        <Grid container justify="space-evenly" alignItems="center">
            <Grid item><img src={Mainlogo} style={{height: 40, margin: 10}}/></Grid>
            <Grid item style={{marginLeft: 10}}>
                <p style={{margin: 0}}>13 frågor kvar</p>
                <Grid container style={{
                    height: 6, 
                    width: 180, 
                    borderRadius: 9, 
                    overflow: "hidden",
                    margin: "7px 0",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(0, 1fr))",
                    gridGap: 3}}>
                        <CompletedBlocks completed={5}/>
                        <UnCompletedBlocks completed={5} count={15}/>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ProgressBar;