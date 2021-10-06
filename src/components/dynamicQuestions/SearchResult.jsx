import React from "react";
import { useState } from "react";

import { Hidden } from "@material-ui/core";
import { WarningOutlined } from "@material-ui/icons";

const SearchResults = ({ questionData, onSelectAnswer, t }) => {
  const [scams, setScams] = useState({
    httpFound: false,
    finalDomainScam: false,
  });
  const [linkHover, setLinkHover] = useState([false,false,false,false])

  let amountFound = 0;
  Object.values(scams).forEach((found) => {
    if (found === true) {
      amountFound += 1;
    }
  });
  if (amountFound === Object.values(scams).length) {
    onSelectAnswer(1, "", "", 500); 
  }

  const dark = window.matchMedia("(prefers-color-scheme: dark)");

  return (
    <div style={{
      width: "100%",
      backgroundColor: dark ? "#1d2342" : "#dedee0",
      color: dark ? "#e5e5ea" : "#151e4a",
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        backgroundColor: dark ? "#10142b" : "#fff",
      }}>
        <div>logo</div>
        <div style={{
          width: "80%",
          display: "flex",
          height: 38,
          alignItems: "center",
          backgroundColor: dark ? "#212959" : "#fff",
          padding: "0 15px",
          borderRadius: 19,
          fontSize: "0.85em"
        }}>Vad kostar ett frimärke?</div>
      </div>
      <div style={{
        display: "flex",
        paddingLeft: 20,
        alignItems: "center",
        fontSize: "0.75em",
        fontWeight: "bold",
        backgroundColor: dark ? "#10142b" : "#fff",
      }}>
        <div style={{
          color: "#7d9efa",
          padding: "7px 0",
          margin: "0 5px",
          borderBottom: "3px solid #7d9efa"
        }}>Allt</div>
        <div style={{
          padding: "7px 0",
          margin: "0 5px",
          borderBottom: "3px solid transparent"
        }}>Bilder</div>
        <div style={{
          padding: "7px 0",
          margin: "0 5px",
          borderBottom: "3px solid transparent"
        }}>Nyheter</div>
      </div>
      <div style={{
        margin: 10,
        padding: 10,
        paddingBottom: 5
      }}
      onMouseEnter={() => setLinkHover([true,false,false,false])}
      onMouseLeave={() => setLinkHover(false)}>
        <div style={{
          display: "flex",
        }}>
          <span style={{
            fontSize: "0.6em",
            padding: "1px 5px",
            color: "#1d2342",
            fontWeight: "bold",
            borderRadius: 4,
            backgroundColor: "#f1c232",
            marginRight: 6
          }}>ANNONS</span>
          <span style={{
          display: "block",
          fontSize: "0.7em",
          opacity: 0.9
        }}>{questionData.linkSets[0].adLinks[0].url}</span>
        </div>
        <span style={{
          margin: "3px 0",
          display: "block"
        }}>{questionData.linkSets[0].adLinks[0].title}</span>
        <p style={{
          margin: 0,
          fontSize: "0.8em"
        }}>{questionData.linkSets[0].adLinks[0].metaDesc}</p>
      </div>
      <div style={{
        margin: 10,
        padding: 10,
        paddingBottom: 5
      }}>
        <div style={{
          display: "flex",
        }}>
          <span style={{
            fontSize: "0.6em",
            padding: "1px 5px",
            color: "#1d2342",
            fontWeight: "bold",
            borderRadius: 4,
            backgroundColor: "#f1c232",
            marginRight: 6
          }}>ANNONS</span>
          <span style={{
          display: "block",
          fontSize: "0.7em",
          opacity: 0.9
        }}>{questionData.linkSets[0].adLinks[1].url}</span>
        </div>
        <span style={{
          margin: "3px 0",
          display: "block"
        }}>{questionData.linkSets[0].adLinks[1].title}</span>
        <p style={{
          margin: 0,
          fontSize: "0.8em"
        }}>{questionData.linkSets[0].adLinks[1].metaDesc}</p>
      </div>
      <div style={{
        margin: 10,
        padding: 10,
        paddingBottom: 5
      }}>
        <div style={{
          display: "flex",
        }}>
          <span style={{
          display: "block",
          fontSize: "0.7em",
          opacity: 0.9
        }}>{questionData.linkSets[0].suspiciousLink.url}</span>
        </div>
        <span style={{
          margin: "3px 0",
          display: "block"
        }}>{questionData.linkSets[0].suspiciousLink.title}</span>
        <p style={{
          margin: 0,
          fontSize: "0.8em"
        }}>{questionData.linkSets[0].suspiciousLink.metaDesc}</p>
      </div>
      <div style={{
        margin: 10,
        padding: 10,
        paddingBottom: 5
      }}>
        <div style={{
          display: "flex",
        }}>
          <span style={{
          display: "block",
          fontSize: "0.7em",
          opacity: 0.9
        }}>{questionData.linkSets[0].legitLink.url}</span>
        </div>
        <span style={{
          margin: "3px 0",
          display: "block"
        }}>{questionData.linkSets[0].legitLink.title}</span>
        <p style={{
          margin: 0,
          fontSize: "0.8em"
        }}>{questionData.linkSets[0].legitLink.metaDesc}</p>
      </div>
    </div>
  );
};

export default SearchResults;
