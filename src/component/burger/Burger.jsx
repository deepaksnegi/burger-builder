import React from "react";
import "./Burger.css";
import BurgerIngredient from "./burgerIngredient/BurgerIngredient";

const Burger = (props) => {
  //Create an array of empty arrays from an key value pair object.
  //Each array represents an key/property of the object having length as value of corresponding key
  let transformedIngredients = Object.keys(props.ingredient)
    .map((k) =>
      [...Array(props.ingredient[k])].map((_, index) => (
        <BurgerIngredient key={k + index} type={k} />
      ))
    )
    .reduce((transformedIngredients, ingredient) => {
      return transformedIngredients.concat(ingredient);
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please add ingredient</p>;
  }
  return (
    <div className="Burger">
      <BurgerIngredient type="burger-top" />
      {transformedIngredients}
      <BurgerIngredient type="burger-bottom" />
    </div>
  );
};

export default Burger;
