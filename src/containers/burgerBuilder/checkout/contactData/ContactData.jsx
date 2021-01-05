import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import AxiosOrders from "../../../../AxiosOrders";
import Button from "../../../../component/ui/button/Button";
import Input from "../../../../component/ui/input/Input";
import Spinner from "../../../../component/ui/spinner/Spinner";
import "./ContactData.css";

const ContactData = (props) => {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: "input",
      elementConfiguration: {
        type: "text",
        label: "name",
        name: "name",
        placeholder: "your name.",
      },
      value: "",
    },
    email: {
      elementType: "input",
      elementConfiguration: {
        type: "text",
        label: "email",
        name: "email",
        placeholder: "your email.",
      },
      value: "",
    },
    city: {
      elementType: "input",
      elementConfiguration: {
        type: "text",
        label: "city",
        name: "city",
        placeholder: "your city.",
      },
      value: "",
    },
    zipCode: {
      elementType: "input",
      elementConfiguration: {
        type: "text",
        label: "zipCode",
        name: "zipCode",
        placeholder: "your zip code.",
      },
      value: "",
    },
    delivery: {
      elementType: "select",
      elementConfiguration: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" },
        ],
      },
      value: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const orderHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = [];
    for (const key in orderForm) {
      formData.push({ key: orderForm[key] });
    }

    const order = {
      ingredients: props.ingredients,
      price: props.price,
      customer: formData,
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

  const inputChangeHandler = (event, inputIdentifier) => {
    let updatedOrderForm = { ...orderForm }; //Doesn't deeply clone nested object, so they needed to be clone again
    let UpdatedOrderFormElement = { ...updatedOrderForm[inputIdentifier] };
    UpdatedOrderFormElement.value = event.target.value;
    updatedOrderForm[inputIdentifier] = UpdatedOrderFormElement;
    setOrderForm(updatedOrderForm);
  };

  let form = (
    <form onSubmit={orderHandler}>
      {Object.keys(orderForm).map((key) => {
        return (
          <Input
            key={key}
            elementType={orderForm[key].elementType}
            elementConfiguration={orderForm[key].elementConfiguration}
            value={orderForm[key].value}
            changed={(event) => inputChangeHandler(event, key)}
          />
        );
      })}
      <Button buttonType="Success">ORDER</Button>
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
