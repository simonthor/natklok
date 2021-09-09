import React from "react";

// Simple changes the markdown to fit our graphical profile better
export default ({ style, children }) => (
  <div style={style} dangerouslySetInnerHTML={{ __html: children }} />
);
