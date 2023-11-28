"use server";
import dayjs from "dayjs";
import { StopTable } from "../types";

async function getStopTable(stopId: string): Promise<StopTable> {
  console.log(stopId);
  const date = dayjs().format('YYYYMMDD')
  const url = `https://ztm.gda.pl/rozklady/rozklad-${stopId}-dzien-${date}.html`
  return new Promise((resolve) => {
    resolve({
      url,
      data: [],
    });
  });
}

export default getStopTable;
