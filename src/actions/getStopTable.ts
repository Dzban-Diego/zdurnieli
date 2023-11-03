"use server";

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
  return new Promise((resolve) => {
    resolve([]);
  });
}

export default getStopTable;
