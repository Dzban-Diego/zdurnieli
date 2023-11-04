"use server";
import { parse } from 'node-html-parser';
import { LineStops } from '../types';

/**
 * Pobiera przystanki danej linii
 * lineId - id:number
 */
async function getLineStops(lineId: string): Promise<LineStops> {
  const html = await fetch(
    `https://www.zditm.szczecin.pl/pl/pasazer/rozklady-jazdy,linia,${lineId.replaceAll(
      "-",
      "/"
    )}`,
    { next: { revalidate: 60 } }
  ).then((res) => res.text());

  // Obejście problemu ponieważ parse usuwało element main z DOMu
  const array = html.split('main')
  const dom = parse(`<main ${array[1]} main>`);

  const bodyElements = dom?.querySelectorAll("tbody");

  const data: { name: string; id: string }[][] = [];

  bodyElements?.forEach((element) => {
    const arr: { name: string; id: string }[] = [];
    const stopElements = element.querySelectorAll("a");

    stopElements.forEach((stopEl) => {
      const name = stopEl.textContent?.trim();
      const urlArray = stopEl.attrs.href.split("/");

      arr.push({
        name: encodeURIComponent(name || ""),
        id: `${urlArray[urlArray.length - 4]}-${urlArray[urlArray.length - 3]}-${urlArray[urlArray.length - 2]}`,
      });
    });

    data.push(arr.filter((el) => el.name !== ""));
  });

  return data;
}

export default getLineStops;
