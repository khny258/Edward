import React from "react";
import {} from "react";
import { Link } from 'react-router-dom';
import style from "./style.module.css";

export default ( props ) => {
    
    return (
        <>
        <div className={`${style.container}`} >
            Home
        </div>
        <div className={style.user}>
            <h5>user:</h5>
            { Object.keys(props.user)
                .map( (field, i) => 
                    <p key={i}> <strong>{field}</strong>: {props.user[field]}</p>) 
            }
        </div>
        <Link to="/dash">Dash</Link>
        
        </>
    )
}