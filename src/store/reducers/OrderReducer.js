import * as actionTypes from "../actions/ActionTypes";
import { UpdateObject } from "../utility/UpdateObject";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const purchaseBurgerStart = (state, action) => {
  return UpdateObject(state, {
    loading: true,
  });
};

const createOrder = (state, action) => {
  return UpdateObject(state, {
    orders: state.orders.concat(action.payload.order),
    loading: false,
    purchased: true,
  });
};
const createOrderFailed = (state, action) => {
  return UpdateObject(state, {
    loading: false,
  });
};

const purchaseInit = (state, action) => {
  return UpdateObject(state, {
    purchased: false,
  });
};
const setOrdersStart = (state, action) => {
  return UpdateObject(state, {
    loading: true,
  });
};
const setOrdersFailed = (state, action) => {
  return UpdateObject(state, {
    loading: false,
  });
};
const setOrders = (state, action) => {
  return UpdateObject(state, {
    orders: action.payload.orders,
    loading: false,
  });
};

const OrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state, action);
    case actionTypes.CREATE_ORDER:
      return createOrder(state, action);
    case actionTypes.CREATE_ORDER_FAILED:
      return createOrderFailed(state, action);
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state, action);
    case actionTypes.SET_ORDERS_START:
      return setOrdersStart(state, action);
    case actionTypes.SET_ORDERS_FAILED:
      return setOrdersFailed(state, action);
    case actionTypes.SET_ORDERS:
      return setOrders(state, action);
    default:
      return state;
  }
};

export default OrderReducer;
