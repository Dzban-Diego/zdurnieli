"use client";
import React, { useState } from "react";
import { Button } from "./Button";
import { RiHeart3Fill, RiHeart3Line } from "react-icons/ri";
import { handleLike } from "@/actions";
import { Keys } from "@/config";

type LikeButtonProps = {
  name: string;
  id: string;
  isLiked: boolean;
  Theme: string;
  cookieKey: Keys;
};

const LikeButton: React.FC<LikeButtonProps> = ({
  isLiked,
  Theme,
  id,
  name,
  cookieKey,
}) => {
  const [isLikedState, setIsLikedState] = useState(isLiked);

  async function toggleLike() {
    setIsLikedState(!isLikedState);
    const data = await handleLike(cookieKey, { id, name });
    localStorage.setItem(cookieKey, data || '');
  }

  return (
    <>
      {isLikedState ? (
        <Button
          onClick={toggleLike}
          aria-label="Zmień ulubienie"
          icon={<RiHeart3Fill color={"#c395e0"} />}
        />
      ) : (
        <Button
          onClick={toggleLike}
          aria-label="Zmień ulubienie"
          icon={<RiHeart3Line color={Theme === "dark" ? "white" : "#6a6a6a"} />}
        />
      )}
    </>
  );
};

export default LikeButton;
