"use server";
import { JSDOM } from "jsdom";

type ReturnType = {
  hour: string;
  departures: { minute: number; route: string; url: string }[];
}[];

async function getStopTable(
  lineId: string,
  stopId: string
): Promise<ReturnType> {
  const html = await fetch(
    `https://www.zditm.szczecin.pl/pl/pasazer/rozklady-jazdy/tabliczka/${lineId}/${stopId}/p`
  ).then((res) => {
    return res.text();
  });
  const dom = new JSDOM(html);
  const mainElement = dom.window.document.querySelector("main");
  const table = mainElement?.querySelector(".table-responsive");
  let data: ReturnType = [];

  table?.querySelectorAll("th").forEach((th, index) => {
    data[index] = { hour: th.innerHTML?.trim(), departures: [] };
  });

  table?.querySelectorAll("td").forEach((td, index) => {
    const as = td.querySelectorAll("a");
    as.forEach((a, aIndex) => {
      const spans = a.querySelectorAll("span");
      spans.forEach((span) => {
        const spanText = span.innerHTML?.trim();
        if (spanText === "" || span.innerHTML.length > 5) {
          return;
        }
        if (Number.isInteger(parseInt(spanText, 10))) {
          console.log(typeof parseInt(spanText));
          data[index].departures[aIndex] = {
            minute: parseInt(spanText),
            route: "",
            url: a.href,
          };
        } else {
          console.log("else", spanText);
          data[index].departures[aIndex].route = spanText;
        }
      });
    });
  });

  console.log(data);

  return data || "";
}

export default getStopTable;
