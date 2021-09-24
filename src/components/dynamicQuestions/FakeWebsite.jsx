import React from "react";
import { useState } from "react";
import { Fade, StyledButton } from "../general";
import fakeWebsite from "assets/fakewebsite.jpeg";
import { Hidden } from "@material-ui/core";
import { Menu, Search, ShoppingBasket } from "@material-ui/icons";

const FakeWebsite = ({ options, onSelectAnswer, t }) => {
  const [scams, setScams] = useState({
    domainScamFound: false,
    spellingErrorsFound: false,
    priceScamFound: false,
  });

  let amountFound = 0;
  Object.values(scams).forEach((found) => {
    if (found === true) {
      amountFound += 1;
    }
  });
  if (amountFound === Object.values(scams).length) {
    onSelectAnswer(amountFound / Object.values(scams).length, "", 1000);
  }

  return (
    <>
      <p style={{ margin: "0 0 12px 0" }}>
        <span style={{ fontSize: "1.2em", fontWeight: 600 }}>
          {amountFound}
        </span>
        <span style={{ fontSize: "1em", fontWeight: 200, opacity: 0.6 }}>
          /{Object.values(scams).length} hittade
        </span>
      </p>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            position: "relative",
            background: "white",
            borderRadius: 12,
            overflow: "hidden",
            color: "grey",
          }}
        >
          <div
            style={{
              width: "100%",
              textAlign: "center",
              display: "flex",
              background: "rgba(0,0,0,0.1)",
            }}
          >
            <Hidden xsDown>
              <div
                style={{
                  background: "red",
                  borderRadius: 20,
                  width: 14,
                  height: 14,
                  margin: "10px 3px",
                }}
              />
              <div
                style={{
                  background: "yellow",
                  borderRadius: 20,
                  width: 14,
                  height: 14,
                  margin: "10px 3px",
                }}
              />
              <div
                style={{
                  background: "lightgreen",
                  borderRadius: 20,
                  width: 14,
                  height: 14,
                  margin: "10px 3px",
                }}
              />
            </Hidden>
            <div
              style={{
                flex: 1,
                background: "white",
                borderRadius: 20,
                margin: 6,
                height: 24,
                textAlign: "start",
                position: "relative",
              }}
            >
              <p
                style={{
                  padding: "6px 0",
                  margin: "-5px 0 0 10px",
                  color: "grey",
                  fontSize: "0.9em",
                }}
              >
                https://varuhuset.se.
                <span
                  style={{
                    borderRadius: 1000,
                    border: scams.domainScamFound
                      ? "2px solid red"
                      : "2px solid rgba(0,0,0,0)",
                  }}
                  onClick={() => setScams({ ...scams, domainScamFound: true })}
                >
                  src-utm.io
                </span>
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "12px 6px",
            }}
          >
            <div style={{ opacity: 0.7, fontSize: "0.8em" }}>Logga in</div>
            <div>
              <b>
                <i>varuhuset.se</i>
              </b>
            </div>
            <div style={{ opacity: 0.7, fontSize: "0.8em" }}>Hitta varuhus</div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "3px 6px 8px 6px",
              borderBottom: "1px grey solid",
            }}
          >
            <div>
              <Menu />
            </div>
            <div
              style={{
                border: "1px grey solid",
                display: "flex",
                justifyContent: "space-between",
                width: "60%",
                maxWidth: 400,
              }}
            >
              <p
                onClick={() =>
                  setScams({ ...scams, spellingErrorsFound: true })
                }
                style={{
                  color: "grey",
                  fontSize: "0.9em",
                  margin: 3,
                  borderRadius: 100,
                  border: scams.spellingErrorsFound
                    ? "2px solid red"
                    : "2px solid rgba(0,0,0,0)",
                }}
              >
                Sok after produkter
              </p>
              <div
                style={{ background: "lightgreen", height: "100%", width: 28 }}
              >
                <Search style={{ color: "white" }} />
              </div>
            </div>
            <div>
              <ShoppingBasket />
            </div>
          </div>
          <div
            style={{
              position: "relative",
              textAlign: "center",
              maxHeight: 240,
              overflow: "hidden",
            }}
          >
            <h3
              onClick={() => setScams({ ...scams, priceScamFound: true })}
              style={{
                color: "white",
                borderRadius: 1000,
                position: "absolute",
                left: 0,
                right: 0,
                marginTop: "5%",
                marginLeft: "auto",
                marginRight: "auto",
                width: "100%",
                border: scams.priceScamFound
                  ? "2px solid red"
                  : "2px solid rgba(0,0,0,0)",
              }}
            >
              Iphone 13 för endast 299 kr!
            </h3>
            <img src={fakeWebsite} style={{ width: "100%" }} alt="" />
          </div>
        </div>
      </div>
      <StyledButton
        onClick={() => {
          onSelectAnswer(amountFound / 3);
        }}
        style={{ marginTop: 10 }}
      >
        Vet inte, fortsätt.
      </StyledButton>
    </>
  );
};

export default FakeWebsite;
