import {
    Button as ButtonUI,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {SyntheticEvent} from "react";

export const Button: React.FC<{
    type?: 'secondary' | 'primary';
    size?: 'small' | 'medium' | 'large';
    onClick?: (() => void) | ((e: SyntheticEvent) => void);
    disabled?: boolean;
    name?: string;
    htmlType?: 'button' | 'submit' | 'reset';
    children: React.ReactNode;
}> = ButtonUI;