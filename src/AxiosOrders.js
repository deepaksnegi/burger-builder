import axios from "axios";

const AxiosOrders = axios.create({
  baseURL: "https://burger-builder-9838e-default-rtdb.firebaseio.com/",
});

export default AxiosOrders;
