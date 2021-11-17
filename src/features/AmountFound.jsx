import SmallText from "components/typeography/SmallText";
import Subtitle from "components/typeography/Subtitle";
import React from "react";

const AmountFound = ({ amountFound, scams }) => {
  return (
    <div
      style={{ display: "flex", margin: "0 0 12px 0", alignItems: "center" }}
    >
      <Subtitle style={{ margin: 0 }}>{amountFound}</Subtitle>
      <SmallText style={{ opacity: 0.8, margin: "0 0 2px 0" }}>
        /{Object.values(scams).length} hittade
      </SmallText>
    </div>
  );
};

export default AmountFound;
