"use server";
import dayjs from "dayjs";

async function getLiveTable(stopId: string) {
  require("dayjs/locale/pl");
  dayjs.locale("pl");

  const stopsResponse = await fetch(
    "https://www.zditm.szczecin.pl/api/v1/stops"
  );

  const stops = (await stopsResponse.json()) as {
    data: { id: number; name: string; number: string }[];
  };

  const stopNumber = stops.data.find(
    (stop) => stop.id.toString() === stopId.split("-")[1]
  );

  if (!stopNumber) {
    return {
      time: dayjs().locale("pl").format("HH:mm:ss"),
      data: [],
    };
  }

  const response = await fetch(
    `https://www.zditm.szczecin.pl/api/v1/displays/${stopNumber.number}`,
    { next: { revalidate: 60 } }
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

  return {
    time: dayjs().locale("pl").format("HH:mm:ss"),
    data: data.departures
      .map((departure) => ({
        line: departure.line_number,
        direction: departure.direction,
        time: departure.time_real
          ? `${departure.time_real} min`
          : departure.time_scheduled || "",
      }))
      .splice(0, 5),
  };
}

export default getLiveTable;
