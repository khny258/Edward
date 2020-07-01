import React, { useEffect, useState } from "react";
import './style.css'

function Alert(props) {
  const [fadeState, setFadeState] = useState("fade");
  
  const { setAlertInfo } = props;
  // useEffect with two timers, one for fading out, one is for resetting div attributes (opacity to 0 to fade in again next time)
  // a bit of a messy solution..
  useEffect(() => {
    setFadeState("fadeIn");
    let fadeoutTimer;
    const fadeTimer = setTimeout(() => {
      setFadeState("fade");
      fadeoutTimer = setTimeout(() => {
        setFadeState("transparent");
        setAlertInfo({theme: "success", message:""});
       },500)
    }, 3000);

    // crear timer on re-render
    return () => {clearTimeout(fadeTimer);clearTimeout(fadeoutTimer);}
  }, [props.alertInfo.message, setAlertInfo]);

  if (props.alertInfo.message)
    return (
        <div style={{ position:"relative", width:"100%",  marginTop: 10, borderRadius:0}} className={`alert alert-info alert-dismissible animated ${fadeState} `} role="alert">
          { props.alertInfo.message }
          <button type="button" className="close" onClick={ () => props.setAlertInfo({message:"", theme:""})} aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
    );
    return <></>
}

export default Alert;
