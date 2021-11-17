import React from "react";
import { useState } from "react";

import AmountFound from "features/AmountFound";
import StyledButton from "components//StyledButton";

import { Hidden } from "@material-ui/core";
import { WarningOutlined } from "@material-ui/icons";

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
    onSelectAnswer(1, "", "", 500);
  }

  return (
    <>
      <AmountFound scams={scams} amountFound={amountFound} />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          fontFamily: "arial",
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
                  background: "#FF3854",
                  borderRadius: 20,
                  width: 14,
                  height: 14,
                  margin: "6px 3px",
                }}
              />
              <div
                style={{
                  background: "#FDCF35",
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
                  margin: "2px 0 0 10px",
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
                  <WarningOutlined
                    style={{
                      fontSize: "1.2em",
                      marginBottom: -3,
                      color: "red",
                    }}
                  />
                  | http://
                </span>
                instagram.com.
                <span
                  style={{
                    borderRadius: 1000,
                    border: scams.finalDomainScam
                      ? "2px solid red"
                      : "2px solid rgba(0,0,0,0)",
                  }}
                  onClick={() => setScams({ ...scams, finalDomainScam: true })}
                >
                  utm-srcigweb.se
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <StyledButton
        onClick={() => {
          onSelectAnswer(0);
        }}
        style={{ marginTop: 10 }}
      >
        Vet inte, fortsätt.
      </StyledButton>
    </>
  );
};

export default FakeDomain;
