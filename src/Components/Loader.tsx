import React from "react";

type Props = {
  isLoading: boolean;
  className?: string;
};

const Loader: React.FC<Props> = ({ isLoading, className }) => {
  return (
    <div className={`h-1 w-full ${className || ""} ${isLoading ? 'bg-orange animate-pulse ' : 'bg-white'}`} />
  );
};

export default Loader;
