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
      <span onClick={() => {
        toggleEng();
        changeLanguage();
      }}
      style={{
        fontSize: 15
      }}>
        {isEng ? 'Take the quiz in English' : 'Gör quizzet pa svenska'}
      </span>
    </>
  )
}

const useToggle = (initialState = true) => {
    const [state, setState] = useState(initialState);

    const toggle = useCallback(() => setState(state => !state), []);
    
    return [state, toggle]
}


export default withTranslation()(ToggleLanguage);