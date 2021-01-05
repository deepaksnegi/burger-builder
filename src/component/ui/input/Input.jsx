import React from "react";
import "./Input.css";

const Input = (props) => {
  let inputElement = null;

  const inputClasses = ["InputElement"];

  if (!props.isValid && props.shouldValidate && props.isTouched) {
    inputClasses.push("InvalidInput");
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfiguration}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfiguration}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfiguration.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          type="text"
          className={inputClasses.join(" ")}
          {...props.elementConfiguration}
          onChange={props.changed}
        />
      );
      break;
  }
  return (
    <div className="Input">
      <label className="Label" htmlFor={props.label}>
        {props.label}
      </label>
      {inputElement}
    </div>
  );
};

export default Input;
