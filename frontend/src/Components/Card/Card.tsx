import { ReactNode } from "react";
import "./Card.scss";

export interface CardProps {
  children: ReactNode;
}

export const Card = ({ children }: CardProps) => (
  <div className="Card">{children}</div>
);
