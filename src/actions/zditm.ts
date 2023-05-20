import { z } from "zod";
import { JSDOM } from "jsdom";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const zditm = createTRPCRouter({
  getLines: publicProcedure.query(async () => {
    const html = await fetch(
      "https://www.zditm.szczecin.pl/pl/pasazer/rozklady-jazdy,wedlug-linii"
    ).then((res) => res.text());
    const dom = new JSDOM(html);
    const mainElement = dom.window.document.querySelector("main");
    const categories: {
      header: string;
      lines: { name: string; id: string }[];
    }[] = [];
    const h2Elements = mainElement?.querySelectorAll("h2");
    const hidden = ["Zmiany w rozkładach jazdy", "Inne źródła rozkładów jazdy"];
    h2Elements?.forEach((element) => {
      const header = element.innerHTML;
      if (hidden.includes(header)) {
        return;
      }
      categories.push({
        header,
        lines: [],
      });
    });
    const ulElements = mainElement?.querySelectorAll("ul");
    ulElements?.forEach((element, index) => {
      const c = categories[index];
      const arr: { name: string; id: string }[] = [];
      element.querySelectorAll("a").forEach((a) => {
        arr.push({
          name: a.innerHTML,
          id: a.href.split(",").pop() || "",
        });
      });
      if (c) {
        c.lines = arr;
      }
    });

    return categories;
  }),
  getLineStops: publicProcedure
    .input(z.object({ line: z.string() }))
    .query(async ({ input }) => {
      const html = await fetch(
        `https://www.zditm.szczecin.pl/pl/pasazer/rozklady-jazdy,linia,${input.line}`
      ).then((res) => res.text());
      const dom = new JSDOM(html);
      const mainElement = dom.window.document.querySelector("main");
      const bodyElements = mainElement?.querySelectorAll("tbody");
      const data: { name: string; id: string }[][] = [];
      bodyElements?.forEach((element, index) => {
        if (index === 0) {
          return;
        }
        const arr: { name: string; id: string }[] = [];
        const stopElements = element.querySelectorAll(".przystanek");
        stopElements.forEach((stopEl) => {
          console.log(stopEl.innerHTML);
          const spans = stopEl.querySelectorAll("span");
          const as = stopEl.querySelectorAll("a");
          const lastA = as[as.length - 1];
          const urlArray = lastA?.href.split(",");
          const name = spans[spans.length - 1]?.textContent;
          arr.push({
            name: name || lastA?.textContent || "",
            id:
              urlArray?.slice(Math.max(urlArray.length - 3, 0)).join(",") || "",
          });
        });
        data.push(arr);
      });
      return data;
    }),
  getStopTable: publicProcedure
    .input(z.object({ stopId: z.string() }))
    .query(async ({ input }) => {
      const html = await fetch(
        `https://www.zditm.szczecin.pl/pl/pasazer/rozklady-jazdy,tabliczka,${input.stopId}`
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
    }),
  getLiveTable: publicProcedure
    .input(z.object({ stopId: z.string() }))
    .query(async ({ input }) => {
      const response = await fetch(
            `https://www.zditm.szczecin.pl/pl/pasazer/rozklady-jazdy,tabliczka,${input.stopId}`
        );
        const data = await response.text();
        const string = data.match(/id="tablica_wrapper(\d{1,})"/g);
        const id = string
            ?.toString()
            .match(/\d{2,}/g)
            ?.toString() || "";
        const response_1 = await fetch(
            `https://www.zditm.szczecin.pl/json/tablica.inc.php?lng=pl&slupek=${id}&t=${Math.random()}`
        );
        const data_1 = await response_1.text();
        const returnData = JSON.parse(data_1) as {
            tresc: string;
            komunikat: string;
        };
        return {
            data: returnData.tresc,
            komunikat: returnData.komunikat,
        };
    }),
  getLiveTableData: publicProcedure
    .input(z.object({ stopId: z.string() }))
    .query(async ({ input }) => {
      const response = await fetch(
            `https://www.zditm.szczecin.pl/pl/pasazer/rozklady-jazdy,tabliczka,${input.stopId}`
        );
        const data = await response.text();
        const string = data.match(/id="tablica_wrapper(\d{1,})"/g);
        const id = string
            ?.toString()
            .match(/\d{2,}/g)
            ?.toString() || "";
        const response_1 = await fetch(
            `https://www.zditm.szczecin.pl/json/tablica.inc.php?lng=pl&slupek=${id}&t=${Math.random()}`
        );
        const data_1 = await response_1.text();
        const returnData = JSON.parse(data_1) as {
            tresc: string;
            komunikat: string;
        };
        const trescHtml = new JSDOM(returnData.tresc);
        const body = trescHtml.window.document.body;
        const tbody = body.getElementsByTagName("tbody");
        const tbodyContent = tbody[0]?.innerHTML || "";
        const text_1 = tbodyContent
            .replaceAll(/\t/g, "")
            .replaceAll("<tr>", "")
            .replaceAll("</tr>", "")
            .replaceAll("</td>", "")
            .replaceAll(/<td class="gmv[a-z]*">/g, "");
        return {
            data: text_1,
            komunikat: returnData.komunikat,
        };
    }),
});
