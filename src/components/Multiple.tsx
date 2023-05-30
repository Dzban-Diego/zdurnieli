import type { PropsWithChildren } from "react";
import React from "react";

interface Props extends PropsWithChildren {
  instances: number;
}
export const Multiple: React.FC<Props> = ({ instances, children }) => {
  const arr: React.ReactNode[] = [];

  for (let i = 0; i < instances; i++) {
    arr.push(children);
  }
  return <>{arr}</>;
};
