import { getLiked, getTheme } from "@/actions";
import { CustomLink } from "@/components/CustomLink";
import StopLiveTable from "@/components/StopLiveTable";
import CheckLocalStorage from "@/components/CheckLocalStorage";
import React from "react";
import { LINES_STORAGE_KEY, STOPS_STORAGE_KEY } from "@/config";
import { headers } from "next/headers";

export default async function Home() {
  const headersList = headers();
  const domain = headersList.get("x-forwarded-host") || "";
  const citySlug = domain.split('.')[0]
  const stops = await getLiked(STOPS_STORAGE_KEY);
  const lines = await getLiked(LINES_STORAGE_KEY);
  const theme = await getTheme();

  const isLines = lines?.length !== 0;
  const isStops = stops?.length !== 0;

  return (
    <div className="flex flex-col p-2">
      <CheckLocalStorage theme={!!theme} line={!!lines} stop={!!stops} citySlug={citySlug.length > 4 ? 'zs' : citySlug} />
      {!isLines && !isStops ? (
        <span
          className={"mb-4 text-xl text-font dark:text-dark_font text-center"}
        >
          Twoje ulubione przystanki i linie będą się tutaj wyświetlać, dodaj je!
        </span>
      ) : null}
      {isStops ? <h2>Ulubione przystanki</h2> : null}
      {stops.map((stop) => (
        <StopLiveTable key={stop.id} stopId={stop.id} stopName={stop.name} />
      ))}
      {isLines ? <h2>Ulubione Linie</h2> : null}
      <div className={"grid grid-cols-4"}>
        {lines.map((line) => (
          <CustomLink
            key={line.id}
            href={`/line/${line.id}/${line.name}`}
            text={line.name}
          />
        ))}
      </div>
      <CustomLink
        href={`/lines`}
        text={"Wszystkie linie"}
        className="mt-4 m-0"
      />
    </div>
  );
}
