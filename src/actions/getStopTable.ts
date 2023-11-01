"use server";
import dayjs from "dayjs";
import { parse } from 'node-html-parser'

type ReturnType = {
  hour: string;
  departures: {
    minute: number;
    route: string;
    url: string;
    current: boolean;
  }[];
}[];

async function getStopTable(stopId: string): Promise<ReturnType> {
  const html = await fetch(
    `https://www.zditm.szczecin.pl/pl/pasazer/rozklady-jazdy/tabliczka/${stopId.replaceAll(
      "-",
      "/"
    )}`
  ).then((res) => {
    return res.text();
  });
  const dom = parse(html)
  const mainElement = dom.querySelector("main");
  const collapsed = mainElement?.querySelector(".show");
  const table = collapsed?.querySelector(".table-responsive");
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
          data[index].departures[aIndex] = {
            minute: parseInt(spanText),
            route: "",
            url: a.href,
            current: false,
          };
        } else {
          data[index].departures[aIndex].route = spanText;
        }
      });
    });
  });

  let isCurrentDeparture = false;
  const hour = dayjs().add(2, 'h').format("HH");
  const minute = dayjs().format("mm");

  return data.map((table) => {
    table.departures = table.departures.map((departure) => {
      const isHourFuture = parseInt(table.hour) > parseInt(hour);
      const isHourNow = parseInt(table.hour) === parseInt(hour);
      const isMinuteFuture = departure.minute > parseInt(minute);
      const isFuture = isHourFuture || (isHourNow && isMinuteFuture);

      if (isFuture && !isCurrentDeparture) {
        isCurrentDeparture = true;
        departure.current = true;
        return departure;
      } else {
        return departure;
      }
    });

    return table;
  });
}

export default getStopTable;
