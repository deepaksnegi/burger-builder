import * as actionTypes from "../actions/ActionTypes";
import { UpdateObject } from "../utility/UpdateObject";

const initialState = {
  ingredients: {},
  totalPrice: 0,
  error: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.4,
  bacon: 0.7,
};

const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.payload.ingredientName]:
      state.ingredients[action.payload.ingredientName] + 1,
  };
  const updatedIngredients = UpdateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice:
      state.totalPrice + INGREDIENT_PRICES[action.payload.ingredientName],
  };
  return UpdateObject(state, updatedState);
};

const removedIngredient = (state, action) => {
  const removedIngredient = {
    [action.payload.ingredientName]:
      state.ingredients[action.payload.ingredientName] - 1,
  };
  const removedIngredients = UpdateObject(state.ingredients, removedIngredient);
  const modifiedState = {
    ingredients: removedIngredients,
    totalPrice:
      state.totalPrice - INGREDIENT_PRICES[action.payload.ingredientName],
  };
  return UpdateObject(state, modifiedState);
};

const setIngredients = (state, action) => {
  return UpdateObject(state, {
    ingredients: {
      ...action.payload.ingredients,
    },
    error: false,
    totalPrice: 0,
  });
};
const BurgerBuilderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removedIngredient(state, action);
    case actionTypes.SET_INGREDIENT:
      return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENT_FAILED:
      return UpdateObject(state, {
        error: true,
      });
    default:
      return state;
  }
};

export default BurgerBuilderReducer;
