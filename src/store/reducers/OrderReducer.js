import * as actionTypes from "../actions/ActionTypes";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
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
        orders: state.orders.concat(action.payload.order),
        loading: false,
        purchased: true,
      };
    case actionTypes.CREATE_ORDER_FAILED:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false,
      };
    default:
      return state;
  }
};

export default OrderReducer;
