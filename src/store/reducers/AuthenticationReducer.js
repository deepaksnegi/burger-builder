import * as actionTypes from "../actions/ActionTypes";
import { UpdateObject } from "../utility/UpdateObject";

const initialState = {
  token: null,
  loading: false,
  error: null,
};

const AuthenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTHENTICATION_START:
      return UpdateObject(state, { loading: true });

    case actionTypes.AUTHENTICATION_FAILED:
      return UpdateObject(state, {
        loading: false,
        error: action.payload.error,
      });

    case actionTypes.AUTHENTICATION_SUCCESS:
      return UpdateObject(state, {
        loading: false,
        token: action.payload.token,
      });

    default:
      return state;
  }
};

export default AuthenticationReducer;
