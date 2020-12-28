import React from "react";
import BuildControl from "./buildControl/BuildControl";
import "./BuildControls.css";

const BuildControls = (props) => {
  const controls = [
    { label: "Meat", type: "meat" },
    { label: "Bacon", type: "bacon" },
    { label: "Salad", type: "salad" },
    { label: "Cheese", type: "cheese" },
  ];

  return (
    <div className="BuildControls">
      <p>
        Current price: <strong> {props.price.toFixed(2)} </strong>
      </p>
      {controls.map((c) => (
        <BuildControl
          key={c.label}
          label={c.label}
          added={() => props.ingredientAdded(c.type)}
          removed={() => props.ingredientRemoved(c.type)}
          disabled={props.disabled[c.type]}
        />
      ))}
      <button
        className="OrderButton"
        disabled={!props.purchasable}
        onClick={props.ordered}
      >
        ORDER NOW
      </button>
    </div>
  );
};

export default BuildControls;
