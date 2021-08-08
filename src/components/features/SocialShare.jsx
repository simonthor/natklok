import React from "react";
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';


export default ({ shareText,style }) => {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
          }}>
            <div style={{
              margin: 8,
              padding: 8,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              ...style
            }}>
              <ShareOutlinedIcon style={{marginRight: 5}}/>
              <span style={{marginRight: 10}}>{shareText}</span>
            </div>
          </div>
    )
}