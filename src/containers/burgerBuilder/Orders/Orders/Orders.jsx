import React, { useEffect } from "react";
import { connect } from "react-redux";
import AxiosOrders from "../../../../AxiosOrders";
import Order from "../../../../component/order/Order";
import withErrorHandler from "../../../../hoc/withErrorHandler/withErrorHandler";
import { setOrdersAsync } from "../../../../store/actions/Index";
import Spinner from "../../../../component/ui/spinner/Spinner";

const Orders = (props) => {
  useEffect(() => {
    props.setOrders(props.token);
  }, []);

  let orders = <Spinner />;

  if (!props.loading) {
    orders = props.orders.map((order) => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={order.price}
      />
    ));
  }

  return orders;
};

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.authentication.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setOrders: (token) => dispatch(setOrdersAsync(token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, AxiosOrders));
