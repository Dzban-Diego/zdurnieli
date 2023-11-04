import React, { Suspense } from "react";
import StopLiveTable from "@/components/StopLiveTable";
import { headers } from "next/headers";
import getCity from "@/actions/cities";

type Props = {
  params: { stopName: string; stopId: string };
};

export default function Stop({ params: { stopId, stopName } }: Props) {
  return (
    <div className={"flex flex-col items-center text-center"}>
      <StopLiveTable stopId={stopId} stopName={decodeURI(stopName)} />
      <Suspense>
        <BottomTable stopId={stopId} />
      </Suspense>
    </div>
  );
}

async function BottomTable({ stopId }: { stopId: string }) {
  const headersList = headers();
  const domain = headersList.get("x-forwarded-host") || "";
  const City = await getCity(domain.split('.')[0]);
  const TableData = await City.getStopTable(stopId);

  return (
    <>
      <h2>
        <a
          href={`https://www.zditm.szczecin.pl/pl/pasazer/rozklady-jazdy/tabliczka/${stopId.replaceAll(
            "-",
            "/"
          )}`}
        >
          Rozkład jazdy
        </a>
      </h2>
      <table className="bg-secondary dark:bg-dark_secondary secondary rounded shadow w-full overflow-hidden">
        <tbody>
          {TableData.map((item) => {
            return (
              <tr key={item.hour}>
                <th className="bg-black text-font p-1">{item.hour}</th>
                {item.departures.map((departure) => {
                  return (
                    <td
                      key={departure.minute}
                      className={`route${
                        departure.route
                      } text-font dark:text-dark_font ${
                        departure.current
                          ? "border-2 border-green-500 rounded"
                          : ""
                      }`}
                    >
                      <a href={departure.url} className="">
                        <span>{departure.minute}</span>
                        <span className="align-top text-xs">
                          {departure.route}
                        </span>
                      </a>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
