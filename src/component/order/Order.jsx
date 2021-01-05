import React from "react";
import "./Order.css";

const Order = (props) => {
  const ingredients = [];

  for (const name in props.ingredients) {
    ingredients.push({ name: name, amount: props.ingredients[name] });
  }

  let ingredientsOutput = ingredients.map((i) => (
    <span
      style={{
        textTransform: "capitalize",
        display: "inline-block",
        margin: "0 8px",
        border: "1px solid #ccc",
        padding: "5px",
      }}
      key={i.name}
    >
      {i.name}: {i.amount}
    </span>
  ));

  return (
    <div className="Order">
      <p>ingredient: {ingredientsOutput}</p>
      <p>
        price: <strong>USD {props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
