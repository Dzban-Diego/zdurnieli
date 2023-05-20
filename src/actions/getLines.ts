"use server";
import { JSDOM } from "jsdom";

export default async function getLines() {
  const html = await fetch(
    "https://www.zditm.szczecin.pl/pl/pasazer/rozklady-jazdy,wedlug-linii"
  ).then((res) => res.text());
  const dom = new JSDOM(html);
  const mainElement = dom.window.document.querySelector("main");
  const categories: {
    header: string;
    lines: { name: string; id: string }[];
  }[] = [];
  const h2Elements = mainElement?.querySelectorAll("h2");
  const hidden = ["Zmiany w rozkładach jazdy", "Inne źródła rozkładów jazdy"];
  h2Elements?.forEach((element) => {
    const header = element.innerHTML;
    if (hidden.includes(header)) {
      return;
    }
    categories.push({
      header,
      lines: [],
    });
  });
  const ulElements = mainElement?.querySelectorAll("ul");
  ulElements?.forEach((element, index) => {
    const c = categories[index];
    const arr: { name: string; id: string }[] = [];
    element.querySelectorAll("a").forEach((a) => {
      arr.push({
        name: a.innerHTML,
        id: a.href.split(",").pop() || "",
      });
    });
    if (c) {
      c.lines = arr;
    }
  });

  return categories;
}
