import React, { useState } from "react";
import { connect } from "react-redux";
import Button from "../../component/ui/button/Button";
import Input from "../../component/ui/input/Input";
import { authenticateAsync } from "../../store/actions/Index";
import "./Authentication.css";
import Spinner from "../../component/ui/spinner/Spinner";

const Authentication = (props) => {
  const [loginForm, setLoginForm] = useState({
    username: {
      elementType: "input",
      elementConfiguration: {
        type: "email",
        label: "username",
        name: "username",
        placeholder: "Enter your user name",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      isValid: false,
      isTouched: false,
    },
    password: {
      elementType: "input",
      elementConfiguration: {
        type: "password",
        label: "password",
        name: "password",
        placeholder: "Enter your password",
      },
      value: "",
      validation: {
        required: true,
        maximumLength: 30,
        minimumLength: 6,
      },
      isValid: false,
      isTouched: false,
    },
  });

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

    if (rules?.isEmail) {
      const emailValidationRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      return emailValidationRegex.test(value) && isValid;
    }

    return isValid;
  };

  const [isFormValid, setIsFormValid] = useState(false);

  const inputChangeHandler = (event, inputIdentifier) => {
    let updatedLoginForm = { ...loginForm };
    let UpdatedLoginFormElement = { ...updatedLoginForm[inputIdentifier] };
    UpdatedLoginFormElement.value = event.target.value;
    UpdatedLoginFormElement.isValid = validateForm(
      event.target.value,
      UpdatedLoginFormElement.validation
    );
    UpdatedLoginFormElement.isTouched = true;
    updatedLoginForm[inputIdentifier] = UpdatedLoginFormElement;

    let isFormValid = true;
    for (const key in updatedLoginForm) {
      if (!updatedLoginForm[key].isValid) {
        isFormValid = false;
        break;
      }
    }
    setIsFormValid(isFormValid);
    setLoginForm(updatedLoginForm);
  };

  const onLogin = (event) => {
    event.preventDefault();
    props.authenticate(loginForm.username.value, loginForm.password.value);
  };

  let authenticationForm = (
    <div className="Authentication">
      <form onSubmit={onLogin}>
        {Object.keys(loginForm).map((key) => (
          <Input
            key={key}
            elementType={loginForm[key].elementType}
            value={loginForm[key].value}
            isValid={loginForm[key].isValid}
            elementConfiguration={loginForm[key].elementConfiguration}
            shouldValidate={loginForm[key].validation}
            isTouched={loginForm[key].isTouched}
            changed={(event) => inputChangeHandler(event, key)}
          />
        ))}
        <Button disable={!isFormValid} buttonType={"Success"}>
          Login
        </Button>
      </form>
    </div>
  );

  if (props.loading) {
    authenticationForm = <Spinner />;
  }

  return <>{authenticationForm};</>;
};

const mapStateToProps = (state) => {
  return {
    loading: state.authentication.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authenticate: (email, password) =>
      dispatch(authenticateAsync(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
