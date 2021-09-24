import { Hidden } from "@material-ui/core";
import { LockOpen, WarningOutlined } from "@material-ui/icons";
import React from "react";
import { useState } from "react";
import { Fade, StyledButton } from "../general";

const FakeDomain = ({ options, onSelectAnswer, t }) => {
  const [scams, setScams] = useState({
    httpFound: false,
    finalDomainScam: false,
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
      <h2>
        {amountFound}/ {Object.values(scams).length}{" "}
        <span style={{ fontSize: "0.7em" }}>Hittade</span>
      </h2>
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
            width: "100%",
            background: "white",
            borderRadius: 12,
            overflow: "hidden",
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
            <Hidden smDown>
              <div
                style={{
                  background: "red",
                  borderRadius: 20,
                  width: 14,
                  height: 14,
                  margin: "6px 3px",
                }}
              />
              <div
                style={{
                  background: "yellow",
                  borderRadius: 20,
                  width: 14,
                  height: 14,
                  margin: "6px 3px",
                }}
              />
              <div
                style={{
                  background: "lightgreen",
                  borderRadius: 20,
                  width: 14,
                  height: 14,
                  margin: "6px 3px",
                }}
              />
            </Hidden>

            <div
              style={{
                flex: 1,
                background: "white",
                borderRadius: 20,
                margin: 6,
                textAlign: "start",
                position: "relative",
              }}
            >
              <p
                style={{
                  padding: "6px 0",
                  margin: "-5px 0 0 10px",
                  color: "grey",
                  fontSize: "0.8em",
                }}
              >
                <span
                  style={{
                    borderRadius: 1000,
                    border: scams.httpFound
                      ? "2px solid red"
                      : "2px solid rgba(0,0,0,0)",
                  }}
                  onClick={() => setScams({ ...scams, httpFound: true })}
                >
                  <WarningOutlined style={{ fontSize: "1.3em" }} />| http://
                </span>
                instagram.com.utm-src-ig
                <span
                  style={{
                    borderRadius: 1000,
                    border: scams.finalDomainScam
                      ? "2px solid red"
                      : "2px solid rgba(0,0,0,0)",
                  }}
                  onClick={() => setScams({ ...scams, finalDomainScam: true })}
                >
                  web.se
                </span>
              </p>
            </div>
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

export default FakeDomain;
