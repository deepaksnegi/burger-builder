import React, { useState } from "react";
import BuildControls from "../../component/burger/buildControls/BuildControls";
import Burger from "../../component/burger/Burger";
import OrderSummary from "../../component/burger/orderSummary/OrderSummary";
import Modal from "../../component/ui/modal/Modal";

const BurgerBuilder = () => {
  const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.4,
    bacon: 0.7,
  };
  const [ingredient, setIngredient] = useState({
    meat: 0,
    bacon: 0,
    cheese: 0,
    salad: 0,
  });

  const [purchasable, setPurchasable] = useState(false);

  const [purchasing, setPurchasing] = useState(false);

  const [totalPrice, setTotalPrice] = useState(0);

  const addIngredientHandler = (type) => {
    const oldCount = ingredient[type];
    const updatedCount = oldCount + 1;
    const updatedIngredient = { ...ingredient };
    updatedIngredient[type] = updatedCount;

    const newTotalPrice = totalPrice + INGREDIENT_PRICES[type];
    setIngredient(updatedIngredient);
    console.log(ingredient);
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
    alert("Thankyou!!");
  };

  return (
    <div>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        <OrderSummary
          ingredient={ingredient}
          purchaseCancelled={purchaseCancelHandler}
          purchaseContinued={purchaseContinueHandler}
          price={totalPrice}
        />
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

export default BurgerBuilder;
