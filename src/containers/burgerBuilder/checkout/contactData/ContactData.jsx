import React, { useState } from "react";
import { connect } from "react-redux";
import AxiosOrders from "../../../../AxiosOrders";
import Button from "../../../../component/ui/button/Button";
import Input from "../../../../component/ui/input/Input";
import Spinner from "../../../../component/ui/spinner/Spinner";
import withErrorHandler from "../../../../hoc/withErrorHandler/withErrorHandler";
import { createOrder } from "../../../../store/actions/Index";
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
      validation: {
        required: true,
        maximumLength: 10,
        minimumLength: 2,
      },
      isValid: false,
      isTouched: false,
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
      validation: {
        required: true,
      },
      isValid: false,
      isTouched: false,
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
      validation: {
        required: true,
      },
      isValid: false,
      isTouched: false,
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
      validation: {
        required: true,
        maximumLength: 6,
        minimumLength: 6,
      },
      isValid: false,
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
      isValid: true,
    },
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (const key in orderForm) {
      formData[key] = orderForm[key].value;
    }

    const order = {
      ingredients: props.ingredients,
      price: props.price,
      orderData: formData,
    };

    props.createOrder(order);
  };

  const validateForm = (value, rules) => {
    let isValid = true;

    if (rules?.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules?.maximumLength) {
      isValid = value.length <= rules.maximumLength && isValid;
    }

    if (rules?.minimumLength) {
      isValid = value.length >= rules.minimumLength && isValid;
    }

    return isValid;
  };

  const inputChangeHandler = (event, inputIdentifier) => {
    let updatedOrderForm = { ...orderForm }; //Doesn't deeply clone nested object, so they needed to be clone again
    //could have been done: {...orderForm,orderForm[inputIdentifier]: updatedOrderForm[inputIdentifier] }
    //use concat in arrays as push manipulate original array and concat return new array
    let UpdatedOrderFormElement = { ...updatedOrderForm[inputIdentifier] };
    UpdatedOrderFormElement.value = event.target.value;
    UpdatedOrderFormElement.isValid = validateForm(
      event.target.value,
      UpdatedOrderFormElement.validation
    );
    UpdatedOrderFormElement.isTouched = true;
    updatedOrderForm[inputIdentifier] = UpdatedOrderFormElement;

    let isFormValid = true;
    for (const key in updatedOrderForm) {
      if (!updatedOrderForm[key].isValid) {
        isFormValid = false;
        break;
      }
    }
    setIsFormValid(isFormValid);
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
            isValid={orderForm[key].isValid}
            shouldValidate={orderForm[key].validation}
            isTouched={orderForm[key].isTouched}
            changed={(event) => inputChangeHandler(event, key)}
          />
        );
      })}
      <Button disable={!isFormValid} buttonType={"Success"}>
        ORDER
      </Button>
    </form>
  );

  if (props.loading) {
    form = <Spinner />;
  }

  return (
    <div className="ContactData">
      <h4>Enter your contact data:</h4>
      {form}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    loading: state.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createOrder: (order) => {
      dispatch(createOrder(order));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, AxiosOrders));
