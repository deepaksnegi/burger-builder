import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import CheckoutSummary from "../../../component/order/checkoutSummary/CheckoutSummary";
import ContactData from "./contactData/ContactData";

const Checkout = (props) => {
  const [ingredients, setIngredients] = useState({});

  useEffect(() => {
    setIngredients(props.ingredients);
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
        component={ContactData}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
  };
};

export default connect(mapStateToProps)(Checkout);
