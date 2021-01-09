import * as actionTypes from "../actions/ActionTypes";

const initialState = {
  orders: [],
  loading: false,
};

const OrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.CREATE_ORDER:
      return {
        ...state,
        orders: [...state.orders, ...action.payload.order],
        loading: false,
      };
    case actionTypes.CREATE_ORDER_FAILED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default OrderReducer;
