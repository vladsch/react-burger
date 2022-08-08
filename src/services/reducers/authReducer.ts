import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  ASK_TO_RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_SUCCESS
} from "../actions/authActions";
import {IAuthReducerState} from "../../definitions/services/reducers/AuthReducer/IAuthReducerState";
import {IAuthReducerAction} from "../../definitions/services/reducers/AuthReducer/IAuthReducerAction";

const initialState: IAuthReducerState = {
  name: "",
  email: "",
  isAuthorized: false,
  resetPassword: false,
  checked: false,
  loginFailed: false
};

export const authReducer = (state: IAuthReducerState = initialState, action: IAuthReducerAction): IAuthReducerState => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthorized: true,
        checked: true,
        loginFailed: false,
        name: action.name ?? '',
        email: action.email ?? ''
      };
    }
    case REGISTER_SUCCESS:
    case GET_USER_SUCCESS:
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        isAuthorized: true,
        checked: true,
        name: action.name ?? '',
        email: action.email ?? ''
      };
    }

    case LOGIN_FAILURE: {
      return {
        ...initialState,
        checked: true,
        loginFailed: true
      };
    }
    case REGISTER_FAILURE:
    case GET_USER_FAILURE:
    case UPDATE_USER_FAILURE: {
      return {
        ...initialState,
        checked: true
      };
    }

    case ASK_TO_RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        email: action.email ?? ''
      };
    }

    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPassword: true
      };
    }

    case LOGOUT: {
      return {
        ...initialState,
        checked: true
      };
    }

    default: {
      return state;
    }
  }
};
