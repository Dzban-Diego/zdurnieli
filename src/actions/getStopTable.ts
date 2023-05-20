"use server";
import { JSDOM } from "jsdom";

async function getStopTable(stopID: string) {
  const html = await fetch(
    `https://www.zditm.szczecin.pl/pl/pasazer/rozklady-jazdy,tabliczka,${stopID}`
  ).then((res) => res.text());
  const dom = new JSDOM(html);
  const mainElement = dom.window.document
    .querySelector("main")
    ?.getElementsByTagName("div")[0]
    ?.getElementsByClassName("rozkladmaly")[0];
  const returnData = mainElement?.innerHTML
    .replaceAll("[pokaż]", "")
    .replaceAll("[ukryj]", "")
    .replaceAll(/<td>\n.{1,}<\/td>/g, "<td class='nowrap'>--</td>")
    .replaceAll(/href="/g, 'href="https://www.zditm.szczecin.pl/');
  return returnData || "";
}

export default getStopTable;
