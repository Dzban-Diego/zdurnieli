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
  return undefined
}

export default getStopTable;
