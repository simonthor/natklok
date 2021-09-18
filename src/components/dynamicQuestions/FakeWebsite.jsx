import React from "react";
import { useState } from "react";
import { Fade, StyledButton } from "../general";

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
    onSelectAnswer(amountFound / Object.values(scams).length);
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
            width: "100%",
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
              onClick={() => setScams({ ...scams, domainScamFound: true })}
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
                  borderRadius: 1000,
                  border: scams.domainScamFound
                    ? "4px solid red"
                    : "4px solid rgba(0,0,0,0)",
                }}
              >
                ßlocket.se
              </p>
            </div>
          </div>

          <p
            onClick={() => setScams({ ...scams, spellingErrorsFound: true })}
            style={{
              color: "grey",
              margin: 20,
              borderRadius: 1000,
              border: scams.spellingErrorsFound
                ? "4px solid red"
                : "4px solid rgba(0,0,0,0)",
            }}
          >
            Välkomen till blocket.se! Här hittar du besta priserna!
          </p>

          <div
            onClick={() => setScams({ ...scams, priceScamFound: true })}
            style={{
              color: "grey",
              margin: 20,
              position: "relative",
              borderRadius: 1000,
              border: scams.priceScamFound
                ? "4px solid red"
                : "4px solid rgba(0,0,0,0)",
            }}
          >
            Asgrym ny TV för 599 kr! Originalpris är 18999 sek!
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
