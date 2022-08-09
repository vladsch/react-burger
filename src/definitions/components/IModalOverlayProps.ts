import {MouseEventHandler} from "react";
import {IChildren} from "./IChildren";

export interface IModalOverlayProps extends IChildren{
    onClose?: () => void;
}