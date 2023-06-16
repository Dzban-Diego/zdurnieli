"use server";
import { cookies } from "next/headers";

export async function changeTheme() {
  const cookieStore = cookies();
  const Theme = cookieStore.get("theme")?.value;
  const newTheme = Theme === "dark" ? "light" : "dark";
  //@ts-ignore
  cookieStore.set("theme", newTheme, {
    expires: 1000 * 60 * 60 * 24 * 5,
  });
}

export async function getTheme() {
  const cookieStore = cookies();
  const Theme = cookieStore.get("theme")?.value || "light";
  return Theme;
}

export type Keys = "line" | "stop";
type Value = {
  name: string;
  id: string;
};

export async function handleLike(key: Keys, value: Value) {
  const likedString = cookies().get(key)?.value || "[]";
  const liked = JSON.parse(likedString) as Value[];
  console.log(liked);

  const index = liked.findIndex((item) => item.id === value.id);
  if (index !== -1) {
    liked.splice(index, 1);
    // @ts-ignore
    cookies().set(key, JSON.stringify(liked), {
      expires: 1000 * 60 * 60 * 24 * 5,
    });
    return false;
  } else {
    liked.push(value);
    // @ts-ignore
    cookies().set(key, JSON.stringify(liked), {
      expires: 1000 * 60 * 60 * 24 * 5,
    });
    return true;
  }
}

export async function getLikeStatus(key: Keys, id: string) {
  const likedString = cookies().get(key)?.value || "[]";
  const liked = JSON.parse(likedString) as Value[];

  return liked.findIndex((item) => item.id === id) !== -1;
}

export async function getLiked(key: Keys) {
  const likedString = cookies().get(key)?.value || "[]";
  const liked = JSON.parse(likedString) as Value[];
  return liked;
}
