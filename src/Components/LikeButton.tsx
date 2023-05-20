'use client';
import React from "react";
import { Button } from "./Button";
import { RiHeart3Fill } from "react-icons/ri";

interface LikeButtonProps {
  name: string;
  id: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ id }) => {
  return (
    <>
      <Button
        onClick={() => console.log("like")}
        aria-label="Zmień ulubienie"
        icon={<RiHeart3Fill color={"#c395e0"} />}
      />
    </>
  );
};

export default LikeButton;
