"use server";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import parse from "node-html-parser";
import { LiveTable } from "../types";
dayjs.extend(utc);

async function getLiveTable(stopId: string): Promise<LiveTable> {
  const date = dayjs().format('YYYYMMDD')
  const html = await fetch(
    `https://ztm.gda.pl/rozklady/rozklad-${stopId}-dzien-${date}.html`
  ).then((d) => {
    return d.text();
  });

  const DOM = parse(html);
  const footer = DOM.querySelector("#footer");
  const scriptArray = footer?.querySelector("script")?.innerHTML.split("'");
  console.log(footer?.querySelector("script")?.innerHTML);

  const liveHtml = await fetch(
    `https://ztm.gda.pl/rozklady/${scriptArray?.[1]}`
  ).then((data) => {
    return data.text();
  });
  const liveDOM = parse(liveHtml);
  console.log(liveHtml);
  liveDOM.querySelector(".legendaSIP")?.remove();
  const rows = liveDOM.querySelectorAll("li").splice(1, 5);

  const departures: LiveTable["data"] = [];

  rows.forEach((row) => {
    const spans = row.querySelectorAll("span");

    departures.push({
      time: spans[spans.length - 1]?.textContent,
      direction: spans[1]?.textContent,
      line: spans[0]?.textContent,
    });
  });

  return {
    time: dayjs().format("HH:mm:ss"),
    data: departures,
  };
}

export default getLiveTable;
