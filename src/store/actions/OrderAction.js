import AxiosOrders from "../../AxiosOrders";
import * as actionTypes from "./ActionTypes";

export const createOrder = (order) => {
  return {
    type: actionTypes.CREATE_ORDER,
    payload: { order: order },
  };
};

export const createOrderFailed = () => {
  return { type: actionTypes.CREATE_ORDER_FAILED };
};

export const purchaseBurgerStart = () => {
  return { type: actionTypes.PURCHASE_BURGER_START };
};

export const createOrderAsync = (order) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    AxiosOrders.post("/orders.json", order)
      .then((response) => {
        dispatch(createOrder({ id: response.data.name, order: order }));
      })
      .catch((error) => {
        dispatch(createOrderFailed());
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

const setOrdersStart = () => {
  return {
    type: actionTypes.SET_ORDERS_START,
  };
};

const setOrders = (orders) => {
  return {
    type: actionTypes.SET_ORDERS,
    payload: {
      orders: orders,
    },
  };
};

const setOrdersFailed = (error) => {
  return {
    type: actionTypes.SET_ORDERS,
    payload: {
      error: error,
    },
  };
};

export const setOrdersAsync = () => {
  return (dispatch) => {
    dispatch(setOrdersStart());
    AxiosOrders.get("/orders.json")
      .then((response) => {
        const orders = [];

        for (const key in response.data) {
          orders.push({ ...response.data[key], id: key });
        }
        dispatch(setOrders(orders));
      })
      .catch((error) => dispatch(setOrdersFailed(error)));
  };
};
