import SmallText from "components/general/typeography/SmallText";
import Subtitle from "components/general/typeography/Subtitle";
import React from "react";

const AmountFound = ({ amountFound, scams }) => {
  return (
    <div
      style={{ display: "flex", margin: "0 0 12px 0", alignItems: "flex-end" }}
    >
      <Subtitle style={{ margin: 0 }}>{amountFound}</Subtitle>
      <p style={{ opacity: 0.8, margin: "0 0 2px 0" }}>
        /{Object.values(scams).length} hittade
      </p>
    </div>
  );
};

export default AmountFound;
