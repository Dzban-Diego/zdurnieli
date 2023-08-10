import React from "react";
import StopLiveTable from "@/components/StopLiveTable";
import getStopTable from "@/actions/getStopTable";

type Props = {
  params: { city: string; stopName: string; stopId: string };
};

export default function Stop({ params: { city, stopId, stopName } }: Props) {
  return (
    <div className={"flex flex-col items-center text-center"}>
      <StopLiveTable stopId={stopId} stopName={decodeURI(stopName)} />
      {/* @ts-ignore */}
      <BottomTable stopId={stopId} />
    </div>
  );
}

async function BottomTable({ stopId }: { stopId: string }) {
  const TableData = await getStopTable(stopId);

  return (
    <>
      <h2 className={"my-3 text-4xl text-font dark:text-dark_font"}>
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
