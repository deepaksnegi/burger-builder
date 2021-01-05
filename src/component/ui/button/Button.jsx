import React from "react";
import "./Button.css";

const Button = (props) => {
  return (
    <button
      className={["Button", props.buttonType].join(" ")}
      onClick={props.clicked}
      disabled={props.disable}
    >
      {props.children}
    </button>
  );
};

export default Button;
