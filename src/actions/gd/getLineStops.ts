"use server";
import { parse } from "node-html-parser";
import { LineStops } from "../types";

/**
 * Pobiera przystanki danej linii
 * lineId - id:number
 */
async function getLineStops(lineId: string): Promise<LineStops> {
  const html = await fetch(
    `https://ztm.gda.pl/rozklady/linia-${lineId}.html`
  ).then((d) => {
    return d.text();
  });
  const DOM = parse(html);

  const table = DOM.querySelector("table");
  const tds = table?.querySelectorAll("table");

  const routes: LineStops = [];

  tds?.forEach((td) => {
    const rows = td.querySelectorAll("tr");

    const trip = rows.map((row) => {
      const a = row.querySelector("a");

      const hrefArray = a?.attrs.href.split('-')
      const id = hrefArray?.splice(1, 3).join('-')

      return {
        name: encodeURIComponent(a?.textContent || ''),
        id: id,
      };
    }).filter(trip => trip.id !== undefined);

    // @ts-ignore
    routes.push(trip);
  });

  return routes;
}

export default getLineStops;
