"use server";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import parse from "node-html-parser";
dayjs.extend(utc);

type ReturnType = {
  time: string;
  data: {
    line: string;
    direction: string;
    time: string;
  }[];
};

type LiveTableResponseType = {
  lastUpdate: "string";
  departures: {
    id: string;
    delayInSeconds: number;
    estimatedTime: string;
    headsign: string;
    routeId: number;
    scheduledTripStartTime: string;
    tripId: number;
    status: "REALTIME" | "SCHEDULED";
    theoreticalTime: string;
    timestamp: string;
    trip: number;
    vehicleCode: number;
    vehicleId: number;
    vehicleService: number;
  }[];
};

async function getLiveTable(stopId: string): Promise<ReturnType> {
  const html = await fetch(
    `https://ztm.gda.pl/rozklady/rozklad-${stopId}-dzien-20231103.html`
  ).then((d) => {
    return d.text();
  });

  const DOM = parse(html);
  const footer = DOM.querySelector("#footer");
  const scriptArray = footer?.querySelector("script")?.innerHTML.split("'");

  const liveHtml = await fetch(
    `https://ztm.gda.pl/rozklady/${scriptArray?.[1]}`
  ).then((data) => {
    return data.text();
  });
  const liveDOM = parse(liveHtml);
  liveDOM.querySelector('.legendaSIP')?.remove()
  const rows = liveDOM.querySelectorAll('li').splice(1, 5)

  const departures: ReturnType['data'] = []

  rows.forEach(row => {
    const spans = row.querySelectorAll('span')

    departures.push({
      time: spans[spans.length - 1]?.textContent,
      direction: spans[1]?.textContent,
      line: spans[0]?.textContent,
    })
  })

  return {
    time: dayjs().format('HH:mm:ss'),
    data: departures,
  };
}

export default getLiveTable;
