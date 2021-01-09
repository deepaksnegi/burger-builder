import AxiosOrders from "../../AxiosOrders";
import * as actionTypes from "./ActionTypes";

export const addIngredient = (ingredientName) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    payload: { ingredientName: ingredientName },
  };
};

export const removeIngredient = (ingredientName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    payload: { ingredientName: ingredientName },
  };
};

const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENT,
    payload: { ingredients: ingredients },
  };
};

export const failedFetchingIngredients = () => {
  return {
    type: actionTypes.FETCH_INGREDIENT_FAILED,
  };
};

export const initIngredientsAsync = () => {
  return (dispatch) => {
    AxiosOrders.get("ingredients.json")
      .then((response) => {
        dispatch(setIngredients(response.data));
      })
      .catch((error) => {
        dispatch(failedFetchingIngredients());
      });
  };
};
