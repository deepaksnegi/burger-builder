import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import CheckoutSummary from "../../../component/order/checkoutSummary/CheckoutSummary";
import ContactData from "./contactData/ContactData";

const Checkout = (props) => {
  const [ingredients, setIngredients] = useState({});
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const queryParameter = new URLSearchParams(props.location.search);

    const ingredient = {};
    for (const param of queryParameter.entries()) {
      if (param[0] === "price") {
        setPrice(+param[1]);
      } else {
        ingredient[param[0]] = +param[1];
      }
    }
    setIngredients(ingredient);
  }, []);

  const checkoutContinued = () => {
    props.history.replace("/checkout/contact-data");
  };

  const checkoutCancelled = () => {
    props.history.goBack();
  };

  return (
    <div>
      <CheckoutSummary
        ingredient={ingredients}
        checkoutCancelled={checkoutCancelled}
        checkoutContinued={checkoutContinued}
      />
      <Route
        path={`${props.match.path}/contact-data`}
        render={() => <ContactData ingredients={ingredients} price={price} />}
      />
    </div>
  );
};

export default Checkout;
