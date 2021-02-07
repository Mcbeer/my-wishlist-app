import { MouseEvent } from "react";
import "./Button.scss";

export interface ButtonProps {
  onClick: (e: MouseEvent) => void;
  label: string;
  type: ButtonTypes;
}

export enum ButtonTypes {
  PRIMARY = "Button__primary",
  SECONDARY = "Button__secondary",
  ACTION = "Button__action",
}

export const Button = ({ onClick, label, type }: ButtonProps) => {
  const buttonStyles = ["Button"];

  if (type) {
    buttonStyles.push(type);
  }

  return (
    <button className={buttonStyles.join(" ")} onClick={onClick}>
      {label}
    </button>
  );
};
