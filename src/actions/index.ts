"use server";
import { Keys } from "@/config";
import { cookies } from "next/headers";
import getCity from "./cities";
import { unpacData } from "@/helpers";

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

export async function handleLike(key: Keys, value: Value) {
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

export async function getLikeStatus(key: Keys, id: string) {
  const likedString = cookies().get(key)?.value || "[]";
  const liked = JSON.parse(likedString) as Value[];

  return liked.findIndex((item) => item.id.replaceAll("/", "-") === id) !== -1;
}

export async function getLiked(key: Keys) {
  const likedString = cookies().get(key)?.value || "[]";
  const liked = unpacData<Value[]>(likedString, true);
  return liked?.map((item) => ({
    ...item,
    id: item.id.replaceAll("/", "-"),
  })) || [];
}

export async function checkCookiesExistance(key: Keys) {
  const data = cookies().get(key)?.value;
  return data !== undefined;
}

export async function setCookies(
  key: Keys | "theme",
  value: string,
) {
  cookies().set(key, value, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
  });
}

export async function removeCookie(key: Keys | "theme"){
  cookies().delete(key)
}

export async function getLines() {
  const City = await getCity()
  console.log(City)
  return City.getLines()
}

export async function getLiveTable(stopId: string) {
  const City = await getCity()
  return City.getLiveTable(stopId)
}

export async function getLineStops(lineId: string) {
  const City = await getCity()
  return City.getLineStops(lineId)
}

export async function getStopTable(lineId: string) {
  const City = await getCity()
  return City.getLineStops(lineId)
}
