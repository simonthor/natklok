import React from "react";
import { useState } from "react";
import { Fade, StyledButton } from "../general";
import fakeWebsite from "assets/fakewebsite.png";

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
      <h2>
        {amountFound}/ {Object.values(scams).length}{" "}
        <span style={{ fontSize: "1em" }}>Hittade</span>
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
            width: 370,
            height: 380,
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
                background: "green",
                borderRadius: 20,
                width: 14,
                height: 14,
                margin: "6px 3px",
              }}
            />

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
                https://elgiganten.se.
                <span
                  style={{
                    borderRadius: 1000,
                    border: scams.domainScamFound
                      ? "2px solid red"
                      : "2px solid rgba(0,0,0,0)",
                  }}
                  onClick={() => setScams({ ...scams, domainScamFound: true })}
                >
                  src-sgg.com
                </span>
              </p>
            </div>
          </div>
          <img src={fakeWebsite} alt="" style={{}} />
          <p
            onClick={() => setScams({ ...scams, spellingErrorsFound: true })}
            style={{
              color: "grey",
              position: "absolute",
              top: "20%",
              left: 100,
              fontSize: "0.9em",
              borderRadius: 1000,
              border: scams.spellingErrorsFound
                ? "2px solid red"
                : "2px solid rgba(0,0,0,0)",
            }}
          >
            Sok after produkter
          </p>

          <p
            onClick={() => setScams({ ...scams, priceScamFound: true })}
            style={{
              color: "black",
              position: "absolute",
              top: "45%",
              left: 94,
              fontSize: "0.9em",
              borderRadius: 1000,
              border: scams.priceScamFound
                ? "2px solid red"
                : "2px solid rgba(0,0,0,0)",
            }}
          >
            Iphone 13 för endast 299 kr!
          </p>
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
