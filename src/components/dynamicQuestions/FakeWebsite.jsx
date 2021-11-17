import React from "react";
import { useState } from "react";
import StyledButton from "components/general/StyledButton";
import fakeWebsite from "assets/fakewebsite.jpeg";
import Hidden from "@material-ui/core/Hidden";
import { Menu, Search, ShoppingBasket } from "@material-ui/icons";
import AmountFound from "components/features/AmountFound";

const FakeWebsite = ({ onSelectAnswer, t }) => {
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
                  background: "#FDCF35",
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
                height: 21,
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
              padding: "4px 6px",
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
                  fontSize: "0.8em",
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
                marginTop: 6,
                marginLeft: "auto",
                marginRight: "auto",
                width: "100%",
                border: scams.priceScamFound
                  ? "2px solid red"
                  : "2px solid rgba(0,0,0,0)",
              }}
            >
              Iphone 13 för endast 899 kr!
            </h3>
            <p
              style={{
                color: "white",
                opacity: 0.5,
                position: "absolute",
                left: 0,
                right: 0,
                fontSize: 12,
                marginTop: 30,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Orginalpris är 18990 kr!
            </p>
            <div
              style={{
                width: "100%",
                maxHeight: window.innerWidth < 576 ? "15vh" : "80vh",
                overflow: "hidden",
              }}
            >
              <img src={fakeWebsite} style={{ width: "100%" }} alt="" />
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

export default FakeWebsite;
