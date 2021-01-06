import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import AxiosOrders from "../../AxiosOrders";
import BuildControls from "../../component/burger/buildControls/BuildControls";
import Burger from "../../component/burger/Burger";
import OrderSummary from "../../component/burger/orderSummary/OrderSummary";
import Modal from "../../component/ui/modal/Modal";
import Spinner from "../../component/ui/spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from "../../store/actions/Actions";

const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);

  const [loading, setLoading] = useState(false);

  const history = useHistory();

  // useEffect(() => {
  //   AxiosOrders.get(
  //     "https://burger-builder-9838e-default-rtdb.firebaseio.com/ingredients.json"
  //   ).then((response) => {
  //     setIngredient(response.data);
  //   });
  // }, []);

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
      ingredient={props.ingredients}
      purchaseCancelled={purchaseCancelHandler}
      purchaseContinued={purchaseContinueHandler}
      price={props.totalPrice}
    />
  );

  if (loading) {
    orderSummary = <Spinner />;
  }
  return (
    <div>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      <Burger ingredient={props.ingredients} />
      <BuildControls
        ingredientAdded={props.handleAddIngredient}
        ingredientRemoved={props.handleRemoveIngredient}
        disabled={disableInfo}
        price={props.totalPrice}
        purchasable={purchaseHandler()}
        ordered={purchasingHandler}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleAddIngredient: (ingredientName) =>
      dispatch({
        type: actionTypes.ADD_INGREDIENT,
        payload: { ingredientName: ingredientName },
      }),
    handleRemoveIngredient: (ingredientName) =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        payload: { ingredientName: ingredientName },
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, AxiosOrders));
