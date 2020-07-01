import React from "react";

function NoMatch() {
  return (
      <div style={{width:200, display:"block", margin: "auto", textAlign:"center"}}>
        <h1>404 Page</h1>
        <span  role="img" aria-label="Face With Rolling Eyes Emoji">
            <div className="spin" style={{margin:"auto"}}>
            <span role="img" aria-label="no-match">🙄</span></div>
          </span>
      </div>
  );
}

export default NoMatch;
