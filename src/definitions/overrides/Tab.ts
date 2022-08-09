import {
    Tab as TabUI,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";

export const Tab: React.FC<{
    active: boolean;
    value: string;
    onClick: (value: string) => void;
    children: React.ReactNode;
}> = TabUI;