"use client";
import { changeTheme } from "@/actions";
import { useState } from "react";
import { RiMoonFill, RiMoonLine } from "react-icons/ri";

type Props = {
  theme: "light" | "dark";
};

function ChangeThemeButton({ theme: cookieTheme }: Props) {
  const [theme, setTheme] = useState(cookieTheme);

  async function handleChangeTheme() {
    setTheme(theme === "light" ? "dark" : "light");
    const body = window.document.querySelector("html");
    if (body) {
      body.classList.remove("dark", "light");
      body.classList.add(theme === "light" ? "dark" : "light");
    }
    await changeTheme();
  }

  return (
    <button
      aria-label="Zmień motyw"
      onClick={handleChangeTheme}
      className="p-4"
    >
      {theme === "light" ? (
        <RiMoonFill size={30} />
      ) : (
        <RiMoonLine size={30} color={"white"} />
      )}
    </button>
  );
}
export default ChangeThemeButton;
