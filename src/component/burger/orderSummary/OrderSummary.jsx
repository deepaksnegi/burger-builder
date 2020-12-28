import React from "react";
import Button from "../../ui/button/Button";

const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredient).map((k) => {
    return (
      <li key={k}>
        <strong>{k}: </strong> {props.ingredient[k]}
      </li>
    );
  });

  return (
    <div>
      <h3>Your order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>Continue to checkout?</p>
      <p>
        <strong>Total Price: {props.price.toFixed(2)}</strong>
      </p>
      <Button buttonType="Danger" clicked={props.purchaseCancelled}>
        CANCEL
      </Button>
      <Button buttonType="Success" clicked={props.purchaseContinued}>
        CONTINUE
      </Button>
    </div>
  );
};

export default OrderSummary;
