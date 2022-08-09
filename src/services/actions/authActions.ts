import {
  loginRequest,
  logoutRequest,
  registerRequest,
  getUserRequest,
  updateUserRequest,
  askToResetPasswordRequest,
  resetPasswordRequest
} from "../../utils/api";
import { cookies } from "../../utils/helpers";
import {TOKEN} from "../../definitions/enums/Token";
import {AppThunk} from "../store";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILURE = "GET_USER_FAILURE";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE";
export const ASK_TO_RESET_PASSWORD_SUCCESS = "RESTORE_USER_EMAIL_SUCCESS";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";

export function login(email: string, password: string): AppThunk {
  return function (dispatch) {
    loginRequest(email, password)
        .then((response) => {
          if (response && response.success) {
            dispatch({
              type: LOGIN_SUCCESS,
              email: response.user.email,
              name: response.user.name
            });

            cookies.set(TOKEN.ACCESS, response[TOKEN.ACCESS]);
            cookies.set(TOKEN.REFRESH, response[TOKEN.REFRESH]);
          }
        })
        .catch((err) => {
          dispatch({ type: LOGIN_FAILURE });
        });
  };
}

export function logout(): AppThunk {
  return function (dispatch) {
    logoutRequest()
        .then(() => {
          dispatch({
            type: LOGOUT
          });
          cookies.delete(TOKEN.ACCESS);
          cookies.delete(TOKEN.REFRESH);
        })
        .catch((err) => {
          console.log(err);
        });
  };
}

export function register(email: string, password: string, name: string) {
  return function (dispatch) {
    registerRequest(email, password, name)
      .then((response) => {
        if (response && response.success) {
          dispatch({
            type: REGISTER_SUCCESS,
            email: response.user.email,
            name: response.user.name,
          });
          cookies.set(TOKEN.ACCESS, response[TOKEN.ACCESS]);
          cookies.set(TOKEN.REFRESH, response[TOKEN.REFRESH]);
        }
      })
      .catch((err) => {
        dispatch({ type: REGISTER_FAILURE });
        console.log(err);
      })
  };
}

export function getUser(): AppThunk {
  return function (dispatch) {
    getUserRequest()
      .then((response) => {
        if (response && response.success) {
          dispatch({
            type: GET_USER_SUCCESS,
            email: response.user.email,
            name: response.user.name,
          });
        }
      })
      .catch(() => {
        dispatch({
          type: GET_USER_FAILURE,
        });
      });
  };
}

export function updateUser(name: string, email: string, password: string): AppThunk {
  return function (dispatch) {
    updateUserRequest(name, email, password)
        .then(() => {
          dispatch({
            type: UPDATE_USER_SUCCESS,
            name,
            email,
          });
        })
        .catch((err) => {
          dispatch({
            type: UPDATE_USER_FAILURE,
          });
        });
  };
}

export function askToResetPassword(email: string): AppThunk {
  return function (dispatch) {
    askToResetPasswordRequest(email)
      .then((response) => {
        if (response && response.success) {
          dispatch({
            type: ASK_TO_RESET_PASSWORD_SUCCESS,
            email: email,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
export function resetPassword(password: string, token: string): AppThunk {
  return function (dispatch) {
    resetPasswordRequest(password, token)
      .then((response) => {
        if (response && response.success) {
          dispatch({
            type: RESET_PASSWORD_SUCCESS,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
