import React from "react";
import styles from "./style.module.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
export function DeleteBtn(props) {
  return (
    <span className={ styles["delete-btn"] } {...props} role="button" tabIndex="0">
      ✗
    </span>
  );
}

export function Button(props) {
  return (
    <span onClick={props.onClick} className={`btn btn-${ props.theme ? props.theme : "success" } ${ styles.button } ${props.className}` }  role="button">
      {props.children}
    </span>
  );
}
