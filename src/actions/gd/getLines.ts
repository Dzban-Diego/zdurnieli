"use server";

import dayjs from "dayjs";
import { Lines } from "../types";

type GD_lines = {
  [key: string]: {
    lastUpdate: string;
    routes: {
      routeId: number;
      agencyId: number;
      routeShortName: string;
      routeLongName: string;
      activationDate: string;
      routeType: "BUS" | "TRAM" | "UNKNOWN";
    }[];
  };
};

type ReturnType = Lines<"Autobusy" | "Tramwaje" | "Autobusy nocne">

export default async function getLines(): Promise<
 ReturnType 
> {
  const data = await fetch(
    "https://ckan.multimediagdansk.pl/dataset/c24aa637-3619-4dc2-a171-a23eec8f2172/resource/22313c56-5acf-41c7-a5fd-dc5dc72b3851/download/routes.json"
  ).then((res) => res.json() as Promise<GD_lines>);

  // Pobranie dzisiejszych lini
  const currentDate = dayjs().format("YYYY-MM-DD");
  const routes = data[currentDate];
  const types: ReturnType = [
    { header: "Autobusy", lines: [] },
    { header: "Tramwaje", lines: [] },
    { header: "Autobusy nocne", lines: [] },
  ];

  routes.routes.forEach((route) => {
    if (route.routeType === "BUS" && route.routeShortName[0] !== "N") {
      types[0].lines.push({
        id: route.routeShortName,
        name: route.routeShortName,
      });
      return;
    }
    if (route.routeType === "TRAM") {
      types[1].lines.push({
        id: route.routeShortName,
        name: route.routeShortName,
      });
      return;
    }
    if (route.routeType === "BUS") {
      types[2].lines.push({
        id: route.routeShortName,
        name: route.routeShortName,
      });
      return;
    }
  });

  return types.map((type) => {
    const sorted = type.lines.sort((a, b) => {
      const cutN = type.header === "Autobusy nocne";
      const aName = cutN ? a.name.substring(1, 5) : a.name;
      const bName = cutN ? b.name.substring(1, 5) : b.name;
      return parseInt(aName) - parseInt(bName);
    });
    return {
      header: type.header,
      lines: sorted,
    };
  });
}
