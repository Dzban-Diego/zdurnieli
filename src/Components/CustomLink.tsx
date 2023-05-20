import Link from "next/link";
import React from "react";

interface Props {
  href: string;
  text?: string;
  selected?: boolean;
  icon?: React.ReactNode;
  color?: string;
}
export const CustomLink: React.FC<Props> = ({
  href,
  text,
  color,
  selected,
  icon,
}) => {
  return (
    <Link
      href={href}
      className={`m-1 rounded-md p-3 text-xl shadow-md ${
        selected
          ? `bg-liked text-black`
          : `${color ? color : "bg-white dark:bg-black"} text-black dark:text-white`
      }`}
    >
      {text}
      {icon}
    </Link>
  );
};
