"use server";
import { JSDOM } from "jsdom";

async function getStopTable(
  lineId: string,
  stopId: string
): Promise<{ hour: string; departures: string[] }[]> {
  const html = await fetch(
    `https://www.zditm.szczecin.pl/pl/pasazer/rozklady-jazdy/tabliczka/${lineId}/${stopId}/p/75-dworzec-glowny`
  ).then((res) => {
    return res.text();
  });
  const dom = new JSDOM(html);
  const mainElement = dom.window.document.querySelector("main");
  const table = mainElement?.querySelector(".table-responsive");
  let data: { hour: string; departures: string[] }[] = [];

  table?.querySelectorAll("th").forEach((th, index) => {
    data[index] = { hour: th.innerHTML?.trim(), departures: [] };
  });

  table?.querySelectorAll("td").forEach((td, index) => {
    const as = td.querySelectorAll("a");
    as.forEach((a) => {
      const spans = a.querySelectorAll("span");
      spans.forEach((span) => {
        if (span.innerHTML === "" || span.innerHTML.length > 5) {
          return;
        }
        data[index].departures.push(span.innerHTML?.trim() || "");
      });
    });
  });

  return data || "";
}

export default getStopTable;
