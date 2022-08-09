import {
    EmailInput as EmailInputUI,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";

export const EmailInput: React.FC<{
    value: string;
    name: string;
    size?: "small" | "default" | undefined;
    onChange(e: React.ChangeEvent<HTMLInputElement>): void;
    placeholder?: string;
}> = EmailInputUI;