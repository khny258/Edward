import React from "react";
import style from "./style.module.css";

// This component exports both the List and ListItem components

export const List = ({ children }) => (
  <ul className="list-group">
    {children}
  </ul>
);

export function ListItem({ children }) {
  return <li className="p-2 border-top" >{children}</li>;
}