import React from "react";
import Burger from "../../burger/Burger";
import Button from "../../ui/button/Button";
import "./CheckoutSummary.css";

const CheckoutSummary = (props) => {
  return (
    <div className="CheckoutSummary">
      <h1>We hope it tastes well!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredient={props.ingredient} />
      </div>
      <Button buttonType="Danger" clicked={props.checkoutCancelled}>
        CANCEL
      </Button>
      <Button buttonType="Success" clicked={props.checkoutContinued}>
        CONTINUE
      </Button>
    </div>
  );
};

export default CheckoutSummary;
