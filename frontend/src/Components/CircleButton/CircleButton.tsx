import { BsCheckCircle } from "react-icons/bs";
import "./CircleButton.scss";

type CircleButtonProps = {
  state: boolean;
  handlerFunction: () => void;
};

export const CircleButton = ({ state, handlerFunction }: CircleButtonProps) => (
  <button className="CircleButton" onClick={handlerFunction}>
    <BsCheckCircle size="2rem" color={state ? "#e4d2d2" : "#d8c8c7"} />
  </button>
);
