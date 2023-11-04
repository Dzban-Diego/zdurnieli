"use server";
import { StopTable } from "../types";

async function getStopTable(stopId: string): Promise<StopTable> {
  console.log(stopId)
  return new Promise((resolve) => {
    resolve([]);
  });
}

export default getStopTable;
