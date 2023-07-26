"use server";

async function getLiveTable(stopID: string) {
  console.log("stopId", stopID);

  const stopsResponse = await fetch(
    "https://www.zditm.szczecin.pl/api/v1/stops"
  );

  const stops = (await stopsResponse.json()) as {
    data: { id: number; name: string; number: string }[];
  };

  const stopNumber = stops.data.find((stop) => stop.id.toString() === stopID);

  if (!stopNumber) {
    return [];
  }

  const response = await fetch(
    `https://www.zditm.szczecin.pl/api/v1/displays/${stopNumber.number}`
  );

  const data = (await response.json()) as {
    stop_name: string;
    stop_number: string;
    departures: {
      line_number: string;
      direction: string;
      time_real: number | null;
      time_scheduled: string | null;
    }[];
  };

  return data.departures.map(departure => ({
      line: departure.line_number,
      direction: departure.direction,
      time: departure.time_real ? `${departure.time_real} min` : departure.time_scheduled || "",
  })).splice(0, 5);
}

export default getLiveTable;
