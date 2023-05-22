"use server";
import { cookies } from "next/headers";

export async function changeTheme() {
  const cookieStore = cookies();
  const Theme = cookieStore.get("theme")?.value;
  const newTheme = Theme === "dark" ? "light" : "dark";
  cookieStore.set("theme", newTheme);
}
