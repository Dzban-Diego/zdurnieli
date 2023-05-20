'use server';
import { JSDOM } from "jsdom";

async function getLineStops(lineID: string) {
  const html = await fetch(
    `https://www.zditm.szczecin.pl/pl/pasazer/rozklady-jazdy,linia,${lineID}`
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
        id: urlArray?.slice(Math.max(urlArray.length - 3, 0)).join(",") || "",
      });
    });
    data.push(arr);
  });
  return data;
}

export default getLineStops;
