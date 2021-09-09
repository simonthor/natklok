import React from "react";
import { useState } from "react";
import { StyledButton } from "../general";

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
    onSelectAnswer(amountFound / 3);
  }

  return (
    <>
      <p>Hittat {amountFound} / 3</p>
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
              }}
            >
              <p style={{ padding: "6px 0", margin: 0, color: "grey" }}>
                ßlocket.se
              </p>
            </div>
          </div>
          <p
            onClick={() => setScams({ ...scams, spellingErrorsFound: true })}
            style={{ color: "grey", margin: 20 }}
          >
            Välkomen till blocket.se! Här hitar du besta priserna!
          </p>
          <div
            onClick={() => setScams({ ...scams, priceScamFound: true })}
            style={{ color: "grey", margin: 20 }}
          >
            Asgrym ny TV för 599 kr! Orginalpris är 18999 sek!
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
