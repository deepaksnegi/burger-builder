import * as actionTypes from "../actions/Actions";

const initialState = {
  ingredients: {
    salad: 0,
    cheese: 0,
    bacon: 0,
    meat: 0,
  },
  totalPrice: 0,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.4,
  bacon: 0.7,
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      //   const updateIngredient = { ...state.ingredient };
      // updateIngredient[action.payload.type] = state.ingredient[action.payload.ingredientName]+1  ;
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload.ingredientName]:
            state.ingredients[action.payload.ingredientName] + 1,
        },
        totalPrice:
          state.totalPrice + INGREDIENT_PRICES[action.payload.ingredientName],
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload.ingredientName]:
            state.ingredients[action.payload.ingredientName] - 1,
        },
        totalPrice:
          state.totalPrice - INGREDIENT_PRICES[action.payload.ingredientName],
      };
    default:
      return state;
  }
};

export default Reducer;
