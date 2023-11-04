"use server";
import { Keys } from "@/config";
import { calculateKey } from "@/helpers";
import { cookies } from "next/headers";

export async function changeTheme() {
  const cookieStore = cookies();
  const Theme = cookieStore.get("theme")?.value;
  const newTheme = Theme === "dark" ? "light" : "dark";
  cookieStore.set("theme", newTheme, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
  });
  return newTheme;
}

export async function getTheme() {
  const cookieStore = cookies();
  const Theme = cookieStore.get("theme")?.value || "light";
  return Theme as "light" | "dark";
}

type Value = {
  name: string;
  id: string;
};

export async function handleLike(k: Keys, value: Value, city: string) {
  const key = calculateKey(k, city);
  const cookieStore = cookies();
  const likedString = cookieStore.get(key)?.value || "[]";
  const liked = JSON.parse(likedString) as Value[];

  const index = liked.findIndex(
    (item) => item.id.replaceAll("/", "-") === value.id
  );

  if (index !== -1) {
    liked.splice(index, 1);
    cookies().set(key, JSON.stringify(liked), {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
    });
    return cookies().get(key)?.value;
  } else {
    liked.push(value);
    cookies().set(key, JSON.stringify(liked), {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
    });
    return cookies().get(key)?.value;
  }
}

export async function getLikeStatus(k: Keys, id: string, city: string) {
  const key = calculateKey(k, city);
  const likedString = cookies().get(key)?.value || "[]";
  const liked = JSON.parse(likedString) as Value[];

  return liked.findIndex((item) => item.id.replaceAll("/", "-") === id) !== -1;
}

export async function getLiked(k: Keys, city: string) {
  const key = calculateKey(k, city);
  const likedString = cookies().get(key)?.value || "[]";
  const liked = JSON.parse(likedString) as Value[];
  return liked.map((item) => ({
    ...item,
    id: item.id.replaceAll("/", "-"),
  }));
}

export async function checkCookiesExistance(k: Keys, city: string) {
  const key = calculateKey(k, city);
  const data = cookies().get(key)?.value;
  return data !== undefined;
}

export async function setCookies(
  k: Keys | "theme",
  value: string,
  city?: string
) {
  const key = calculateKey(k, city);
  cookies().set(key, value, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
  });
}
