import React, { useCallback, useState } from "react";
import i18next from "i18next";
import { withTranslation } from "react-i18next";


const ToggleLanguage = () => {
  const [isEng, toggleEng] = useToggle();
  const changeLanguage = () => {
    let lng = isEng ? "en" : "swe";
    i18next.changeLanguage(lng);
  };
  return (
    <>
      <div style={{ 
        padding: "10px 15px 10px 15px",
        backgroundColor: "rgba(0,0,0,0.1)",
        cursor:"pointer" }}
        onClick={() => {
          toggleEng();
          changeLanguage();
        }}
        >
        <span style={{fontSize: 15}}>
          {isEng ? 'Take the quiz in English' : 'Gör quizzet pa svenska'}
        </span>
      </div>
    </>
  )
}

const useToggle = (initialState = true) => {
    const [state, setState] = useState(initialState);

    const toggle = useCallback(() => setState(state => !state), []);
    
    return [state, toggle]
}


export default withTranslation()(ToggleLanguage);