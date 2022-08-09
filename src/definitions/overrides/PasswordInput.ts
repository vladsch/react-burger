import {
    PasswordInput as PasswordInputUI,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";

export const PasswordInput: React.FC<{
    value: string;
    name: string;
    size?: "small" | "default" | undefined;
    onChange(e: React.ChangeEvent<HTMLInputElement>): void;
    placeholder?: string;
}> = PasswordInputUI;