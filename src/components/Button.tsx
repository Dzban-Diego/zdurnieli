'use client';
import type { PropsWithChildren } from "react";
import React  from "react";

type Props = PropsWithChildren & {
  onClick: () => void;
  text?: string;
  icon?: React.ReactNode;
  animateOnClick?: boolean;
  animationOnClick?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const Button: React.FC<Props> = ({ onClick, text, icon,  ...props}) => {
  return (
    <button onClick={onClick} className={`m-1 p-2 text-4xl text-font`} {...props}>
      {text}
      {icon}
    </button>
  );
};
