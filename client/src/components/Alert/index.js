import React, { useEffect, useState } from "react";
import './style.css'

function Alert(props) {
  const [fadeState, setFadeState] = useState("fade");
  const { setAlertInfo } = props;

  useEffect(() => {
    let resetTimer;
    setFadeState("fadeIn");
    const fadeTimer = setTimeout(() => {
      setFadeState("fade");

      resetTimer = setTimeout(() => {
        setAlertInfo({message:"", theme:""})
      }, 500)
    }, 3000);

    // clear timer on re-render
    return () => {
        setFadeState("fade");
        clearTimeout(fadeTimer);
        clearTimeout(resetTimer);
      return;}
  }, [props.alertInfo.message, setAlertInfo]);

  // if(!props.alertInfo.message)
  //   return <></>

    return (
        <div style={{ position:"absolute", width:"100%",  margin: 0, borderRadius:0}} className={`alert alert-${props.alertInfo.theme ? props.alertInfo.theme : "success"} animated ${fadeState} `} role="alert">
          { props.alertInfo.message }
          <button type="button" className="close" onClick={ () => props.setAlertInfo({message:"", theme:""})} aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
    );
}

export default Alert;