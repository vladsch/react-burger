import {IUser} from "../models/IUser";
import {IResponse} from "./IResponse";

export interface IUserResponse extends IResponse{
  user: IUser;
}