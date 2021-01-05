import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AxiosOrders from "../../AxiosOrders";
import BuildControls from "../../component/burger/buildControls/BuildControls";
import Burger from "../../component/burger/Burger";
import OrderSummary from "../../component/burger/orderSummary/OrderSummary";
import Modal from "../../component/ui/modal/Modal";
import Spinner from "../../component/ui/spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const BurgerBuilder = (props) => {
  const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.4,
    bacon: 0.7,
  };

  const [ingredient, setIngredient] = useState({});

  const [purchasable, setPurchasable] = useState(false);

  const [purchasing, setPurchasing] = useState(false);

  const [totalPrice, setTotalPrice] = useState(0);

  const [loading, setLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    AxiosOrders.get(
      "https://burger-builder-9838e-default-rtdb.firebaseio.com/ingredients.json"
    ).then((response) => {
      setIngredient(response.data);
    });
  }, []);

  const addIngredientHandler = (type) => {
    const oldCount = ingredient[type];
    const updatedCount = oldCount + 1;
    const updatedIngredient = { ...ingredient };
    updatedIngredient[type] = updatedCount;

    const newTotalPrice = totalPrice + INGREDIENT_PRICES[type];
    setIngredient(updatedIngredient);
    setTotalPrice(newTotalPrice);
    purchaseHandler(updatedIngredient);
  };

  const removeIngredientHandler = (type) => {
    const oldCount = ingredient[type];
    const updatedCount = oldCount > 0 ? oldCount - 1 : oldCount;
    const updatedIngredient = { ...ingredient };
    updatedIngredient[type] = updatedCount;
    const newTotalPrice = totalPrice - INGREDIENT_PRICES[type];
    setIngredient(updatedIngredient);
    setTotalPrice(newTotalPrice);
    purchaseHandler(updatedIngredient);
  };

  const disableInfo = {
    ...ingredient,
  };

  for (const key in disableInfo) {
    disableInfo[key] = disableInfo[key] <= 0;
  }

  const purchaseHandler = (ingredient) => {
    const sum = Object.keys(ingredient)
      .map((k) => ingredient[k])
      .reduce((sum, el) => sum + el, 0);

    setPurchasable(sum > 0);
  };

  const purchasingHandler = () => {
    setPurchasing(true);
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    const queryParameter = [];
    for (const key in ingredient) {
      queryParameter.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(ingredient[key])}`
      );
    }

    queryParameter.push(`price=${totalPrice}`);
    const queryString = queryParameter.join("&");

    history.push({
      pathname: "/checkout",
      search: `?${queryString}`,
    });
  };

  let orderSummary = (
    <OrderSummary
      ingredient={ingredient}
      purchaseCancelled={purchaseCancelHandler}
      purchaseContinued={purchaseContinueHandler}
      price={totalPrice}
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
      <Burger ingredient={ingredient} />
      <BuildControls
        ingredientAdded={addIngredientHandler}
        ingredientRemoved={removeIngredientHandler}
        disabled={disableInfo}
        price={totalPrice}
        purchasable={purchasable}
        ordered={purchasingHandler}
      />
    </div>
  );
};

export default withErrorHandler(BurgerBuilder, AxiosOrders);
