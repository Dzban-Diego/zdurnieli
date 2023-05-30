"use server";
import { JSDOM } from "jsdom";

async function getLiveTable(stopID: string) {
  const response = await fetch(
    `https://www.zditm.szczecin.pl/pl/pasazer/rozklady-jazdy,tabliczka,${stopID}`
  );
  const data = await response.text();
  const string = data.match(/id="tablica_wrapper(\d{1,})"/g);
  const id =
    string
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
  const trs = tbody[0].querySelectorAll("tr");
  const tableData: {
    line: string;
    direction: string;
    time: string;
  }[] = [];

  trs.forEach((tr) => {
    tableData.push({
      line: tr.children[0].textContent || "",
      direction: tr.children[1].textContent || "",
      time: tr.children[2].textContent || "",
    })
  });

  return tableData;
}

export default getLiveTable;
