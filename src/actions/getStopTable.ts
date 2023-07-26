"use server";
import { JSDOM } from "jsdom";

async function getStopTable(lineId: string, stopID: string) {
  console.log("stopId", stopID);
  console.log(
    `https://www.zditm.szczecin.pl/pl/pasazer/rozklady-jazdy/tabliczka/${lineId}/${stopID}/p`
  );
  const html = await fetch(
    `https://www.zditm.szczecin.pl/pl/pasazer/rozklady-jazdy/tabliczka/${lineId}/${stopID}/p/`
  ).then((res) => {
    return res.text();
  });
  const dom = new JSDOM(html);
  console.log("dom", dom.window.document);
  const mainElement = dom.window.document
    .querySelector(".table-responsive")
  console.log("main", mainElement?.innerHTML);
  const returnData = mainElement?.innerHTML
    .replaceAll("[pokaż]", "")
    .replaceAll("Godzina", "")
    .replaceAll(/<td>\n.{1,}<\/td>/g, "<td class='nowrap'>--</td>")
    .replaceAll(/href="/g, 'href="https://www.zditm.szczecin.pl/');
  return returnData || "";
}

export default getStopTable;
