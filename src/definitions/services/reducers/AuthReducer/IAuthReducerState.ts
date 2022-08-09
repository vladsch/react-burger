export interface IAuthReducerState {
  name: string;
  email: string;
  isAuthorized: boolean;
  resetPassword: boolean;
  checked: boolean;
  loginFailed: boolean;
}