import Link from "next/link";
import React from "react";

type Props = {
  href: string;
  text?: string;
  selected?: boolean;
  icon?: React.ReactNode;
  color?: string;
  className?: string;
};

export const CustomLink: React.FC<Props> = ({
  href,
  text,
  color,
  selected,
  icon,
  className,
}) => {
  return (
    <Link
      href={href}
      className={`m-1 rounded-md p-3 text-xl shadow-md ${className} ${
        selected
          ? `bg-accent text-black`
          : `${
              color ? color : "bg-white dark:bg-black"
            } text-black dark:text-white`
      }`}
    >
      {text}
      {icon}
    </Link>
  );
};
