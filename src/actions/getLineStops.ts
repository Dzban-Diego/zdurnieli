"use server";
import { JSDOM } from "jsdom";

/**
 * Pobiera przystanki danej linii
 * lineId - id:number
 */
async function getLineStops(lineId: string) {
  const html = await fetch(
    `https://www.zditm.szczecin.pl/pl/pasazer/rozklady-jazdy,linia,${lineId.replaceAll(
      "-",
      "/"
    )}`
  ).then((res) => res.text());

  const dom = new JSDOM(html);
  const mainElement = dom.window.document.querySelector("main");
  const bodyElements = mainElement?.querySelectorAll("tbody");

  const data: { name: string; id: string; routeLetter: string }[][] = [];

  bodyElements?.forEach((element) => {
    const arr: { name: string; id: string; routeLetter: string }[] = [];
    const stopElements = element.querySelectorAll("a");

    stopElements.forEach((stopEl) => {
      const name = stopEl.textContent?.trim();
      const urlArray = stopEl.href.split("/");

      arr.push({
        name: name || "",
        id: `${urlArray[urlArray.length - 4]}/${urlArray[urlArray.length - 3]}`,
        routeLetter: urlArray[urlArray.length - 2],
      });
    });

    data.push(arr.filter((el) => el.name !== ""));
  });

  return data;
}

export default getLineStops;
