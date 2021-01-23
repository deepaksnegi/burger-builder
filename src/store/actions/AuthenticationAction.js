import axios from "axios";
import * as actionTypes from "./ActionTypes";

export const authenticationStart = () => {
  return {
    type: actionTypes.AUTHENTICATION_START,
  };
};

export const authenticationSuccess = (authenticationData) => {
  return {
    type: actionTypes.AUTHENTICATION_SUCCESS,
    payload: { authenticationData: authenticationData.idToken },
  };
};

export const authenticationFailed = (error) => {
  return {
    type: actionTypes.AUTHENTICATION_FAILED,
    payload: { error: error },
  };
};

export const authenticateAsync = (email, password) => {
  return (dispatch) => {
    dispatch(authenticationStart());
    const authenticateData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAm-jkBXZnD2kvZyxhP7ljxDeKxvTh696k",
        authenticateData
      )
      .then((response) => {
        dispatch(authenticationSuccess(response.data));
      })
      .catch((error) => dispatch(authenticationFailed(error)));
  };
};
