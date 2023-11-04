"use server";
import { parse } from "node-html-parser";
import { Lines } from "../types";

export default async function getLines(): Promise<Lines<string>> {
  const html = await fetch(
    "https://www.zditm.szczecin.pl/pl/pasazer/rozklady-jazdy,wedlug-linii"
  ).then((res) => res.text());
  const dom = parse(html);
  const mainElement = dom.querySelector("main");
  const categories: {
    header: string;
    lines: { name: string; id: string }[];
  }[] = [];
  const h2Elements = mainElement?.querySelectorAll("h2");
  const hidden = [
    "Ostatnie zmiany w rozkładach jazdy",
    "Inne źródła rozkładów jazdy",
  ];

  h2Elements?.forEach((element) => {
    const header = element.innerHTML;
    if (hidden.includes(header)) {
      return;
    }
    categories.push({
      header: header.trim(),
      lines: [],
    });
  });
  const ulElements = mainElement?.querySelectorAll(".row");
  ulElements?.forEach((element, index) => {
    const c = categories[index - 1];
    const arr: { name: string; id: string }[] = [];

    element.querySelectorAll(".visually-hidden").forEach((hidden) => {
      hidden.remove();
    });

    element.querySelectorAll("a").forEach((a) => {
      const urlArray = a.attrs.href.split("/");
      arr.push({
        name: a.text.trim(),
        id: `${urlArray[urlArray.length - 2]}-${urlArray[urlArray.length - 1]}`,
      });
    });

    if (c) {
      c.lines = arr;
    }
  });

  return categories;
}
