"use client";
import { changeTheme } from "@/actions";
import { RiMoonFill, RiMoonLine } from "react-icons/ri";

type Props = {
  theme: "light" | "dark";
};

function ChangeThemeButton({ theme }: Props) {
  async function test() {
    await changeTheme();
    const body = window.document.querySelector("html");
    if (body) {
      body.classList.remove("dark", "light");
      body.classList.add(theme === "light" ? "dark" : "light");
    }
  }

  return (
    <button aria-label="Zmień motyw" onClick={test} className="p-4">
      {theme === "light" ? (
        <RiMoonFill size={30} />
      ) : (
        <RiMoonLine size={30} color={"white"} />
      )}
    </button>
  );
}
export default ChangeThemeButton;
