import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import AxiosOrders from "../../AxiosOrders";
import BuildControls from "../../component/burger/buildControls/BuildControls";
import Burger from "../../component/burger/Burger";
import OrderSummary from "../../component/burger/orderSummary/OrderSummary";
import Modal from "../../component/ui/modal/Modal";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {
  addIngredient,
  removeIngredient,
  initIngredientsAsync,
} from "../../store/actions/Index";

const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);
  const history = useHistory();

  useEffect(() => {
    props.setIngredientsAsync();
  }, []);

  const disableInfo = {
    ...props.ingredients,
  };

  for (const key in disableInfo) {
    disableInfo[key] = disableInfo[key] <= 0;
  }

  const purchaseHandler = () => {
    const sum = Object.keys(props.ingredients)
      .map((k) => props.ingredients[k])
      .reduce((sum, el) => sum + el, 0);

    return sum > 0;
  };

  const purchasingHandler = () => {
    setPurchasing(true);
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    history.push("/checkout");
  };

  let orderSummary = (
    <OrderSummary
      ingredients={props.ingredients}
      purchaseCancelled={purchaseCancelHandler}
      purchaseContinued={purchaseContinueHandler}
      price={props.totalPrice}
    />
  );

  let burger = null;
  if (props.error) {
    burger = <p>ingredient couldn't be loaded</p>;
  } else {
    burger = (
      <>
        <Burger ingredients={props.ingredients} />
        <BuildControls
          ingredientAdded={props.handleAddIngredient}
          ingredientRemoved={props.handleRemoveIngredient}
          disabled={disableInfo}
          price={props.totalPrice}
          purchasable={purchaseHandler()}
          ordered={purchasingHandler}
        />
      </>
    );
  }
  return (
    <div>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    error: state.burger.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleAddIngredient: (ingredientName) =>
      dispatch(addIngredient(ingredientName)),
    handleRemoveIngredient: (ingredientName) =>
      dispatch(removeIngredient(ingredientName)),
    setIngredientsAsync: () => dispatch(initIngredientsAsync()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, AxiosOrders));
