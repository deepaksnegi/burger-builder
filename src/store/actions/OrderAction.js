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
