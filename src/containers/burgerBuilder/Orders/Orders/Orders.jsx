import React, { useState, useEffect } from "react";
import AxiosOrders from "../../../../AxiosOrders";
import Order from "../../../../component/order/Order";
import withErrorHandler from "../../../../hoc/withErrorHandler/withErrorHandler";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    AxiosOrders.get("/orders.json")
      .then((response) => {
        const orders = [];

        for (const key in response.data) {
          orders.push({ ...response.data[key], id: key });
        }
        setOrders(orders);
      })
      .catch((error) => console.log(error.message));
  }, []);

  return orders.map((order) => (
    <div>
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={order.price}
      />
    </div>
  ));
};

export default withErrorHandler(Orders, AxiosOrders);
