import { authReducer } from "../authReducer";
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
} from "../../actions/authActions";
import {IAuthReducerState} from "../../../definitions/services/reducers/AuthReducer/IAuthReducerState";
import {orderReducer} from "../orderReducer";

const initialState: IAuthReducerState = {
  name: "",
  email: "",
  isAuthorized: false,
  resetPassword: false,
  checked: false,
  loginFailed: false
};

test('should return the initial state auth reducer', () => {
  expect(authReducer(undefined, {type: ''})).toEqual(initialState);
});

test('should handle register request success', () => {
  const name = 'name';
  const email = 'test@test.com';
  const previousState: IAuthReducerState = {
    ...initialState
  };
  const reducerState: IAuthReducerState = {
    ...initialState,
    isAuthorized: true,
    checked: true,
    name,
    email
  };

  expect(authReducer(previousState, { type: REGISTER_SUCCESS, name, email })).toEqual(reducerState);
});

test('should handle register request failed', () => {
  const previousState: IAuthReducerState = { ...initialState };
  const resultState: IAuthReducerState = {
    ...initialState,
    checked: true
  };

  expect(authReducer(previousState, { type: REGISTER_FAILURE })).toEqual(resultState);
});

test('should handle login request success', () => {
  const previousState: IAuthReducerState = {
    ...initialState,
    loginFailed: true
  };

  const name = 'name';
  const email = 'test@test.com';
  const resultState: IAuthReducerState = {
    ...initialState,
    isAuthorized: true,
    checked: true,
    loginFailed: false,
    name: name,
    email: email
  };

  expect(authReducer(previousState, { type: LOGIN_SUCCESS, name, email })).toEqual(resultState);
});

test('should handle login request failed', () => {
  const previousState: IAuthReducerState = { ...initialState };
  const resultState: IAuthReducerState = {
    ...initialState,
    checked: true,
    loginFailed: true
  };

  expect(authReducer(previousState, { type: LOGIN_FAILURE })).toEqual(resultState);
});

test('should handle logout request', () => {
  const resultState: IAuthReducerState = { ...initialState, checked: true };

  expect(authReducer(initialState, { type: LOGOUT })).toEqual(resultState);
});

test('should handle user info request success', () => {
  const userName: string = 'user';
  const email: string = 'user@gmail.com';
  const previousState: IAuthReducerState = {
    ...initialState
  };
  const resultState: IAuthReducerState = {
    ...initialState,
    isAuthorized: true,
    checked: true,
    name: userName,
    email: email
  };

  expect(authReducer(previousState, {
    type: GET_USER_SUCCESS,
    name: userName,
    email: email
  })).toEqual(resultState);
});

test('should handle user info request failed', () => {
  const previousState: IAuthReducerState = {
    ...initialState
  };

  const resultState: IAuthReducerState = {
    ...initialState,
    checked: true
  };

  expect(authReducer(previousState, { type: GET_USER_FAILURE })).toEqual(resultState);
});

test('should handle update user info request success', () => {
  const userName: string = 'user';
  const email: string = 'user@gmail.com';
  const previousState: IAuthReducerState = {
    ...initialState
  };
  const resultState: IAuthReducerState = {
    ...initialState,
    isAuthorized: true,
    checked: true,
    name: userName,
    email: email
  };

  expect(authReducer(previousState, { type: UPDATE_USER_SUCCESS, name: userName, email })).toEqual(resultState);
});

test('should handle update user info request failed', () => {
  const previousState: IAuthReducerState = {
    ...initialState
  };

  const resultState: IAuthReducerState = {
    ...initialState,
    checked: true
  };

  expect(authReducer(previousState, { type: UPDATE_USER_FAILURE })).toEqual(resultState);
});

test('should handle ask to reset password', () => {
  const email: string = 'user@gmail.com';

  const previousState: IAuthReducerState = {
    ...initialState
  };

  const resultState: IAuthReducerState = {
    ...initialState,
    email
  };

  expect(authReducer(previousState, { type: ASK_TO_RESET_PASSWORD_SUCCESS, email })).toEqual(resultState);
});

test('should handle reset password success', () => {
  const previousState: IAuthReducerState = {
    ...initialState
  };

  const resultState: IAuthReducerState = {
    ...initialState,
    resetPassword: true
  };

  expect(authReducer(previousState, { type: RESET_PASSWORD_SUCCESS })).toEqual(resultState);
});
