import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import AxiosOrders from "../../../../AxiosOrders";
import Button from "../../../../component/ui/button/Button";
import Spinner from "../../../../component/ui/spinner/Spinner";
import "./ContactData.css";

const ContactData = (props) => {
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    address: {
      city: "",
      zipCode: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const orderHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    const order = {
      ingredients: props.ingredients,
      price: props.price,
      customer: {
        name: "Deepak",
        address: {
          city: "test",
          zip: 123,
          isVIP: false,
          email: "test@example.com",
        },
      },
    };

    AxiosOrders.post("/orders.json", order)
      .then((response) => {
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });

    props.history.push("/");
  };

  let form = (
    <form>
      <input type="text" name="name" placeholder="your name." />
      <input type="email" name="email" placeholder="your email." />
      <input type="text" name="city" placeholder="your city." />
      <input type="text" name="zipCode" placeholder="your zip code." />
      <Button buttonType="Success" clicked={orderHandler}>
        ORDER
      </Button>
    </form>
  );

  if (loading) {
    form = <Spinner />;
  }

  return (
    <div className="ContactData">
      <h4>Enter your contact data:</h4>
      {form}
    </div>
  );
};

export default withRouter(ContactData);
