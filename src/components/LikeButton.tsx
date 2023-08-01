"use client";
import React from "react";
import { Button } from "./Button";
import { RiHeart3Fill, RiHeart3Line } from "react-icons/ri";
import { Keys, handleLike } from "@/actions";

type LikeButtonProps = {
  name: string;
  id: string;
  isLiked: boolean;
  Theme: string;
  cookieKey: Keys;
};

// @ts-ignore
const LikeButton: React.FC<LikeButtonProps> = async ({
  isLiked,
  Theme,
  id,
  name,
  cookieKey,
}) => {
  async function toggleLike() {
    const data = await handleLike(cookieKey, { id, name });
    localStorage.setItem(cookieKey, data || '');
  }

  return (
    <>
      {isLiked ? (
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
