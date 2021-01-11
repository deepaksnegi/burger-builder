import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
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

  let summary = <Redirect to="/" />;

  if (props.ingredients) {
    const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;
    summary = (
      <>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={ingredients}
          checkoutCancelled={checkoutCancelled}
          checkoutContinued={checkoutContinued}
        />
        <Route
          path={`${props.match.path}/contact-data`}
          component={ContactData}
        />
      </>
    );
  }
  return summary;
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
