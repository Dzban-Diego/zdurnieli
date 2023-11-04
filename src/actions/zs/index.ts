"use server";
import getLineStops from "./getLineStops";
import getLines from "./getLines";
import getStopTable from "./getStopTable";
import getLiveTable from "./getLiveTable";

export default async function Szczecin() {
  return {
    getLines,
    getLiveTable,
    getLineStops,
    getStopTable,
  };
}
