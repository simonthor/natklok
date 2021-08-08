import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import Fade from "react-reveal/Fade";
import { StyledButton, StyledMarkdown } from "../general";
import { Grid } from "@material-ui/core";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SocialShare from "../features/SocialShare";
import { WHITE, PALEBLUE, PURPLE } from "../../util/constants";

const AnswerFeedbackSlide = ({
  t,
  nextQuestion,
  streak,
  isCorrect,
  title,
  desc,
  bodyMarkdown,
}) => {
  return (
    <>
      <Grid container style={{ textAlign: "left" }}>
        <Grid item xs={12} lg={6}>
          <Fade bottom delay={400}>
            <Grid
              container
              alignItems="center"
              style={{
                fontFamily: "Bungee, Arial, Helvetica, sans-serif",
              }}
            >
              <WhatshotIcon
                style={{
                  color: PALEBLUE,
                }}
              />
              <span
                style={{
                  margin: 0,
                  padding: 0,
                  textAlign: "left",
                  color: PALEBLUE,
                  padding: 3,
                  display: "flex",
                  alignItems: "center",
                  fontSize: "1.1em",
                }}
              >
                Streak
              </span>
              <div
                style={{
                  fontSize: "1.2em",
                  padding: 15,
                  borderRadius: 15,
                  marginLeft: 5,
                  display: "inline-block",
                  position: "relative",
                  backgroundColor: PALEBLUE,
                  color: PURPLE,
                  lineHeight: "1.1",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {streak}
                </span>
              </div>
            </Grid>
          </Fade>
          <Fade>
            <h1
              style={{
                marginTop: 8,
                textTransform: "uppercase",
                lineHeight: "1.3",
                fontFamily: "Bowlby One SC, Arial, Helvetica, sans-serif",
              }}
            >
              {title}
            </h1>
          </Fade>
        </Grid>
        <Fade delay={200}>
          <Grid item xs={12} lg={6}>
            <p style={{
              marginTop: 0,
              fontSize: "1.1em"
            }}>{desc}</p>
            <div style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "underline",
              padding: "10px 10px 10px 0",
              marginTop: -10,
              cursor: "pointer",
            }}>
              Läs mer
              <ExpandMoreIcon/>
            </div>
          </Grid>
        </Fade>
      </Grid>
      <Fade bottom delay={800}>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12}>
            <StyledButton
              style={{ margin: "6px 0"}}
              onClick={nextQuestion}
            >
            Next question
            </StyledButton></Grid>
          <Grid item xs={12}>
            <SocialShare shareText="Dela denna fraga" style={{marginTop: 0}}/>
          </Grid>
        </Grid>
      </Fade>
    </>
  );
};

export default withTranslation("common")(AnswerFeedbackSlide);

{
  /*
<Grid container justify="center" spacing={10} style={{margin: 0}}>
              <Grid item xs={12} sm={7}>
                <ReactReveal delay={700}>
                  <div
                    style={{
                      margin: 0,
                      padding: 0,
                      textAlign: "left",
                      fontFamily: "Bungee, Arial, Helvetica, sans-serif",
                      color: "#1DB6EB",
                      padding: 3,
                      display: "flex",
                      alignItems: "center",
                      fontSize: "1.1em",
                    }}
                  >
                    <span>Streak</span>
                    <div
                      style={{
                        fontSize: "1.2em",
                        padding: 15,
                        borderRadius: 15,
                        marginLeft: 5,
                        display: "inline-block",
                        position: "relative",
                        backgroundColor: "#063955",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        {streak}
                      </span>
                    </div>
                  </div>
                </ReactReveal>
                <ReactReveal bottom cascade>
                  <h3
                    style={{
                      fontSize: "5vw",
                      textTransform: "uppercase",
                      margin: 0,
                      padding: 0,
                      textAlign: "left",
                      lineHeight: "1",
                      letterSpacing: 6,
                      fontFamily: "Bowlby One SC, Arial, Helvetica, sans-serif",
                      whiteSpace: "nowrap",
                    }}
                  >{questionResult}</h3>
                </ReactReveal>
                <Grid container>
                  <Grid item md={10}>
                    <ReactReveal delay={400}>
                      <p
                        style={{
                          textAlign: "left",
                          fontSize: "1.4em",
                          margin: "40px 0"
                        }}
                      >
                        När du loggar in på en hemsida, var alltid säker på att
                        adressen du besökt är rätt.
                      </p>
                    </ReactReveal>
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <div style={{
                      backgroundColor: "rgba(0,0,0,0.25)",
                      width: "100%",
                      height: "100%",
                      marginRight: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "rgba(255,255,255,0.6"
                    }}>
                      <span style={{fontSize: "0.9em", marginRight: 10}}>Dela frågan</span>
                      <Instagram style={{ fontSize: 25 }} />
                      <Facebook style={{ fontSize: 25 }} />
                      <Twitter style={{ fontSize: 25 }} />
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <StyledButton onClick={nextQuestion} style={{width: "100%"}}>
                      {t(last === true ? "test.result" : "test.nextQuestion")}
                    </StyledButton>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={5} style={{
                backgroundColor: "rgba(0,0,0,0.25)",
                position: "relative",
                overflow: "scroll",
                textAlign: "left",
                height: "50vh",
                lineHeight: "1.5",
                fontSize: "1.2em",
                minHeight: 300,
              }}>
                <div>
                  <h4 style={{
                    fontFamily: "Bungee, Roboto, sans-serif",
                    fontSize: "1.2em",
                    margin: 0,
                  }}>Du ska vara försiktig.</h4>
                  <p>If you believed most of nature was threatened already, we think it’s useful for you to realize that two thirds of all animals and plants are NOT threatened, yet. One third is terribly high, but it’s still possible to reverse the trend towards mass extinction. A lot of conservation work is successful and more is needed. Every year, biologists across the world study the situation of plants and animals across the world and they publish their findings on the RedList, where you can track the status of more than 120,000 species! That is a lot, but it’s actually just 6% of all known species in the world, and nobody knows what share of all existing species are known. Even among the known species, 94% haven’t yet gotten enough attention to be fully investigated, mainly because it’s very costly to conduct multiple surveys of wild populations of animals and plants over time and track their decline. But new assessments of more species are still added every year, and with the additions to the list, roughly the same proportion is listed as threatened or endangered – around 27%. We have no intention of trivializing the fact that one third of nature is at risk already. But most people thought the situation was even worse, and we believe that may cause resignation, as people lose their hope. We hope this fact helps them realize that there’s still a lot we can and should do to reverse the trend towards mass extinction. It’s not too late, which too many seem to believe.</p>
                </div>
                
              </Grid>
            </Grid>
*/
}
