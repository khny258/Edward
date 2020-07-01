import React from "react";
import {} from "react";
import style from "./style.module.css";

export default ( props ) => {
    
    return (
        <>
        <div className={`spin ${style.container}`} >
            Home
        </div>
        <div className={style.user}>
            <h5>user:</h5>
            { Object.keys(props.user)
                .map( (field, i) => 
                    <p key={i}> <strong>{field}</strong>: {props.user[field]}</p>) 
            }
        </div>
        
        </>
    )
}