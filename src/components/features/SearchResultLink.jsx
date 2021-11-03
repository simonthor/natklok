import React, { useState } from "react";
import BottomFade from "components/general/Fade";

const SearchdataLink = ({ data, index, adNotice, dark, mobile, pointsController=null }) => {
    const [hover, setHover] = useState(false);
    const handleClick = () => pointsController(index);

    return (
        <BottomFade fadeOnMobile={true}>
            <div style={{
                margin: "0 0 20px 0",
                cursor: "pointer"
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => handleClick()}>
            <div style={{
                display: "flex",
            }}>
                {data.type === "ad" ? (
                <span style={{
                    fontSize: "0.6em",
                    padding: "1px 5px",
                    color: "#1d2342",
                    fontWeight: "bold",
                    borderRadius: 4,
                    backgroundColor: "#f1c232",
                    marginRight: 6,
                }}>{adNotice}</span>
                ) : null}
                <span style={{
                    display: "block",
                    fontSize: "0.7em",
                    opacity: 0.9,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                }}>{data.url}</span>
                <span style={{
                fontSize: "0.65em",
                marginLeft: 5,
                color: "#7d9efa"
                }}>&#9660;</span>
            </div>
            <span style={{
                margin: "3px 0",
                display: "block",
                color: dark ? "inherit" : "#0b5394",
                textDecoration: hover ? "underline" : "none",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "95%"
            }}>{data.title}</span>
            <p style={{
                margin: "0 0 1px 0",
                fontSize: mobile ? "0.7em" : "0.8em",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: mobile ? "-webkit-box" : "block",
                WebkitLineClamp: mobile ? "2" : "none",
                lineClamp: mobile ? "2" : "none",
                WebkitBoxOrient: mobile ? "vertical" : "unset"
            }}>{data.metaDesc}</p>
            </div>
        </BottomFade>
      )
};

export default SearchdataLink;
